import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ChatBox from "./ChatBox";
import { AuthContext } from "../context/AuthContext";

const ChatSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Fetch friends where status = 'accepted'
  const fetchFriends = async () => {
    if (!currentUser) return;

    const { data, error } = await supabase
      .from("friends")
      .select("friend_id, users!inner(id, name, profile_pic)")
      .eq("user_id", currentUser.id)
      .eq("status", "accepted");

    if (error) console.error(error);
    else setFriends(data);
  };

  useEffect(() => {
    fetchFriends();
  }, [currentUser]);

  if (!currentUser) return <p>Loading user...</p>;

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Friends List */}
      <div style={{ width: "250px", borderRight: "1px solid gray", padding: "10px" }}>
        <h3>Friends</h3>
        {friends.map((f) => (
          <div
            key={f.friend_id}
            onClick={() => setSelectedFriend(f)}
            style={{ cursor: "pointer", margin: "10px 0", display: "flex", alignItems: "center" }}
          >
            <img
              src={f.users.profile_pic || "https://via.placeholder.com/40"}
              alt=""
              width="40"
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            {f.users.name}
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div style={{ flex: 1 }}>
        {selectedFriend ? (
          <ChatBox friend={selectedFriend} currentUser={currentUser} />
        ) : (
          <p style={{ padding: "20px" }}>Select a friend to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;

