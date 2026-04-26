// Set body size limit to 50MB if not already configured (SvelteKit default is 512KB)
// Must be set BEFORE importing the handler, and dynamic import is needed
// because static imports are hoisted above all other code in ES modules.
if (!process.env.BODY_SIZE_LIMIT) {
	process.env.BODY_SIZE_LIMIT = '50000000';
}

const { server } = await import('../build/index.js');

process.on('SIGINT', () => {
	console.log('Got SIGINT. Starting graceful shutdown.');
	shutdownServer();
});

process.on('SIGTERM', () => {
	console.log('Got SIGTERM. Starting graceful shutdown.');
	shutdownServer();
});

function shutdownServer() {
	server.server?.close(() => {
		console.log('Server closed');
		process.exit(0);
	});
	server.server?.closeIdleConnections();
	setInterval(() => server.server?.closeIdleConnections(), 1_000);
	setTimeout(() => server.server?.closeAllConnections(), 20_000);
}
