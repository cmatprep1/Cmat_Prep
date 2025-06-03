

// Load questions from a JSON file based on topic and difficulty
function loadQuestions(topicFileName, difficulty) {
  const container = document.getElementById("question-container");
  container.innerHTML = "<p>Loading questions...</p>";

  fetch(`${topicFileName.toLowerCase()}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load JSON file");
      }
      return response.json();
    })
    .then(data => {
      const questions = data[difficulty];

      // Clear the container before rendering questions
      container.innerHTML = "";

      if (!questions || questions.length === 0) {
        container.innerHTML = `<p>No questions available for ${difficulty} level.</p>`;
        return;
      }

      // Loop and render each question
      questions.forEach((q, index) => {
        const questionBox = document.createElement("div");
        questionBox.className = "question-box";

        questionBox.innerHTML = `
          <h3>Q${q.qno}. ${q.question}</h3>
          <strong>Expected Output:</strong>
          <pre>${q["expected output"]}</pre>
          <strong>Explanation:</strong>
          <p>${q["explanations"]}</p>
          <div class="answer" id="answer-${index}" style="display:none;">
            <strong>Answer:</strong>
            <pre>${q["answer"]}</pre>
          </div>
          <button class="ask-ai-btn" onclick="askAI('${encodeURIComponent(q.question)}')">Ask AI</button>
        `;

        container.appendChild(questionBox);
      });
    })
    .catch(error => {
      container.innerHTML = `<p>Error loading questions: ${error.message}</p>`;
    });
}

// Handle Ask AI button click
function askAI(questionEncoded) {
  const question = decodeURIComponent(questionEncoded);

  const prompt = 
  
  // `Solve the following programming problem in C language:${question}

// Please provide a complete, well-structured C program with detailed comments explaining each line of code. Also, explain the underlying concepts and algorithms in simple terms, so that even someone new to programming can understand how and why the solution works. Break down the logic step-by-step and use easy-to-understand language.

// This solution should strictly adhere to the judging criteria for CodeWar 1.0:

// Round I:

// Accuracy: Correct solutions are prioritized.

// Efficiency: Optimized time complexity scores higher.

// Code Quality: Readable, clean, and thoroughly commented code.

// Tie-Breaker: Faster correct submissions score higher.

// Programming Language & Function Restrictions:

// Allowed Functions: Basic input/output functions (e.g., printf(), scanf()), mathematical operators (+, -, *, /), string length and manipulation functions, and any function allowed by the Geeks for Geeks platform.

// Restricted Functions: Any function not allowed by the Geeks for Geeks platform. Usage of such restricted functions may lead to penalties or disqualification.

// After providing the C solution, please ask if the user would like the solution in any other programming languages.
Solve the following programming problem but IMPORTANT: Before answering, please ask the user:

“Which programming language would you like the solution in? (e.g., C, C++, Java, Python)”

${question}

You are assisting a student preparing for coding competitions like CodeWar 1.0 and practicing on GeeksforGeeks (GFG).

For the given question, please follow the typical GFG-style approach:

---

### About GFG Solution Format and main() in Python:

- GFG evaluates solutions by calling a **specific function inside a class** (usually named in the problem).
- You **do not need to write or use a main() function in Python** because GFG’s online judge runs the test harness itself and directly invokes your class method.
- Your solution should only implement the required function inside the prescribed class, matching the signature exactly.
- Avoid extra input/output handling; focus on the function logic.
- This keeps your code clean and compatible with GFG’s automated testing system.

---

### Part 1: ✅ Provide a Qualifiable Solution

Your solution should fully satisfy what GFG or CodeWar judges expect:

- ✔️ **Correctness:** The logic must produce the exact expected output, including edge cases.
- ✔️ **Efficiency:** Use the optimal algorithm with the best time and space complexity.
- ✔️ **Coding Standards:**
  - Use only allowed functions and libraries (e.g., no STL in C unless allowed).
  - Follow the exact function signature given.
  - **Do not use main() unless explicitly required**.
- ✔️ **Clean & Commented Code:** Proper formatting, meaningful variable names, and minimal comments explaining key logic.
- ✔️ **Conceptual Explanation:** Before code, provide a beginner-friendly explanation of the algorithm, step-by-step.

---

### Part 2: ❌ Provide a Non-Qualifiable (Rejected) Solution

This version should demonstrate common mistakes that cause low or zero scores, such as:

- Using brute-force or inefficient approaches when better algorithms exist.
- Poor formatting and unreadable code.
- Ignoring problem constraints or given function signatures.
- Using disallowed functions or libraries.
- Missing handling of edge cases.
- Including unnecessary code like input/output statements or main() in Python when not required.

After this incorrect version, explain clearly:

**This solution is not acceptable because...**

---

### Final Prompt to User:

Ask the user:

“Would you like this problem solved in another programming language (e.g., C, Python, Java)?”

⚠️ Only offer to switch languages after showing both the qualifiable and non-qualifiable solutions in the original language.

`;

  // Copy prompt to clipboard
  navigator.clipboard.writeText(prompt).then(() => {
    alert("Prompt copied! Paste it in ChatGPT.");
    // Open ChatGPT in new tab after alert
    window.open("https://chat.openai.com/chat", "_blank");
  }).catch(() => {
    alert("Failed to copy prompt. Please copy manually:\n\n" + prompt);
    window.open("https://chat.openai.com/chat", "_blank");
  });
}
