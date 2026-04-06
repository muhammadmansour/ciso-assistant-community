// Set body size limit to 100MB for evidence uploads (must be set before importing the build)
process.env.BODY_SIZE_LIMIT = process.env.BODY_SIZE_LIMIT || '104857600';

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
