import io from 'socket.io-client';
import { GetSocketUrl } from 'Screens/Components/BasicMethod/index';
const SOCKET_URL = GetSocketUrl();
var socket;

export const SocketIo = () => {
    if (!socket) {
        var socket1 = io.connect(SOCKET_URL);
        socket = socket1.connect();
        return socket;
    } else {
        return socket;
    }
}
export const clearScoket = ()=>{
    if(socket){
        socket.disconnect();
    }
    socket = null
}