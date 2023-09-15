import {io, Socket} from "socket.io-client";
import {CONFIG} from "../config";
import Session from "supertokens-auth-react/recipe/session";

let socket: Socket;

export async function getSocketAsync() {
    const token = await Session.getAccessToken();
    console.log('token: ', token)
    if (token === undefined) {
        throw new Error("User is not logged in");
    }
    if (!socket) {
        socket = io(`${CONFIG.API_SOCKET_URL}`, {
            path: '/api/socket',
            withCredentials: true,
            query: {token}
        });
    }
    return socket;
}

export function getSocket({token}: {
    token?: string
}) {
    if(token) {
        if (!socket) {
            socket = io(`http://localhost:8081`, {
                withCredentials: true,
                query: {token}
            });
        }
        return socket;
    }
}
