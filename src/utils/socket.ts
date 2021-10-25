import io from "socket.io-client";

const createSocket = (userId: string) => {
  // 本地访问为localhost:9092
  const socket = io(`localhost:9098`, {
    query: { userId },
    reconnection: true,
    reconnectionDelay: 15000,
    reconnectionAttempts: 10, // 重连次数
    transports: ["websocket", "polling"],
  });
  socket.on("connect", () => {
    console.log("socket.io已连接");
  });
  socket.on("disconnect", () => {
    console.log("socket.io断开连接");
  });
  socket.on("connect_error", (error: any) => {
    console.log("socket.io连接失败", error);
  });

  /**
   *  关闭socket连接
   */
  function closeSocket() {
    socket.disconnect();
  }

  /**
   *  加入房间
   * @param roomId
   */
  function joinRoom(roomId: string) {
    socket.emit("joinRoom", roomId);
  }

  /**
   *  离开房间
   * @param roomId
   */
  function leaveRoom(roomId: string) {
    socket.emit("leaveRoom", roomId);
  }

  /**
   * 消息群发
   * @param msgContent
   */
  function send(msgContent: string) {
    socket.emit("sendMsgEvent", { msgContent });
  }

  /**
   * 消息接收
   * @param data
   */
  function receive(data: any) {
    return new Promise(resolve => resolve(data))
  }
  socket.on("receiveMsgEvent", (data: any) => {
    receive(data);
  });

  /**
   * 指定房间发送消息
   * @param roomId
   * @param msgContent
   */
  function sendToRoom(roomId: string, msgContent: string) {
    socket.emit("sendRoomMsgEvent", roomId, {
      msgContent,
    });
  }

  /**
   * 接收指定房间的消息
   * @param roomId
   * @param data
   */
  function receiveByRoom(roomId: string, data: string) {}
  socket.on("receiveRoomMsgEvent", (roomId: string, data: string) => {
    receiveByRoom(roomId, data);
  });

  return {
    closeSocket,
    joinRoom,
    leaveRoom,
    send,
    receive,
    sendToRoom,
    receiveByRoom,
  };
};
export { createSocket };

/**
 *  房间相关：（socket连接时默认加入""房间）
 *  保持唯一房间（加入新房间前需要离开旧房间）
 *  保持多个房间（直接加入新房间，同一客户端可以加入多个房间）
 *  多个客户端加入同一个房间，使用socketRoomSend与useSocketRoomReceiveEvent
 *  其效果等同于使用全局连接并设置isAll为1
 */
