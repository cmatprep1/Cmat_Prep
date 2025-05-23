function loadQuestions(topicFile, difficulty, displayName) {
  const section = document.getElementById("questions-section");
  section.innerHTML = `<h3>${displayName} - ${difficulty} Questions</h3>`;

  fetch(`${topicFile}.json`)
    .then(res => res.json())
    .then(data => {
      const questions = data.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());

      if (questions.length === 0) {
        section.innerHTML += "<p>No questions found for this difficulty.</p>";
        return;
      }

      const ul = document.createElement("ul");

      questions.forEach(({ qno, question }) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="question-row">
            <div><strong>${qno}:</strong> ${question}</div>
            <button class="solution-btn" onclick="toggleSolution('${qno}')">View Solution</button>
          </div>
          <p id="solution-${qno}" class="solution-text">Coming soon...</p>
        `;
        ul.appendChild(li);
      });

      section.appendChild(ul);
    })
    .catch(error => {
      console.error("Error loading questions:", error);
      section.innerHTML += "<p>Error loading questions. Check file name.</p>";
    });
}

function toggleSolution(qno) {
  const el = document.getElementById(`solution-${qno}`);
  if (el) el.style.display = el.style.display === "none" ? "block" : "none";
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar-container");
  sidebar.classList.toggle("show");
}
