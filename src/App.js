import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/Content.css';
import * as BaseStyle from "./styles/base/index"
import Login from "./Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "./config";
import Middleware from "./Middleware";
import Inbox from "./Inbox";
import Read from "./Read";
import Compose from "./Compose";
import Tes from "./Tes";

export default function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GoogleOAuthProvider clientId={config.google.clientID}><Login /></GoogleOAuthProvider>} />
            <Route path="/login" element={<GoogleOAuthProvider clientId={config.google.clientID}><Login /></GoogleOAuthProvider>} />
            <Route path="/inbox" element={<Middleware><Inbox /></Middleware>} />
            <Route path="/compose" element={<Middleware><Compose /></Middleware>} />
            <Route path="/read/:id" element={<Middleware><Read /></Middleware>} />
            <Route path="/tes" element={<Tes />} />
          </Routes>
        </BrowserRouter>
    )
}