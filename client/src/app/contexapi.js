import { createContext, useContext } from "react";

const UserData = createContext();
const AdminData = createContext();

const useData = () => {
   return useContext(UserData);
}
const useAdmin = () => {
   return useContext(AdminData);
}
export { UserData, useData,AdminData,useAdmin }