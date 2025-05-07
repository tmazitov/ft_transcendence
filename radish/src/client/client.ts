import net from 'net';
import RadishRequest from './request';
import RadishResponse from './response';

type RadishClientConfig = {
	host: string;
	port: number;
	onConnect?: () => void;
}

export default class RadishClient {
	private conn : net.Socket;
	private config: RadishClientConfig;

	constructor(config: RadishClientConfig) {
		this.config = config;
		this.conn = net.createConnection({ port: config.port, host: config.host }, this.config.onConnect);
	}

	close() {
		this.conn.end();
	}

	async get(key: string) {
		const request = RadishRequest.get(key);
		const data = await request.send(this.conn);
		return new RadishResponse(data);
	}

	async set(key: string, value: string, expire?: number) {
		const request = RadishRequest.set(key, value, expire);
		const data = await request.send(this.conn);
		return new RadishResponse(data);
	}

	async delete(key: string) {
		const request = RadishRequest.del(key);
		const data = await request.send(this.conn);
		return new RadishResponse(data);
	}
}