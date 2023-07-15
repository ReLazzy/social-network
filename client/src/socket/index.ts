import io from 'socket.io-client';
// import { receiveMessage } from './redux/chatSlice';

const socket = io('ws://45.141.76.248:8900');

export default socket;
