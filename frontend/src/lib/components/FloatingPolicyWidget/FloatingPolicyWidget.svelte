<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { BACKEND_API_EXPOSED_URL } from '$lib/utils/constants';
	import { getCSRFToken } from '$lib/django';

	interface PolicyFile {
		id: string;
		name: string;
		type: string;
		mimeType: string;
		size: string;
		uploadedAt: string;
	}

	interface PolicyCollection {
		id: string;
		name: string;
		description: string;
		storeId: string;
		status: string;
		files: PolicyFile[];
		fileCount?: number;
		lastUpdated: string;
	}

	let isOpen = $state(false);
	let collections = $state<PolicyCollection[]>([]);
	let loading = $state(false);
	let error = $state('');

	// Track selected collection IDs
	let selectedCollectionIds = $state<Set<string>>(new Set());

	// Track expanded collections (to show files preview)
	let expandedCollections = $state<Set<string>>(new Set());

	// Chat state
	let chatMode = $state(false);
	let chatMessages = $state<
		{
			role: 'user' | 'assistant';
			content: string;
			sources?: { title: string; uri: string }[];
		}[]
	>([]);
	let chatInput = $state('');
	let chatLoading = $state(false);
	let chatSessionId = $state<string | null>(null);

	// Fullscreen state
	let isFullscreen = $state(false);

	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
	}

	onMount(() => {
		fetchCollections();
	});

	async function fetchCollections() {
		if (!browser) return;
		loading = true;
		error = '';
		try {
			const res = await fetch(`${BACKEND_API_EXPOSED_URL}/policy-collections/`, {
				credentials: 'include'
			});
			const json = await res.json();
			if (!res.ok || !json.success) {
				error =
					(typeof json.message === 'string' && json.message) ||
					(!res.ok ? `Request failed (${res.status})` : 'Failed to load collections');
				collections = [];
				return;
			}
			collections = Array.isArray(json.data) ? json.data : json.data ? [json.data] : [];
			expandedCollections = new Set(collections.map((c) => c.id));
		} catch (e) {
			error = 'Failed to connect to server';
		} finally {
			loading = false;
		}
	}

	function toggleWidget() {
		isOpen = !isOpen;
		if (!isOpen) {
			isFullscreen = false;
		}
		if (isOpen && collections.length === 0 && !loading) {
			fetchCollections();
		}
	}

	function toggleCollection(collectionId: string) {
		const newSet = new Set(selectedCollectionIds);
		if (newSet.has(collectionId)) {
			newSet.delete(collectionId);
		} else {
			newSet.add(collectionId);
		}
		selectedCollectionIds = newSet;
	}

	function toggleExpand(collectionId: string) {
		const newSet = new Set(expandedCollections);
		if (newSet.has(collectionId)) {
			newSet.delete(collectionId);
		} else {
			newSet.add(collectionId);
		}
		expandedCollections = newSet;
	}

	function getSelectedStoreIds(): string[] {
		return collections
			.filter((c) => selectedCollectionIds.has(c.id))
			.map((c) => c.storeId);
	}

	function getSelectedCollectionCount(): number {
		return selectedCollectionIds.size;
	}

	function getTotalFileCount(): number {
		return collections
			.filter((c) => selectedCollectionIds.has(c.id))
			.reduce((sum, c) => sum + (c.fileCount ?? c.files.length), 0);
	}

	function startChat() {
		if (selectedCollectionIds.size === 0) return;
		chatMode = true;
		chatMessages = [];
		chatSessionId = null;

		const count = getSelectedCollectionCount();
		const fileCount = getTotalFileCount();
		chatMessages = [
			{
				role: 'assistant',
				content: `I'm ready to help you with ${count} collection${count > 1 ? 's' : ''}${fileCount > 0 ? ` (${fileCount} file${fileCount > 1 ? 's' : ''})` : ''}. Ask me anything about the documents!`
			}
		];
	}

	function goBack() {
		chatMode = false;
		chatSessionId = null;
	}

	async function sendMessage() {
		if (!chatInput.trim() || chatLoading) return;

		const userMessage = chatInput.trim();
		chatInput = '';
		chatMessages = [...chatMessages, { role: 'user', content: userMessage }];
		chatLoading = true;

		try {
			const storeIds = getSelectedStoreIds();
			if (storeIds.length === 0) {
				chatMessages = [
					...chatMessages,
					{
						role: 'assistant',
						content: 'No collections selected. Please go back and select a collection.'
					}
				];
				chatLoading = false;
				return;
			}

			const body: Record<string, any> = {
				message: userMessage,
				storeIds
			};

			if (chatSessionId) {
				body.sessionId = chatSessionId;
			}

			const res = await fetch(`${BACKEND_API_EXPOSED_URL}/policy-collections/chat/`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': getCSRFToken() || ''
				},
				body: JSON.stringify(body)
			});

			if (!res.ok) {
				const errorText = await res.text();
				chatMessages = [
					...chatMessages,
					{
						role: 'assistant',
						content: `Server error (${res.status}): ${errorText || 'Please try again.'}`
					}
				];
				chatLoading = false;
				return;
			}

			const json = await res.json();

			if (json.success) {
				if (json.sessionId) {
					chatSessionId = json.sessionId;
				}

				chatMessages = [
					...chatMessages,
					{
						role: 'assistant',
						content: json.message || 'No response',
						sources: json.sources
					}
				];
			} else {
				chatMessages = [
					...chatMessages,
					{
						role: 'assistant',
						content: json.message || json.error || 'Something went wrong.'
					}
				];
			}
		} catch (e: any) {
			chatMessages = [
				...chatMessages,
				{
					role: 'assistant',
					content: `Connection error: ${e?.message || 'Failed to reach the server. Please try again.'}`
				}
			];
		} finally {
			chatLoading = false;
		}
	}

	function handleChatKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}

	function truncateFileName(name: string, maxLen = 45): string {
		if (name.length <= maxLen) return name;
		const ext = name.split('.').pop();
		return name.substring(0, maxLen - 4 - (ext?.length || 0)) + '...' + (ext ? '.' + ext : '');
	}
