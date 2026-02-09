<script lang="ts">
	import { m } from '$paraglide/messages';
	import Typewriter from 'sv-typewriter';
</script>

<div
	id="hellothere"
	class="flex flex-col justify-center items-center text-white"
>
	<Typewriter mode="loopOnce" cursor={false} interval={50}>
		<div class="text-2xl unstyled text-center pb-4">
			<span class="text-2xl text-center text-white/90">{m.helloThere()} </span>
			<span class="text-white"> {m.thisIsCisoAssistant()} </span>
		</div>
	</Typewriter>
	<Typewriter mode="cascade" cursor={false} interval={45} delay={5000}>
		<div class="text-xl unstyled text-center text-white/70">
			<span> {m.yourStreamlined()} </span>
			<span class="font-bold text-white"> {m.oneStopShop()} </span>
			<span> {m.forComplianceRiskManagement()} </span>
		</div>
	</Typewriter>
</div>
