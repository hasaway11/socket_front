import { useEffect } from "react";
import { toast } from "react-toastify";
import useWebSocketStore from "../stores/useWebSocketStore";


const NotificationListener = () => {
   const { client } = useWebSocketStore();

  useEffect(() => {
    if (!client || !client.connected) return;

    const subscription = client.subscribe("/queue/noti", (message) => {
      const body = message.body;
      console.log("📥 받은 메시지:", body);
      toast.info(`🔔 알림: ${body}`);
    });

    return () => subscription.unsubscribe();
  }, [client]);

  return null; // UI 요소는 없고, 메시지 수신만 담당
};

export default NotificationListener