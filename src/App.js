import { useState } from "react";
import LoginForm from "./pages/Login";
import SRPForm from "./pages/Srp";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div>
      {!userId ? (
        <LoginForm onSuccess={setUserId} />
      ) : (
        <SRPForm userId={userId} />
      )}
    </div>
  );
}

export default App;
