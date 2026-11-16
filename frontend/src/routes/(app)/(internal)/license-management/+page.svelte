<script lang="ts">
	import { m } from '$paraglide/messages';
	let { data } = $props();
	const license = data.license;
</script>

<div class="card bg-white p-4 shadow-sm space-y-4">
	<table class="border-separate border-spacing-y-4">
		<tbody
			><tr class="py-6">
				<td class="text-lg font-bold px-6">{m.deploymentMode()}</td>
				<td>{license.deployment_mode}</td>
			</tr>

			<tr>
				<td class="text-lg font-bold px-6">{m.licenseType()}</td>
				<td> {license.type} </td>
			</tr>

			<tr>
				<td class="text-lg font-bold px-6">{m.usedSeats()}</td>
				<td>{license.users_number} / {license.users_number_limit}</td>
			</tr>

			<tr>
				<td class="text-lg font-bold px-6">{m.seatsLimit()}</td>
				<td>{m.licenseDisabled()}</td>
			</tr>

			<tr>
				<td class="text-lg font-bold px-6">{m.licenseSupport()}</td>
				<td> {license.support} </td>
			</tr>

			<tr class="">
				<td class="text-lg font-bold px-6">{m.expirationDate()}</td>
				<td> {license.expiration_date} </td>
			</tr>
		</tbody>
	</table>
</div>
