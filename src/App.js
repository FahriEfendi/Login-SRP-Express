import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hacked from "./components/hacked";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Hacked />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
