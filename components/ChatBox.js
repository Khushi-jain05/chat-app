import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ChatBox = ({ currentUser, friend }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch existing messages between currentUser and selected friend
  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(
        `sender_id.eq.${currentUser.id},receiver_id.eq.${friend.friend_id}`
      )
      .order("created_at", { ascending: true });

    setMessages(data || []);
  };

  useEffect(() => {
    if (!friend) return;
    fetchMessages();

    // Subscribe to new messages in real-time
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const msg = payload.new;
          if (
            (msg.sender_id === currentUser.id && msg.receiver_id === friend.friend_id) ||
            (msg.sender_id === friend.friend_id && msg.receiver_id === currentUser.id)
          ) {
            setMessages((prev) => [...prev, msg]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [friend]);

  const sendMessage = async () => {
    if (!newMessage) return;

    await supabase.from("messages").insert([
      { sender_id: currentUser.id, receiver_id: friend.friend_id, content: newMessage },
    ]);

    setNewMessage("");
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", height: "100%" }}>
      <h3>Chat with {friend.users.name}</h3>
      <div style={{ flex: 1, overflowY: "auto", border: "1px solid gray", padding: "10px" }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              textAlign: m.sender_id === currentUser.id ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                padding: "5px 10px",
                borderRadius: "10px",
                background: m.sender_id === currentUser.id ? "#a0e1e0" : "#eee",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px" }}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
