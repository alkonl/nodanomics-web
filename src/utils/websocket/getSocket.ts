import {io, Socket} from "socket.io-client";
import {CONFIG} from "../config";
import Session from "supertokens-auth-react/recipe/session";

let socket: Socket;
export async function  getSocket() {
    const token = await Session.getAccessToken();
    if (token === undefined) {
        throw new Error("User is not logged in");
    }
    if (!socket) {
        socket = io(`http://localhost:8081`,{
            withCredentials: true,
            query: { token }
        });
    }
    return socket;
}
