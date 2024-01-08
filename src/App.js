import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/Content.css';
import * as BaseStyle from "./styles/base/index";
import Login from "./Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "./config";
import Middleware from "./Middleware";
import Inbox from "./Inbox";
import Read from "./Read";
import Compose from "./Compose";
import { useEffect, useState } from "react";

export default function App() {
  const [clientID, setClientID] = useState(null);

  useEffect(() => {
    if (clientID === null) {
      let clid = window.localStorage.getItem('google_client_id');
      setClientID(
        clid === null ? config.google.clientID : clid
      );
    }
  }, [clientID]);

    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GoogleOAuthProvider clientId={clientID}><Login /></GoogleOAuthProvider>} />
            <Route path="/login" element={<GoogleOAuthProvider clientId={clientID}><Login /></GoogleOAuthProvider>} />
            <Route path="/inbox" element={<Middleware><Inbox /></Middleware>} />
            <Route path="/compose" element={<Middleware><Compose /></Middleware>} />
            <Route path="/read/:id" element={<Middleware><Read /></Middleware>} />
          </Routes>
        </BrowserRouter>
    )
}