import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/Not-Found";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
