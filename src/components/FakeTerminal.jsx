import { useState, useEffect, useRef } from "react";

const COMMANDS = {
  // welcome script
  welcome: `Welcome to my Terminal Portfolio 👋
----------------------------------------------
Type "help" to get started.

Available commands:
  cat about         - more about me
  cat skills        - View my tech stack
  cat projects      - Explore my projects
  cat achievements  - View my achievements
  cd contact        - Connect with me
  cd linkedin       - Visit my linkedin profile
  cd github         - Visit my github profile
  cd instagram      - Visit my instagram profile
  ls                - available docs
  clear             - Clear the screen
  help              - Show available commands

`,
  // about script
  "cat about": 
`Hey, I’m Ayush — a backend developer who also dabbles in UI/UX design with Figma. 
I work mostly with tools like Node.js, Express, and MongoDB, and I’m pretty comfortable using 
Docker to containerize my work. I’ve been spending more time learning DevOps practices and exploring the 
open-source world — something I’m genuinely excited about.

(I'm also an contributor to expressjs.com)

Lately, I’ve also been exploring cybersecurity and generative AI — both are incredibly exciting fields that 
open up a lot of possibilities. I like building things with a chill mindset — learning consistently, experimenting 
with ideas, and always trying to make something better than before.

`,
  // projects script
  "cat projects": `1. YapSpace  
A real-time blog webapp — built with Node.js, Express, MongoDB and ejs.  
📈 Hit 3000+ unique users in the first week of launch.  
🔗 Live: https://yap.deznov.space/
or simply type-in cd yapspace to see my project


2. DezNov *(in development)*  
A project-sharing platform focused on clean UI, feedback loops, and creator-first experience.  
Built with: Figma + Tailwind CSS + Node.js backend + React.js(vibe coding).  
🔗 Live: Coming soon...

3. Terminal Portfolio  
A CLI-inspired personal site built with React, Tailwind, and custom command logic.  
Accepts real commands like 'cat about', 'cd linkedin', and more.  
Its designed on Figma, coded with tailwind and the React code is vibe coded ;) 
🔗 You’re using it right now :)

More dropping soon...`,
  // skills script
  "cat skills": `Languages:
- C, C++, Python, JavaScript

Frontend:
- HTML, CSS, Tailwind CSS

Backend:
- Node.js, Express.js
- MongoDB for data handling
- Proficient in REST API design

Tools & DevOps:
- Docker (containers & deployment)
- Git & GitHub (one of the contributors to ExpressJS.com)
- Postman for API testing
- Linux/CLI — comfortable & efficient
- Figma for UI/UX designing

🎯 Strongest In:
- Backend Architecture
- Docker & Deployment Workflows
- UI/UX designing using figma
`,
  // contact script
  "cat contact": `Reach out to me on-
  LinkedIn: cd linkedin 
  GitHub: cd github
  Instagram: cd instagram 
  or by email: ayush.2007.iit@gmail.com 
  [leave that "iit" thing, this id was created during my JEE prep :( ]
  `,
  "cat achievements":`
Winner of Best Beginner Hack – Electrothon 7.0 (National Level Hackathon)
Built MotionEye, a hardware-based safety solution designed to assist individuals with Alzheimer's. 
It detects falls using motion sensors and immediately alerts caregivers — ensuring timely support 
and reducing risks for patients.

More coming soon :) ........
  `,
  "ls": `'about' 'skills' 'projects' 'contact'`,
  help: `Available commands: welcome, cat about, cat projects, cat skills, cat contact, help, clear`,
};

