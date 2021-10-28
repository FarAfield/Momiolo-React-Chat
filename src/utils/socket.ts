import io from "socket.io-client";
import { useEffect, useRef } from "react";

// @ts-ignore
const host = import.meta.env.DEV ? "localhost:9098" : "";
interface SocketProps {
  disconnect: Function;
  on: Function;
  emit: Function;
}
interface OptionsProps {
  receive?: Function;
  receiveByRoom?: Function;
}
const useSocket = (userId: string, options: OptionsProps) => {
  const { receive, receiveByRoom } = options;
  const socket = useRef<SocketProps>();

  useEffect(() => {
    socket.current = io(host, {
      query: { userId },
      reconnection: true,
      reconnectionDelay: 15000,
      reconnectionAttempts: 10, // 重连次数
      transports: ["websocket", "polling"],
    });
    return () => socket.current?.disconnect();
  }, []);

  /**
   *  socket 基础事件
   */
  useEffect(() => {
    if (socket.current) {
      socket.current.on("connect", () => {
        console.log("socket.io已连接");
      });
      socket.current.on("disconnect", () => {
        console.log("socket.io断开连接");
      });
      socket.current.on("connect_error", (error: any) => {
        console.log("socket.io连接失败", error);
      });
      /**
       * 消息接收
       * @param data
       */
      socket.current.on("receiveMsgEvent", (data: any) => {
        receive?.(data);
      });
      /**
       * 接收指定房间的消息
       * @param roomId
       * @param data
       */
      socket.current.on("receiveRoomMsgEvent", (roomId: string, data: any) => {
        receiveByRoom?.(roomId, data);
      });
    }
  });

  /**
   *  关闭socket连接
   */
  function disconnect() {
    socket.current?.disconnect();
  }

  /**
   *  加入房间
   * @param roomId
   */
  function joinRoom(roomId: string) {
    socket.current?.emit("joinRoom", roomId);
  }

  /**
   *  离开房间
   * @param roomId
   */
  function leaveRoom(roomId: string) {
    socket.current?.emit("leaveRoom", roomId);
  }

  /**
   * 消息群发
   * @param msgContent
   * @param targetUserId
   */
  function send({ msgContent, targetUserId }: any) {
    socket.current?.emit("sendMsgEvent", { msgContent, targetUserId });
  }

  /**
   * 指定房间发送消息
   * @param roomId
   * @param msgContent
   * @param targetUserId
   */
  function sendToRoom(roomId: string, { msgContent, targetUserId }: any) {
    socket.current?.emit("sendRoomMsgEvent", roomId, {
      msgContent,
      targetUserId,
    });
  }

  return {
    disconnect,
    joinRoom,
    leaveRoom,
    send,
    sendToRoom,
  };
};
export { useSocket };
