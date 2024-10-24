document.getElementById("studyForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const answer = document.getElementById("answer").value;

    // Send the answer to the server
    const response = await fetch('https://ai-study-buddy-ten.vercel.app/api/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: answer })
    });
    const data = await response.json();

    // Display feedback and tips
    document.getElementById("feedback").innerHTML = "<strong>Feedback:</strong> " + data.feedback;
    document.getElementById("tips").innerHTML = "<strong>Study Tips:</strong> " + data.tips;
    document.getElementById("progress").innerHTML = "<strong>Your Progress:</strong> " + data.progress;
});