export default function FakeTerminal({ theme }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentOutput, setCurrentOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't hijack keys if you're inside an input already
      if (document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, currentOutput]);

  const handleCommand = (cmd, onDone = () => {}) => {
    if (cmd === "clear") {
      setHistory([]);
      onDone();
      return;
    }
    if (!cmd.trim()) {
      // Add a new prompt header even if input is empty
      const id = Date.now();
      setHistory((prev) => [...prev, { id, cmd: "", output: "" }]);
      onDone();
      return;
    }
    // Save only non-empty commands to commandHistory
    setCommandHistory((prev) => [...prev, cmd]);
    const command = cmd.toLowerCase().trim();
    if (command === "cd linkedin") {
      window.open("https://www.linkedin.com/in/ayush-kumar-368446246/","_blank");
      onDone();
      return;
    }
    if (command === "cd github") {
      window.open("https://github.com/ayush00git", "_blank");
      onDone();
      return;
    }
    if (command === "cd instagram") {
      window.open("https://www.instagram.com/ayyush_z/", "_blank");
      onDone();
      return;
    }
    if (command === "cd yapspace") {
      window.open("https://yap.deznov.space/", "_blank");
      onDone();
      return;
    }

    const output =
      COMMANDS[cmd.toLowerCase()] ||
      `Command not found: ${cmd}\nType 'help' to see available commands.`;

    // Push command first with empty output
    const id = Date.now();
    setHistory((prev) => [...prev, { id, cmd, output: "" }]);

    // Start streaming output
    let i = 0;
    let currentStreamedOutput = "";
    setIsStreaming(true);

    const interval = setInterval(() => {
      if (i < output.length) {
        currentStreamedOutput += output[i];
        setHistory((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, output: currentStreamedOutput } : item
          )
        );
        i++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        onDone();
      }
    }, 15);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isStreaming) {
      handleCommand(input);
      setHistoryIndex(-1); // Reset history index
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor movement
      if (commandHistory.length === 0) return;
      
      const newIndex = historyIndex === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyIndex - 1);
      
      setInput(commandHistory[newIndex]);
      setHistoryIndex(newIndex);
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent cursor movement
      if (commandHistory.length === 0 || historyIndex === -1) return;
      
      const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
      
      if (newIndex < commandHistory.length) {
        setInput(commandHistory[newIndex]);
        setHistoryIndex(newIndex);
      } else {
        setInput("");
        setHistoryIndex(-1);
      }
    }
  };

  useEffect(() => {
    // Auto type 'welcome' after short delay
    const delay = setTimeout(() => {
      setInput("");
      handleCommand("welcome", () => {
        setInput("");
      });
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div
      className={`w-full h-full p-4 font-mono text-sm pt-16 ${theme === "cyberpunk" ? "bg-gradient-to-b from-[#0D0A1A] to-[#1A0F2A]" : "bg-[#101010]"}`}
      style={{
        background: theme === "cyberpunk" ? "linear-gradient(to bottom, #0D0A1A, #1A0F2A)" : "#101010",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }}
      ref={containerRef}
    >
      <style>
        {`
          div::-webkit-scrollbar { display: none; }
        `}
      </style>
      {history.map((item, idx) => (
        <div key={item.id} className="mb-2">
          <div>
            <span className={theme === "cyberpunk" ? "text-[#FFEA00]" : "text-green-400"}>ayush_kumar@portfolio:</span>
            <span className={theme === "cyberpunk" ? "text-[#FF0090]" : "text-white"}>~$</span> {item.cmd}
          </div>
          <pre className={theme === "cyberpunk" ? "text-[#B2F5EA] whitespace-pre-wrap" : "text-gray-300 whitespace-pre-wrap"}>{item.output}</pre>
        </div>
      ))}

      {isStreaming && (
        <div className={theme === "cyberpunk" ? "text-[#B2F5EA] whitespace-pre-wrap mb-2" : "text-gray-300 whitespace-pre-wrap mb-2"}>
          {currentOutput}
        </div>
      )}

      {/* Only show input when not streaming */}
      {!isStreaming && (
        <div className="flex">
          <span className={theme === "cyberpunk" ? "text-[#FFEA00]" : "text-green-400"}>ayush_kumar@portfolio:</span>
          <span className={theme === "cyberpunk" ? "text-[#FF0090]" : "text-white"}>~$</span>
          <input
            ref={inputRef}
            className={`bg-transparent outline-none ml-1 w-full ${theme === "cyberpunk" ? "text-[#00FF9F]" : "text-white"}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{ caretColor: theme === "cyberpunk" ? "#FF00F7" : "#22c55e" }}
          />
        </div>
      )}
    </div>
  );
}
