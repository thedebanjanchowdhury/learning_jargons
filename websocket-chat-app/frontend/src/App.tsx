import Chat from "./pages/Chat";
import CreateRoom from "./pages/CreateRoom";
import Home from "./pages/Home";
import { useState, useEffect } from "react";

const App = () => {
  const [pageType, setPageType] = useState<"home" | "create" | "chat">(() => {
    return (
      (localStorage.getItem("pageType") as "home" | "create" | "chat") || "home"
    );
  });

  useEffect(() => {
    localStorage.setItem("pageType", pageType);
  }, [pageType]);

  return (
    <div className="relative w-full h-screen overflow-hidden font-[Gambarino-Regular]">
      {pageType === "home" && <Home onNext={() => setPageType("create")} />}
      {pageType === "create" && (
        <CreateRoom
          onJoin={() => setPageType("chat")}
          onBack={() => setPageType("home")}
        />
      )}
      {pageType === "chat" && <Chat onBack={() => setPageType("home")}/>}
    </div>
  );
};

export default App;
