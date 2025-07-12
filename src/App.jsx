import { useState } from "react";
import FakeTerminal from "./components/FakeTerminal";
import Lanyard from "./components/Lanyard";
import NavBar from "./components/NavBar";

function App() {
  const [theme, setTheme] = useState("default");
  const handleChangeVibe = () => {
    setTheme((prev) => (prev === "default" ? "cyberpunk" : "default"));
  };

  return (
    <>
      <div className={`relative flex h-screen overflow-hidden ${theme === "cyberpunk" ? "bg-gradient-to-b from-[#0D0A1A] to-[#1A0F2A]" : "bg-[#0d0d0d]"}`}>
        <div className="absolute w-full">
          <NavBar onChangeVibe={handleChangeVibe} theme={theme} />
        </div>
        <div className={`relative w-2/5 border-r-1 ${theme === "cyberpunk" ? "border-[#FF00F7] bg-[#0D0A1A]" : "border-[rgba(71,216,61,0.5)] bg-[#0d0d0d]"} overflow-hidden`}>
          <div className="absolute inset-0">
            <Lanyard position={[0, 0, 20]} gravity={[0, -50, 0]} />
          </div>
        </div>
        <div className={`w-3/5 font-mono p-6 overflow-y-auto ${theme === "cyberpunk" ? "bg-gradient-to-b from-[#0D0A1A] to-[#1A0F2A] text-[#00FFF7]" : "bg-[#101010] text-white"}`}>
          <FakeTerminal theme={theme} />
        </div>
      </div>
    </>
  );
}
export default App;
