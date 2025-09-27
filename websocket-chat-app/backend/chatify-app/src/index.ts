export interface Env {
	ROOM: DurableObjectNamespace;
}

interface Message {
	type: 'createRoom' | 'joinRoom' | 'message' | 'error';
	roomId?: string;
	text?: string;
	message?: string;
}

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(req.url);

		if (url.pathname === '/ws') {
			const [client, server] = Object.values(new WebSocketPair()) as [WebSocket, WebSocket];
			const roomId = url.searchParams.get('roomId');
			const id = env.ROOM.idFromName(roomId || crypto.randomUUID());
			const obj = env.ROOM.get(id);

			// Pass the server half into the Durable Object
			obj.fetch(req, { server } as any);

			return new Response(null, { status: 101, webSocket: client });
		}

		return new Response('Not found', { status: 404 });
	},
};

export class RoomDurable implements DurableObject {
	state: DurableObjectState;
	env: Env;
	sockets: Set<WebSocket>;

	constructor(state: DurableObjectState, env: Env) {
		this.state = state;
		this.env = env;
		this.sockets = new Set();
	}

	async fetch(req: Request): Promise<Response> {
		const upgradeHeader = req.headers.get('Upgrade');
		if (upgradeHeader !== 'websocket') {
			return new Response('Expected websocket', { status: 426 });
		}

		const pair = new WebSocketPair();
		const [client, server] = Object.values(pair) as [WebSocket, WebSocket];

		server.accept();
		this.handleSocket(server);

		return new Response(null, { status: 101, webSocket: client });
	}

	private handleSocket(socket: WebSocket): void {
		socket.addEventListener('message', (event: MessageEvent) => {
			let data: Message;
			try {
				data = JSON.parse(event.data as string) as Message;
			} catch {
				socket.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
				return;
			}

			if (data.type === 'createRoom') {
				const roomId = crypto.randomUUID();
				this.sockets.add(socket);
				socket.send(JSON.stringify({ type: 'roomCreated', roomId }));
			}

			if (data.type === 'joinRoom' && data.roomId) {
				this.sockets.add(socket);
				socket.send(JSON.stringify({ type: 'joinedRoom', roomId: data.roomId }));
			}

			if (data.type === 'message' && data.text) {
				for (const client of this.sockets) {
					try {
						client.send(JSON.stringify({ type: 'message', text: data.text }));
					} catch (e) {
						console.log('send failed', e);
					}
				}
			}
		});

		socket.addEventListener('close', () => {
			this.sockets.delete(socket);
		});
	}
}
