const input = document.getElementById('input');
const output = document.getElementById('output');

let history = [];
let historyIndex = -1;
let currentTheme = "dark";

const welcomeMessage = `Hey There! 👋 I am Ishit Jain, a final year CS student with a passion for problem solving and competitive programming. I’m passionate about sharpening my problem-solving abilities and applying them to real-world coding challenges. 🚀

🏆 Achievements:
💡 LeetCode Guardian (Top 1%) | LeetCode rating: 2169
🌟 CodeChef: 4⭐ (1828 rating)
🧠 Codeforces: Specialist (1571 rating)
🎯 2000+ DSA problems solved & counting!

💻 Ready to dive into some code? Type "help" to see available commands.`;

const suggestionLine = `<span class="desc">💡 Try commands like: <span class="cmd" onclick="runCommand('help')">help</span>, <span class="cmd" onclick="runCommand('about')">about</span>, <span class="cmd" onclick="runCommand('skills')">skills</span>, <span class="cmd" onclick="runCommand('projects')">projects</span></span>`;

function printOutput(text, cssClass = "") {
  const div = document.createElement("div");
  if (cssClass) div.className = cssClass;
  div.innerHTML = text;
  div.classList.add("fade-in");
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function runCommand(commandLine) {
  printOutput(`$ ${escapeHtml(commandLine)}`, "command-line");
  history.push(commandLine);
  historyIndex = -1;

  const parts = commandLine.split(" ").filter(Boolean);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (commands[cmd]) {
    try {
      commands[cmd](args);
    } catch (e) {
      printOutput(`<span class="error">Error running command: ${escapeHtml(e.message || e)}</span>`);
    }
  } else {
    printOutput(`<span class="error">Command not found: ${escapeHtml(cmd)}</span><br>Type 'help' to see available commands.`);
  }
}

const commands = {
  help: () => {
    printOutput(`<span class="desc">Available commands:</span>`);
    printOutput(`<span class="cmd">help</span>         - show this help`);
    printOutput(`<span class="cmd">about</span>        - short about me`);
    printOutput(`<span class="cmd">skills</span>       - my skills`);
    printOutput(`<span class="cmd">projects</span>     - projects list`);
    printOutput(`<span class="cmd">education</span>    - education details`);
    printOutput(`<span class="cmd">resume</span>       - open resume`);
    printOutput(`<span class="cmd">contact</span>      - clickable contact links`);
    printOutput(`<span class="cmd">whoami</span>       - your username`);
    printOutput(`<span class="cmd">pwd</span>          - working directory`);
    printOutput(`<span class="cmd">date</span>         - current date/time`);
    printOutput(`<span class="cmd">history</span>      - command history`);
    printOutput(`<span class="cmd">echo</span> <msg>        - print a message`);
    printOutput(`<span class="cmd">clear</span>        - reset terminal to welcome view`);
    printOutput(`<span class="cmd">exit</span>         - exit message`);
    printOutput(`<span class="cmd">themes</span>       - toggle light/dark theme`);
    printOutput(`<span class="cmd">greet</span>        - friendly greet`);
    printOutput(`<span class="cmd">get_status</span>   - current status`);
    printOutput(`<span class="cmd">get_learning</span> - what I'm learning`);
  },

  about: () => printOutput(`I am a logical thinker and problem solver, i like challenges and solving puzzles, i like to play chess.`),

  skills: () => printOutput(`Languages: Java, C++, Python, JavaScript
Tools: Git, IntelliJ, VS Code, PyCharm
Tech: HTML, CSS, React`),

  projects: () => printOutput(`Upcoming`),

  education: () => printOutput(`🎓 Education:
- Indian Institute of Information Technology, Pune (2022 - 2026)
  B.Tech in Computer Science | Current CGPA: 7.00

- MDS Public School (CBSE) | Class 12th | 94.5%`),

  resume: () => {
    printOutput("📄 Opening resume...");
    window.open("https://drive.google.com/file/d/1siHGiS0F-H5-Wh1fFBHjjx-1wYZWwgBH/view", "_blank");
  },

  contact: () => printOutput(`📧 Email: <a href="mailto:ishitjainofficial@gmail.com" target="_blank">ishitjainofficial@gmail.com</a><br>
🔗 GitHub: <a href="https://github.com/ishitjain11" target="_blank">github.com/ishit-jain11</a><br>
💼 LinkedIn: <a href="https://linkedin.com/in/ishit-jain-3a5aa9253/" target="_blank">linkedin.com/in/ishit-jain-3a5aa9253/</a>`),

  whoami: () => printOutput("ishit_jain"),

  pwd: () => printOutput("/home/ishitjain/portfolio"),

  date: () => printOutput(new Date().toString()),

  history: () => {
    if (history.length === 0) {
      printOutput("No commands in history yet.");
      return;
    }
    history.forEach((cmd, i) => printOutput(`${i + 1}: ${cmd}`));
  },

  echo: (args) => printOutput(args.join(" ")),

  clear: () => {
    output.innerHTML = "";
    printOutput(welcomeMessage);
    printOutput(suggestionLine);
  },

  exit: () => printOutput("👋 Exiting terminal..."),

  themes: () => {
    if (currentTheme === "dark") {
      document.body.style.background = "#fff";
      document.body.style.color = "#000";
      currentTheme = "light";
      printOutput("🌞 Switched to light theme");
    } else {
      document.body.style.background = "#000";
      document.body.style.color = "#0f0";
      currentTheme = "dark";
      printOutput("🌙 Switched to dark theme");
    }
  },

  greet: () => printOutput("👋 Hello! Nice to meet you."),

  get_status: () => printOutput("⚡ Currently preparing for placements & building cool projects."),

  get_learning: () => printOutput("📚 Currently learning React for frontend and diving into backend development (APIs, databases, Node.js).")
};

input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const commandLine = input.value.trim();
    if (!commandLine) return;
    runCommand(commandLine);
    input.value = '';
  } else if (event.key === 'ArrowUp') {
    if (history.length === 0) return;
    if (historyIndex === -1) historyIndex = history.length;
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    } else {
      input.value = history[0];
    }
  } else if (event.key === 'ArrowDown') {
    if (history.length === 0) return;
    if (historyIndex === -1) {
      input.value = '';
      return;
    }
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = -1;
      input.value = '';
    }
  }
});

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

printOutput(welcomeMessage);
printOutput(suggestionLine);
