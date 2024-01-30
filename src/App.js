import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import appRoutes from "./config/routes";
import LoadingModal from "./components/Loading";
import { messaging, onMessageListener } from "./config/third_party/firebase";
import Message from "./components/Modal/Message";
import { toast } from "react-toastify";
import { onMessage } from "firebase/messaging";

function App() {
  const routes = useRoutes(appRoutes);

  onMessage(messaging, (payload) => {
    toast(<Message notification={payload.notification} />);  
  });

  return <Suspense fallback={<LoadingModal open={true} />}>{routes}</Suspense>;
}

export default App;