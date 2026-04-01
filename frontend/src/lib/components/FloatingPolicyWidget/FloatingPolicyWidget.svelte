<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface PolicyFile {
		id: string;
		name: string;
		type: string;
		mimeType: string;
		size: string;
		geminiFileName: string;
		geminiFileUri: string;
		storeDocName: string;
		uploadedAt: string;
	}

	interface PolicyCollection {
		id: string;
		name: string;
		description: string;
		storeId: string;
		status: string;
		files: PolicyFile[];
		lastUpdated: string;
	}

	let isOpen = $state(false);
	let collections = $state<PolicyCollection[]>([]);
	let loading = $state(false);
	let error = $state('');

	// Track selected file IDs
	let selectedFileIds = $state<Set<string>>(new Set());

	// Track expanded collections
	let expandedCollections = $state<Set<string>>(new Set());

	// Chat state
	let chatMode = $state(false);
	let chatMessages = $state<{ role: 'user' | 'assistant'; content: string }[]>([]);
	let chatInput = $state('');
	let chatLoading = $state(false);

	onMount(() => {
		fetchCollections();
	});

	async function fetchCollections() {
		if (!browser) return;
		loading = true;
		error = '';
		try {
			const res = await fetch('https://grc-admin.wathbah.dev/api/policy-collections');
			const json = await res.json();
			if (json.success) {
				collections = json.data;
				// Auto-expand all collections
				expandedCollections = new Set(collections.map((c) => c.id));
			} else {
				error = 'Failed to load collections';
			}
		} catch (e) {
			error = 'Failed to connect to server';
		} finally {
			loading = false;
		}
	}

	function toggleWidget() {
		isOpen = !isOpen;
		if (isOpen && collections.length === 0 && !loading) {
			fetchCollections();
		}
	}

	function toggleCollection(collectionId: string) {
		const collection = collections.find((c) => c.id === collectionId);
		if (!collection) return;

		const allFileIds = collection.files.map((f) => f.id);
		const allSelected = allFileIds.every((id) => selectedFileIds.has(id));

		const newSet = new Set(selectedFileIds);
		if (allSelected) {
			allFileIds.forEach((id) => newSet.delete(id));
		} else {
			allFileIds.forEach((id) => newSet.add(id));
		}
		selectedFileIds = newSet;
	}

	function toggleFile(fileId: string) {
		const newSet = new Set(selectedFileIds);
		if (newSet.has(fileId)) {
			newSet.delete(fileId);
		} else {
			newSet.add(fileId);
		}
		selectedFileIds = newSet;
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

	function isCollectionFullySelected(collectionId: string): boolean {
		const collection = collections.find((c) => c.id === collectionId);
		if (!collection || collection.files.length === 0) return false;
		return collection.files.every((f) => selectedFileIds.has(f.id));
	}

	function isCollectionPartiallySelected(collectionId: string): boolean {
		const collection = collections.find((c) => c.id === collectionId);
		if (!collection || collection.files.length === 0) return false;
		const someSelected = collection.files.some((f) => selectedFileIds.has(f.id));
		const allSelected = collection.files.every((f) => selectedFileIds.has(f.id));
		return someSelected && !allSelected;
	}

	function getSelectedCount(): number {
		return selectedFileIds.size;
	}

	function getSelectedFiles(): { file: PolicyFile; collectionName: string }[] {
		const result: { file: PolicyFile; collectionName: string }[] = [];
		for (const collection of collections) {
			for (const file of collection.files) {
				if (selectedFileIds.has(file.id)) {
					result.push({ file, collectionName: collection.name });
				}
			}
		}
		return result;
	}

	function startChat() {
		if (selectedFileIds.size === 0) return;
		chatMode = true;
		chatMessages = [];

		const selectedFiles = getSelectedFiles();
		const fileNames = selectedFiles.map((sf) => sf.file.name).join(', ');
		chatMessages = [
			{
				role: 'assistant',
				content: `I'm ready to help you with ${selectedFiles.length} selected document${selectedFiles.length > 1 ? 's' : ''}. Ask me anything about them!`
			}
		];
	}

	function goBack() {
		chatMode = false;
	}

	async function sendMessage() {
		if (!chatInput.trim() || chatLoading) return;

		const userMessage = chatInput.trim();
		chatInput = '';
		chatMessages = [...chatMessages, { role: 'user', content: userMessage }];
		chatLoading = true;

		try {
			const selectedFiles = getSelectedFiles();

			const res = await fetch('https://grc-admin.wathbah.dev/api/policy-collections/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: userMessage,
					fileIds: Array.from(selectedFileIds),
					collectionIds: [
						...new Set(
							selectedFiles.map((sf) => {
								const col = collections.find((c) =>
									c.files.some((f) => f.id === sf.file.id)
								);
								return col?.id;
							})
						)
					].filter(Boolean)
				})
			});

			const json = await res.json();
			chatMessages = [
				...chatMessages,
				{ role: 'assistant', content: json.data?.response || json.message || 'No response' }
			];
		} catch {
			chatMessages = [
				...chatMessages,
				{ role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
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

	function truncateFileName(name: string, maxLen = 40): string {
		if (name.length <= maxLen) return name;
		const ext = name.split('.').pop();
		return name.substring(0, maxLen - 4 - (ext?.length || 0)) + '...' + (ext ? '.' + ext : '');
	}
</script>

<!-- Floating Widget Button -->
<div class="fixed bottom-6 right-6 z-50">
	<!-- Widget Panel -->
	{#if isOpen}
		<div
			class="absolute bottom-16 right-0 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slide-up"
			style="max-height: 520px;"
		>
			<!-- Header -->
			<div
				class="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-5 py-4 flex items-center justify-between"
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
							<p class="text-white/60 text-xs">{getSelectedCount()} files selected</p>
						</div>
					</div>
				{:else}
					<div>
						<h3 class="text-white font-semibold text-sm">Policy Collections</h3>
						<p class="text-white/60 text-xs">Select documents to chat with</p>
					</div>
				{/if}
				<button
					onclick={toggleWidget}
					class="text-white/70 hover:text-white transition-colors"
				>
					<i class="fa-solid fa-xmark text-lg"></i>
				</button>
			</div>

			{#if chatMode}
				<!-- Chat View -->
				<div class="flex flex-col" style="height: 420px;">
					<!-- Messages -->
					<div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
						{#each chatMessages as msg}
							<div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
								<div
									class="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed {msg.role ===
									'user'
										? 'bg-[#7C3AED] text-white rounded-br-md'
										: 'bg-white text-gray-700 border border-gray-200 rounded-bl-md shadow-sm'}"
								>
									{msg.content}
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
								class="flex-1 px-3.5 py-2 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:bg-white transition-all"
							/>
							<button
								onclick={sendMessage}
								disabled={!chatInput.trim() || chatLoading}
								class="w-9 h-9 flex items-center justify-center bg-[#7C3AED] text-white rounded-xl hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
							>
								<i class="fa-solid fa-paper-plane text-xs"></i>
							</button>
						</div>
					</div>
				</div>
			{:else}
				<!-- Collection List View -->
				<div class="overflow-y-auto" style="max-height: 380px;">
					{#if loading}
						<div class="flex items-center justify-center py-12">
							<div class="flex flex-col items-center gap-3">
								<div
									class="w-8 h-8 border-3 border-[#7C3AED]/30 border-t-[#7C3AED] rounded-full animate-spin"
								></div>
								<p class="text-gray-400 text-sm">Loading collections...</p>
							</div>
						</div>
					{:else if error}
						<div class="flex flex-col items-center justify-center py-12 px-4">
							<i class="fa-solid fa-circle-exclamation text-red-400 text-2xl mb-2"></i>
							<p class="text-gray-500 text-sm text-center">{error}</p>
							<button
								onclick={fetchCollections}
								class="mt-3 text-[#7C3AED] text-sm font-medium hover:underline"
							>
								Try again
							</button>
						</div>
					{:else if collections.length === 0}
						<div class="flex flex-col items-center justify-center py-12 px-4">
							<i class="fa-solid fa-folder-open text-gray-300 text-3xl mb-2"></i>
							<p class="text-gray-400 text-sm">No collections found</p>
						</div>
					{:else}
						<div class="p-3 space-y-2">
							{#each collections as collection}
								<div class="rounded-xl border border-gray-200 overflow-hidden">
									<!-- Collection Header -->
									<div class="flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors">
										<button
											onclick={() => toggleExpand(collection.id)}
											class="text-gray-400 hover:text-gray-600 transition-colors w-5 h-5 flex items-center justify-center"
										>
											<i
												class="fa-solid fa-chevron-right text-xs transition-transform duration-200 {expandedCollections.has(
													collection.id
												)
													? 'rotate-90'
													: ''}"
											></i>
										</button>

										<button
											onclick={() => toggleCollection(collection.id)}
											class="w-4.5 h-4.5 rounded flex items-center justify-center border-2 transition-all {isCollectionFullySelected(
												collection.id
											)
												? 'bg-[#7C3AED] border-[#7C3AED]'
												: isCollectionPartiallySelected(collection.id)
													? 'bg-[#7C3AED]/30 border-[#7C3AED]'
													: 'border-gray-300 hover:border-[#7C3AED]'}"
										>
											{#if isCollectionFullySelected(collection.id)}
												<i class="fa-solid fa-check text-white text-[9px]"></i>
											{:else if isCollectionPartiallySelected(collection.id)}
												<i class="fa-solid fa-minus text-white text-[9px]"></i>
											{/if}
										</button>

										<button
											onclick={() => toggleExpand(collection.id)}
											class="flex-1 text-left"
										>
											<span class="text-sm font-medium text-gray-700"
												>{collection.name}</span
											>
											<span class="text-xs text-gray-400 ml-2"
												>({collection.files.length})</span
											>
										</button>
									</div>

									<!-- Files List -->
									{#if expandedCollections.has(collection.id)}
										<div class="border-t border-gray-100">
											{#each collection.files as file}
												<button
													onclick={() => toggleFile(file.id)}
													class="w-full flex items-center gap-2.5 px-3 py-2 pl-10 hover:bg-[#7C3AED]/5 transition-colors text-left"
												>
													<div
														class="w-4 h-4 rounded flex items-center justify-center border-2 transition-all flex-shrink-0 {selectedFileIds.has(
															file.id
														)
															? 'bg-[#7C3AED] border-[#7C3AED]'
															: 'border-gray-300 hover:border-[#7C3AED]'}"
													>
														{#if selectedFileIds.has(file.id)}
															<i class="fa-solid fa-check text-white text-[9px]"></i>
														{/if}
													</div>

													<i
														class="fa-solid {file.type === 'pdf'
															? 'fa-file-pdf text-red-400'
															: file.type === 'doc' || file.type === 'docx'
																? 'fa-file-word text-blue-400'
																: 'fa-file text-gray-400'} text-sm flex-shrink-0"
													></i>

													<div class="flex-1 min-w-0">
														<p
															class="text-xs text-gray-600 truncate"
															title={file.name}
														>
															{truncateFileName(file.name)}
														</p>
														<p class="text-[10px] text-gray-400">
															{file.size} · {file.uploadedAt}
														</p>
													</div>
												</button>
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
							disabled={selectedFileIds.size === 0}
							class="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 {selectedFileIds.size >
							0
								? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white hover:from-[#6D28D9] hover:to-[#5B21B6] shadow-md hover:shadow-lg'
								: 'bg-gray-100 text-gray-400 cursor-not-allowed'}"
						>
							{#if selectedFileIds.size > 0}
								<i class="fa-solid fa-comments mr-2"></i>
								Chat with {selectedFileIds.size} file{selectedFileIds.size > 1 ? 's' : ''}
							{:else}
								Select files to start chatting
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
			: 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6]'}"
	>
		{#if isOpen}
			<i class="fa-solid fa-xmark text-white text-xl"></i>
		{:else}
			<i class="fa-solid fa-robot text-white text-xl"></i>
		{/if}
	</button>

	<!-- Notification Badge -->
	{#if !isOpen && selectedFileIds.size > 0}
		<div
			class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
		>
			{selectedFileIds.size}
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
