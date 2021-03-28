// Generate a variable called "quiz" to contain an array with multiple objects for a question, its options and an answer 
var quiz = [
    {
        question: "Q1. Commonly used data types DO NOT include:",
        options: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "3. Alerts"
    },
    {
        question: "Q2. The condition in an if / else statement is enclosed within ____.",
        options: ["1. Quotes", "2. Curly brackets", "3. Parentheses", "4. Square brackets"],
        answer: "3. Parentheses"
    },
    {
        question: "Q3. Arrays in Javascript can be used to store ____.",
        options: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
        answer: "4. All of the above"
    },
    {
        question: "Q4. String values must be enclosed within ____ when being assigned to variables.",
        options: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
        answer: "3. Quotes"
    },
    {
        question: "Q5. A very useful tool for used during development and debugging for printing content to the debugger is:",
        options: ["1. Javascript", "2. Terminal / bash", "3. For loops", "5. Console log"],
        answer: "5. Console log"
    },
];

// Set the quiz index to zero
var quizIndex = 0;
// Set "secondsLeft" is 15 seconds per question (i.e. 5x15=75):
var secondsLeft = 75;
// Set the penalty time
var penaltyTime = 10;
// Set the minimum score to record high score
var minimumHighScore = 35;

// Assign variables to HMTL ID numbers
var quizTimer = document.querySelector("#quizTimer");
var quizStart = document.querySelector("#startQuiz");
var quizContent = document.querySelector("#quizContent");

// Creates new element
var optionsContent = document.createElement("ul");

// Display the start time when starting the quiz
quizTimer.textContent = "Time: " + secondsLeft;

// Clicking the start button triggers timer to function and updates the secondsLeft
quizStart.addEventListener("click", function () {
    // Check if timer is ACTIVE
    timer = setInterval(function () {
        secondsLeft--;
        quizTimer.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timer);
            allDone();
            quizTimer.textContent = "Time's up!";
        }
    }, 1000);

    // Call the function to display the quiz questions
    quizRender(quizIndex);
});

// Function to "render" the quiz question and options: 
function quizRender(quizIndex) {
    // Clears existing data 
    quizContent.innerHTML = "";
    optionsContent.innerHTML = "";
    // Loop through quiz array
    for (var i = 0; i < quiz.length; i++) {
        // Appends question only
        var userQuestion = quiz[quizIndex].question;
        quizContent.textContent = userQuestion;
    }
    // New for each for question options
    var userOptions = quiz[quizIndex].options;
    userOptions.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizContent.appendChild(optionsContent);
        optionsContent.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare options with answer
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var response = document.createElement("div");
        response.setAttribute("id", "response");
        // Correct condition 
        if (element.textContent == quiz[quizIndex].answer) {
            response.textContent = "Correct!";
            setTimeout(() => {
                response.textContent = "";
            }, 1000);
            // Increment to next question
            quizIndex++;
            // Incorrect condition 
        } else {
            // Will deduct penalty time off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penaltyTime;
            response.textContent = "Wrong! Please try again";
            setTimeout(() => {
                response.textContent = "";
            }, 1000);
            // Do not increment to next question
            quizIndex === quizIndex;
        }
    }

    if (quizIndex >= quiz.length) {
        // All done will append last page with user stats
        allDone();
    } else {
        quizRender(quizIndex);
    }
    quizContent.appendChild(response);
}
// All done will append last page
function allDone() {
    quizContent.innerHTML = "";
    quizTimer.innerHTML = "";

    // Clear Quiz and display All Done!
    var newTitle = document.createElement("h1");
    newTitle.setAttribute("id", "newTitle");
    newTitle.textContent = "All Done!"
    quizContent.appendChild(newTitle);

    // Display results
    var result = document.createElement("p");
    result.setAttribute("id", "result");
    quizContent.appendChild(result);

    var timeRemaining = secondsLeft;

    // Display final score if greater than 0
    if (timeRemaining >= 0) {
        result.setAttribute("id", "result");
        result.textContent = "Your final score is: " + timeRemaining;
        clearInterval(timer);
    } else {
        // If final score is less than zero declare zero result
        result.setAttribute("id", "result");
        result.textContent = "Your final score is: 0";
        clearInterval(timer);
    }

    if (timeRemaining <= minimumHighScore) {
        // Message not valid for high score
        var noScoreMessage = document.createElement("label");
        noScoreMessage.setAttribute("id", "noScoreMessage");
        noScoreMessage.textContent = "You did not achieve a high score. (Minimum is " + minimumHighScore + ")";
        quizContent.appendChild(noScoreMessage);
        // Reset
        var resetButton = document.createElement("button");
        resetButton.setAttribute("type", "submit");
        resetButton.setAttribute("id", "resetButton");
        resetButton.textContent = "TRY AGAIN";
        quizContent.appendChild(resetButton);
        // Event listener to move to index page
        resetButton.addEventListener("click", function () {
            window.location.replace("index.html")
        })

    } else {
        // Instructs to enter initials
        var instructions = document.createElement("label");
        instructions.setAttribute("id", "instructions");
        instructions.textContent = "Enter your initials: ";
        quizContent.appendChild(instructions);
        // input
        var userInitials = document.createElement("input");
        userInitials.setAttribute("type", "text");
        userInitials.setAttribute("id", "userInitials");
        userInitials.textContent = "";
        quizContent.appendChild(userInitials);
        // submit
        var submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("id", "submitButton");
        submitButton.textContent = "Submit";
        quizContent.appendChild(submitButton);
    }

    // Event listener to capture initials and local storage for initials and score
    submitButton.addEventListener("click", function () {
        var initials = userInitials.value;
        if (initials === '' || null) {
            alert("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}
