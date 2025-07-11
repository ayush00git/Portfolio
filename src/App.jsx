import FakeTerminal from "./components/FakeTerminal";
import Lanyard from "./components/Lanyard";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      
      <div className="relative flex h-screen overflow-hidden">
        <div className="absolute w-full">
          <NavBar />
        </div>
        <div className="relative bg-[#111111] w-2/5 border-r-2 border-dashed border-[#47D83D] overflow-hidden">
          <div className="absolute inset-0">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </div>

        <div className="bg-[#191919] w-3/5 text-white font-mono p-6 overflow-y-auto">
          <FakeTerminal />
        </div>
      </div>
    </>
  );
}
export default App;
