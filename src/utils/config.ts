export const CONFIG = {
    API_URL: import.meta.env.VITE_API_URL,
    API_SOCKET_URL: import.meta.env.VITE_API_SOCKET_URL,
    VITE_API_WEBSOCKET_PATH: import.meta.env.VITE_API_WEBSOCKET_PATH,
    WEB_URL: import.meta.env.VITE_WEB_URL,
    IS_OFFLINE: import.meta.env.IS_OFFLINE || false,
}
