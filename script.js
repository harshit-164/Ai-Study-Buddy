document.getElementById("nextToTopic").addEventListener("click", function() {
    const subject = document.getElementById("subject").value;
    if (subject === "") {
        alert("Please select a subject!");
    } else {
        document.getElementById("subject-section").style.display = "none";
        document.getElementById("topic-section").style.display = "block";
    }
});

document.getElementById("nextToQuestions").addEventListener("click", function() {
    const topic = document.getElementById("topic").value;
    if (topic === "") {
        alert("Please select a topic!");
    } else {
        document.getElementById("topic-section").style.display = "none";
        document.getElementById("questions-section").style.display = "block";
        loadQuestions(topic);
    }
});

function loadQuestions(topic) {
    const questionsContainer = document.getElementById("questions");
    questionsContainer.innerHTML = ""; // Clear previous questions

    // Example questions for topics (you can customize these)
    const questions = {
        "algebra": [
            "What is the value of x in the equation 2x + 3 = 7?",
            "Simplify the expression 3(x + 4) - 2."
        ],
        "biology": [
            "What is the process of photosynthesis?",
            "Name the parts of a human cell."
        ],
        // Add more topic-based questions here
    };

    // Generate questions based on the topic
    if (questions[topic]) {
        questions[topic].forEach((question, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `
                <p>Q${index + 1}: ${question}</p>
                <textarea id="question_${index}" placeholder="Your answer..."></textarea>
            `;
            questionsContainer.appendChild(questionDiv);
        });
    }
}

document.getElementById("submitAnswers").addEventListener("click", async function(event) {
    event.preventDefault();

    const answers = [];
    document.querySelectorAll('textarea[id^="question_"]').forEach(textarea => {
        answers.push(textarea.value.trim()); // Capture answers, remove extra spaces
    });

    // Check if at least one answer is filled
    if (answers.length === 0 || answers.every(answer => answer === "")) {
        alert("Please provide answers to the questions.");
        return;
    }

    // Log answers for debugging
    console.log("Collected Answers: ", answers);

    // Send answers to backend API and get feedback
    try {
        const response = await fetch('https://your-vercel-project-url/api/evaluate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers: answers })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        // Show feedback
        document.getElementById("feedback").innerHTML = `<strong>Feedback:</strong> ${data.feedback}`;
        
        // Show flowchart
        document.getElementById("flowchart-section").style.display = "block";
        createFlowchart(data.stats);

    } catch (error) {
        console.error("Error submitting answers:", error);
        document.getElementById("feedback").innerHTML = "Error submitting answers. Please try again.";
    }
});

function createFlowchart(stats) {
    const ctx = document.getElementById('performanceChart').getContext('2d');

    // Create a pie chart showing user's performance
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Incorrect', 'Partially Correct'],
            datasets: [{
                label: 'Your Performance',
                data: [stats.correct, stats.incorrect, stats.partial], // Update this according to API response
                backgroundColor: ['#28a745', '#dc3545', '#ffc107'], // Colors for each category
                borderColor: ['#28a745', '#dc3545', '#ffc107'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        }
    });
}
