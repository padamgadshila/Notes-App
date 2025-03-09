import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import AddLayout from "./layouts/AddLayout";
import "./App.css";
import ViewLayout from "./layouts/ViewLayout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/add" element={<AddLayout />} />
        <Route path="/view" element={<ViewLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
