import net from 'net';
import Config from './config'
import BackupStorage from './pkg/backup/BackupStorage';
import TCPRouter from './api/tcp/tcp';

const config = new Config()

BackupStorage.load(config.backupFile)
const server = net.createServer((socket) => {
	socket.on('data', (data:string) => {
		const responseData = TCPRouter.handleRequest(data);
		socket.write(responseData);
	});
});

server.listen(config.port, config.host, () => {
	console.log(`🌱 Radish running at ${config.host}:${config.port}`);
});

process.on('SIGINT', () => {
	server.close(() => {
		console.log('✅ Server gracefuly closed.');
	});
	BackupStorage.save(config.backupFile)
});