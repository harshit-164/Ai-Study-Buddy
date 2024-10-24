document.getElementById("nextToTopic").addEventListener("click", function() {
    const subject = document.getElementById("subject").value;
    if (subject === "") {
        alert("Please select a subject!");
    } else {
        document.getElementById("subject-section").style.display = "none";
        document.getElementById("topic-section").style.display = "block";
    }
});

document.getElementById("nextToQuestion").addEventListener("click", function() {
    const topic = document.getElementById("topic").value;
    if (topic === "") {
        alert("Please select a topic!");
    } else {
        document.getElementById("topic-section").style.display = "none";
        document.getElementById("question-section").style.display = "block";
    }
});

document.getElementById("submitAnswer").addEventListener("click", async function(event) {
    event.preventDefault();
    const answer = document.getElementById("answer").value;
    if (answer === "") {
        alert("Please type an answer!");
        return;
    }

    try {
        // Fetch the response from your Vercel API
        const response = await fetch('https://your-vercel-project-url/api/evaluate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer: answer })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        // Display feedback and tips
        document.getElementById("feedback").innerHTML = "<strong>Feedback:</strong> " + data.feedback;
        document.getElementById("tips").innerHTML = "<strong>Study Tips:</strong> " + data.tips;
        document.getElementById("progress").innerHTML = "<strong>Your Progress:</strong> " + data.progress;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById("feedback").innerHTML = "Error: " + error.message;
    }
});
