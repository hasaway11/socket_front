import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { create } from "zustand";
import { getUsername } from "../utils/authApi";

const useAppStore = create((set, get) => ({
  username: undefined,
  socket: null,

  // 웹소켓 연결 생성 함수
  connectWebSocket: () => {
   // 이미 연결되어 있으면 무시
    if (get().socket) 
      return; 

    const client = new Client({
      reconnectDelay: 5000,
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        console.log("웹 소켓 연결");
        set({ socket: client });
      },
      onStompError: (frame) => {
        console.error("웹소켓 오류:", frame);
      }
    });

    client.activate();
  },

  // 로그인 여부 확인
  checkAuth: async () => {
    try {
      const res = await getUsername();
      const username = res.data.username;
      set({ username });

      // 로그인 성공 후 웹소켓이 없다면 연결 시도
      if (!get().socket) {
        get().connectWebSocket();
      }
    } catch (err) {
      if (err.status !== 409) 
        console.log(err);
      set({ username: null, socket:null });
    }
  },

  // 수동으로 사용자 설정
  setLogin: (username) => {
    set({ username });
    get().connectWebSocket();
  },

  // 로그아웃 처리
  setLogout: () =>set({ username: null, socket: null }),

}));

export default useAppStore;