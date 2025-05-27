

// // Load questions from a JSON file based on topic and difficulty
// function loadQuestions(topicFileName, difficulty) {
//   const container = document.getElementById("question-container");
//   container.innerHTML = "<p>Loading questions...</p>";

//   fetch(`${topicFileName.toLowerCase()}.json`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Failed to load JSON file");
//       }
//       return response.json();
//     })
//     .then(data => {
//       const questions = data[difficulty];

//       // Clear the container before rendering questions
//       container.innerHTML = "";

//       if (!questions || questions.length === 0) {
//         container.innerHTML = `<p>No questions available for ${difficulty} level.</p>`;
//         return;
//       }

//       // Loop and render each question
//       questions.forEach((q, index) => {
//         const questionBox = document.createElement("div");
//         questionBox.className = "question-box";

//         questionBox.innerHTML = `
//           <h3>Q${q.qno}. ${q.question}</h3>
//           <strong>Expected Output:</strong>
//           <pre>${q["expected output"]}</pre>
//           <strong>Explanation:</strong>
//           <p>${q["explanations"]}</p>
//           <div class="answer" id="answer-${index}">
//             <strong>Answer:</strong>
//             <pre>${q["answer"]}</pre>
//           </div>
//           <button class="view-btn" onclick="toggleAnswer(${index})">View Answer</button>
//         `;

//         container.appendChild(questionBox);
//       });
//     })
//     .catch(error => {
//       container.innerHTML = `<p>Error loading questions: ${error.message}</p>`;
//     });
// }

// // Show/hide the answer block when user clicks "View Answer"
// function toggleAnswer(index) {
//   const answers = document.querySelectorAll(".answer");
//   const buttons = document.querySelectorAll(".view-btn");

//   answers.forEach((ans, i) => {
//     if (i === index) {
//       const isVisible = ans.style.display === "block";
//       ans.style.display = isVisible ? "none" : "block";
//       buttons[i].textContent = isVisible ? "View Answer" : "Hide Answer";
//     } else {
//       ans.style.display = "none";
//       buttons[i].textContent = "View Answer";
//     }
//   });
// }


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

  const prompt = `Solve the following programming problem in C language:

${question}

Please provide a complete, well-structured C program with detailed comments explaining each line of code. Also, explain the underlying concepts and algorithms in simple terms, so that even someone new to programming can understand how and why the solution works. Break down the logic step-by-step and use easy-to-understand language.

This solution should strictly adhere to the judging criteria for CodeWar 1.0:

Round I:

Accuracy: Correct solutions are prioritized.

Efficiency: Optimized time complexity scores higher.

Code Quality: Readable, clean, and thoroughly commented code.

Tie-Breaker: Faster correct submissions score higher.

Programming Language & Function Restrictions:

Allowed Functions: Basic input/output functions (e.g., printf(), scanf()), mathematical operators (+, -, *, /), string length and manipulation functions, and any function allowed by the Geeks for Geeks platform.

Restricted Functions: Any function not allowed by the Geeks for Geeks platform. Usage of such restricted functions may lead to penalties or disqualification.

After providing the C solution, please ask if the user would like the solution in any other programming languages.

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
