import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { create } from "zustand";
import { getUsername } from "../utils/authApi";

// create함수는 커스텀 훅 함수를 리턴하는 팩토리 함수
// useAppStore()를 호출했을 때 반환되는 값이 store 객체(상태와 메서드로 구성)

// zustand는 상태를 다루기위한 set, get 함수를 제공
// 사용자는 상태를 정의하고 set, get을 이용해 상태를 관리
// create를 통해 zustand는 set, get을 파라미터로 제공하고 사용자가 작성한 로직을 전달받아 커스텀훅을 생성
const useAppStore = create((set, get) => ({
  username: undefined,
  role:undefined,
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
      const {username,role} = res.data;
      const prevUsername = get().username;

      set({ username, role });

      // 로그인 성공 후 웹소켓이 없다면 연결 시도
      if (prevUsername !== username) {
        console.log("checkAuth", "연결합니다");
        get().connectWebSocket();
      }
    } catch (err) {
      if (err.status !== 409) 
        console.log(err);
      set({ username: null, socket:null });
    }
  },

  // 수동으로 사용자 설정
  setLogin: (username, role) => {
    set({ username, role });
    console.log("setLogin", "연결합니다");
    get().connectWebSocket();
  },

  // 로그아웃 처리
  setLogout: () =>{
    get().socket.deactivate();
    set({ username: null, socket: null });
  }
}));

export default useAppStore;