</script>

<!-- Fullscreen overlay -->
{#if isOpen && isFullscreen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 bg-black/40 z-40"
		onclick={toggleFullscreen}
		onkeydown={() => {}}
	></div>
{/if}

<!-- Floating Widget Button -->
<div class="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
	<!-- Widget Panel -->
	{#if isOpen}
		<div
			class="bg-white shadow-2xl border border-gray-200 overflow-hidden animate-slide-up transition-all duration-300 {isFullscreen
				? 'fixed inset-4 z-50 rounded-2xl'
				: 'absolute bottom-16 ltr:right-0 rtl:left-0 rounded-2xl'}"
			style="{isFullscreen ? '' : 'width: 480px; max-height: 620px;'}"
		>
			<!-- Header -->
			<div
				class="bg-gradient-to-r from-[#0A1628] to-[#1a2740] px-5 py-4 flex items-center justify-between"
			>
				{#if chatMode}
					<div class="flex items-center gap-3">
						<button
							onclick={goBack}
							class="text-white/80 hover:text-white transition-colors"
						>
							<i class="fa-solid fa-arrow-left text-sm"></i>
						</button>
						<div>
							<h3 class="text-white font-semibold text-sm">Policy Assistant</h3>
							<p class="text-white/50 text-xs">
								{getSelectedCollectionCount()} collection{getSelectedCollectionCount() > 1 ? 's' : ''} selected
							</p>
						</div>
					</div>
				{:else}
					<div>
						<h3 class="text-white font-semibold text-sm">Policy Collections</h3>
						<p class="text-white/50 text-xs">Select collections to chat with</p>
					</div>
				{/if}
				<div class="flex items-center gap-2">
					<button
						onclick={toggleFullscreen}
						class="text-white/60 hover:text-white transition-colors"
						title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
					>
						<i class="fa-solid {isFullscreen ? 'fa-compress' : 'fa-expand'} text-sm"></i>
					</button>
					<button
						onclick={toggleWidget}
						class="text-white/60 hover:text-white transition-colors"
					>
						<i class="fa-solid fa-xmark text-lg"></i>
					</button>
				</div>
			</div>

			{#if chatMode}
				<!-- Chat View -->
				<div
					class="flex flex-col"
					style="{isFullscreen ? 'height: calc(100vh - 8rem);' : 'height: 520px;'}"
				>
					<!-- Messages -->
					<div class="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9FAFB]">
						{#each chatMessages as msg}
							<div
								class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}"
							>
								<div
									class="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed {msg.role ===
									'user'
										? 'bg-[#0077CC] text-white rounded-br-md'
										: 'bg-white text-gray-700 border border-gray-200 rounded-bl-md shadow-sm'}"
								>
									<div class="whitespace-pre-wrap">{msg.content}</div>
									{#if msg.sources && msg.sources.length > 0}
										<div class="mt-2 pt-2 border-t border-gray-100">
											<p
												class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1"
											>
												Sources
											</p>
											{#each msg.sources as source}
												<a
													href={source.uri}
													target="_blank"
													rel="noopener noreferrer"
													class="flex items-center gap-1.5 text-xs text-[#0077CC] hover:underline py-0.5"
												>
													<i class="fa-solid fa-file-lines text-[10px]"></i>
													<span class="truncate">{source.title}</span>
												</a>
											{/each}
										</div>
									{/if}
								</div>
							</div>
						{/each}
						{#if chatLoading}
							<div class="flex justify-start">
								<div
									class="bg-white text-gray-400 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm"
								>
									<div class="flex items-center gap-1.5">
										<div
											class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style="animation-delay: 0ms"
										></div>
										<div
											class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style="animation-delay: 150ms"
										></div>
										<div
											class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style="animation-delay: 300ms"
										></div>
									</div>
								</div>
							</div>
						{/if}
					</div>

					<!-- Chat Input -->
					<div class="border-t border-gray-200 p-3 bg-white">
						<div class="flex items-center gap-2">
							<input
								type="text"
								bind:value={chatInput}
								onkeydown={handleChatKeydown}
								placeholder="Ask about your policies..."
								class="flex-1 px-3.5 py-2 bg-[#f4f6f9] border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all"
							/>
							<button
								onclick={sendMessage}
								disabled={!chatInput.trim() || chatLoading}
								class="w-9 h-9 flex items-center justify-center bg-[#0077CC] text-white rounded-xl hover:bg-[#005FA3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
							>
								<i class="fa-solid fa-paper-plane text-xs"></i>
							</button>
						</div>
					</div>
				</div>
			{:else}
				<!-- Collection List View -->
				<div
					class="overflow-y-auto"
					style="{isFullscreen
						? 'max-height: calc(100vh - 12rem);'
						: 'max-height: 470px;'}"
				>
					{#if loading}
						<div class="flex items-center justify-center py-12">
							<div class="flex flex-col items-center gap-3">
								<div
									class="w-8 h-8 border-3 border-[#0077CC]/30 border-t-[#0077CC] rounded-full animate-spin"
								></div>
								<p class="text-gray-400 text-sm">Loading collections...</p>
							</div>
						</div>
					{:else if error}
						<div class="flex flex-col items-center justify-center py-12 px-4">
							<i
								class="fa-solid fa-circle-exclamation text-red-400 text-2xl mb-2"
							></i>
							<p class="text-gray-500 text-sm text-center">{error}</p>
							<button
								onclick={fetchCollections}
								class="mt-3 text-[#0077CC] text-sm font-medium hover:underline"
							>
								Try again
							</button>
						</div>
					{:else if collections.length === 0}
						<div class="flex flex-col items-center justify-center py-12 px-4">
							<i class="fa-solid fa-folder-open text-gray-300 text-3xl mb-2"></i>
							<p class="text-gray-400 text-sm text-center">No collections found</p>
							<button
								onclick={fetchCollections}
								class="mt-3 text-[#0077CC] text-sm font-medium hover:underline"
							>
								Refresh
							</button>
						</div>
					{:else}
						<div class="p-3 space-y-2">
							{#each collections as collection}
								{@const isSelected = selectedCollectionIds.has(collection.id)}
								{@const fileCount = collection.fileCount ?? collection.files.length}
									<div
									class="rounded-xl border overflow-hidden transition-all {isSelected
										? 'border-[#0077CC] bg-[#0077CC]/5'
										: 'border-gray-200'}"
								>
									<!-- Collection Row -->
									<button
										onclick={() => toggleCollection(collection.id)}
										class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
									>
										<!-- Checkbox -->
										<div
											class="w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0 {isSelected
												? 'bg-[#0077CC] border-[#0077CC]'
												: 'border-gray-300 hover:border-[#0077CC]'}"
										>
											{#if isSelected}
												<i class="fa-solid fa-check text-white text-[10px]"></i>
											{/if}
										</div>

										<!-- Collection icon -->
										<div
											class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 {isSelected
												? 'bg-[#0077CC]/15'
												: 'bg-gray-100'}"
										>
											<i
												class="fa-solid fa-folder text-sm {isSelected
													? 'text-[#0077CC]'
													: 'text-gray-400'}"
											></i>
										</div>

										<!-- Collection info -->
										<div class="flex-1 min-w-0">
											<p class="text-sm font-medium text-gray-800 truncate">
												{collection.name}
											</p>
											<p class="text-xs text-gray-400 mt-0.5">
												{fileCount} file{fileCount !== 1 ? 's' : ''}
												{#if collection.lastUpdated}
													· {collection.lastUpdated}
												{/if}
											</p>
										</div>

										<!-- Expand toggle -->
										{#if fileCount > 0}
											<button
												onclick={(e) => {
													e.stopPropagation();
													toggleExpand(collection.id);
												}}
												class="text-gray-400 hover:text-gray-600 transition-colors p-1"
											>
												<i
													class="fa-solid fa-chevron-down text-xs transition-transform duration-200 {expandedCollections.has(
														collection.id
													)
														? 'rotate-180'
														: ''}"
												></i>
											</button>
										{/if}
									</button>

									<!-- Expandable files preview (read-only, no selection) -->
									{#if expandedCollections.has(collection.id) && collection.files.length > 0}
										<div class="border-t border-gray-100 bg-[#F9FAFB]">
											{#each collection.files as file}
												<div
													class="flex items-center gap-2.5 px-4 py-2 pl-12"
												>
													<i
														class="fa-solid {file.type === 'pdf'
															? 'fa-file-pdf text-red-400'
															: file.type === 'doc' || file.type === 'docx'
																? 'fa-file-word text-blue-400'
																: 'fa-file text-gray-400'} text-sm flex-shrink-0"
													></i>
													<div class="flex-1 min-w-0">
														<p
															class="text-xs text-gray-500 truncate"
															title={file.name}
														>
															{truncateFileName(file.name)}
														</p>
														<p class="text-[10px] text-gray-400">
															{file.size} · {file.uploadedAt}
														</p>
													</div>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Footer with Start Chat -->
				{#if collections.length > 0 && !loading}
					<div class="border-t border-gray-200 px-4 py-3 bg-white">
						<button
							onclick={startChat}
							disabled={selectedCollectionIds.size === 0}
							class="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 {selectedCollectionIds.size >
							0
								? 'bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-md hover:shadow-lg'
								: 'bg-gray-100 text-gray-400 cursor-not-allowed'}"
						>
							{#if selectedCollectionIds.size > 0}
								<i class="fa-solid fa-comments mr-2"></i>
								Chat with {selectedCollectionIds.size} collection{selectedCollectionIds.size >
								1
									? 's'
									: ''}
							{:else}
								Select a collection to start chatting
							{/if}
						</button>
					</div>
				{/if}
			{/if}
		</div>
	{/if}

	<!-- Floating Action Button -->
	<button
		onclick={toggleWidget}
		class="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 {isOpen
			? 'bg-gray-700 hover:bg-gray-800'
			: 'bg-gradient-to-r from-[#0A1628] to-[#1a2740] hover:from-[#1a2740] hover:to-[#2a3a66]'}"
	>
		{#if isOpen}
			<i class="fa-solid fa-xmark text-white text-xl"></i>
		{:else}
			<i class="fa-solid fa-robot text-white text-xl"></i>
		{/if}
	</button>

	<!-- Notification Badge -->
	{#if !isOpen && selectedCollectionIds.size > 0}
		<div
			class="absolute -top-1 ltr:-right-1 rtl:-left-1 w-5 h-5 bg-[#0077CC] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
		>
			{selectedCollectionIds.size}
		</div>
	{/if}
</div>

<style>
	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slide-up {
		animation: slide-up 0.25s ease-out;
	}
</style>
