import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden font-[Gambarino-Regular]">
     <Routes>
      <Route path="/" element={<Home />} />
     </Routes>
    </div>
  );
};

export default App;
