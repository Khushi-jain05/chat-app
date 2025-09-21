import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      await supabase.from("profiles").insert([{ id: data.user.id, name }]);
      navigate("/login");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Register</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
