import { io } from "socket.io-client";

export const socket = io(`${window.location.origin.replace("5173", "3000")}`);
