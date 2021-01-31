import io from "socket.io-client";

export const socketService = {
  connect,
};

function connect() {
  return new Promise((resolve, reject) => {
    const socket = io("localhost:5000", {
      query: { token: localStorage.getItem("token") },
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}
