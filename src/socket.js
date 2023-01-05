import io from 'socket.io-client';
import { GetSocketUrl } from 'Screens/Components/BasicMethod/index';
const SOCKET_URL = GetSocketUrl();
var socket;

export const SocketIo = () => {
    console.log('socket', socket)
    if (!socket) {
        console.log('for new')
        var socket1 = io.connect(SOCKET_URL);
        socket = socket1.connect();
        return socket;
    } else {
        console.log('return old one')
        return socket;
    }
}
export const clearScoket = ()=>{
    console.log('socket', socket)
    if(socket){
        socket.disconnect();
    }
    socket = null
}