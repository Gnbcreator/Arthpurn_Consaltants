import { io } from 'socket.io-client';

const sendMessages = () => {
   const socket = io(process.env.NEXT_PUBLIC_BACKEND_URI,{
      withCredentials:true
   });
}
export { sendMessages }