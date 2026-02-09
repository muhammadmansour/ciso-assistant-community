<script lang="ts">
	interface Props {
		open: boolean;
	}

	let { open = $bindable() }: Props = $props();

	function toggle() {
		open = !open;
	}

	let positionClasses = $derived(
		open 
			? 'ltr:left-[15.3rem] rtl:right-[15.3rem]' 
			: 'ltr:left-5 rtl:right-5 ltr:rotate-180 rtl:-rotate-180'
	);
</script>

<!-- SIDEBAR TOGGLE -->
<button
	aria-label="Toggle sidebar"
	onclick={toggle}
	class="{positionClasses} z-20 fixed w-6 h-6 rounded-full content-center self-center bg-[#1e2a4a] shadow-lg border border-white/20 text-white hover:scale-110 hover:bg-[#2a3a5c] transition-all duration-300 top-1/2 bottom-1/2"
	data-testid="sidebar-toggle-btn"
>
	<i class="fa-solid ltr:fa-angle-left rtl:fa-angle-right text-xs"></i>
</button>
