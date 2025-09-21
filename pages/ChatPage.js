import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatSidebar from "../components/ChatSidebar";

const ChatPage = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatSidebar />
    </div>
  );
};

export default ChatPage;
