
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { createServer } from 'http';

function shocketServer(app, message, userId) {
   const httpServer = createServer(app);

   // creating the server
   const io = new Server(httpServer, {
      cors: {
         origin: process.env.FRONTEND_URI,
         credentials: true
      }
   })

   // temprory storage for the connectedUser with presistant userId=socketId's
   const connectedUser = new Map();


   // creating connection between the socket sever an client/frontend;
   io.on('connection', (socket) => {

      const rowToken = socket.handshake.headers?.cookie || '';
      const cookieObject = Object.fromEntries(
         rowToken.split(';').map((cookie) => cookie.trim().split("="))
      )

      if (!cookieObject) return

      if (cookieObject?.userRefreshToken) {
         try {
            const decodedUserToken = jwt.verify(cookieObject.userRefreshToken, process.env.REFRESH_TOKEN_SECRETE);
            const user_id = decodedUserToken._id;

            if (user_id) {
               connectedUser.set(user_id, new Set());
            }
            connectedUser.get(user_id).add(socket.id);

         } catch (error) {
            console.log(error)
         }
      }

      if (cookieObject.adminRefreshToken) {
         try {
            const decodedAdminToken = jwt.verify(cookieObject.adminRefreshToken, process.env.REFRESH_TOKEN_SECRETE);
            const admin_id = decodedAdminToken._id;
            if (admin_id) {
               connectedUser.set(admin_id, new Set())
            }
            connectedUser.get(admin_id).add(socket.id);
           
            





         } catch (error) {
            console.log(error)
         }
      }
       
      
       
      socket.on('desconnect', () => {
         console.log('client desconnected:', socket.id);
      })

   });

   return { httpServer }
}
export { shocketServer }