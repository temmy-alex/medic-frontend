import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import appRoutes from "./config/routes";
import LoadingModal from "./components/Loading";
import { onMessageListener } from "./config/third_party/firebase";
import Message from "./components/Modal/Message";
import { toast } from "react-toastify";

function App() {
  const routes = useRoutes(appRoutes);

  onMessageListener()
    .then((payload) => {
      toast(<Message notification={payload.notification} />);  
    })
    .catch((err) => console.log('failed: ', err));

  return <Suspense fallback={<LoadingModal open={true} />}>{routes}</Suspense>;
}

export default App;