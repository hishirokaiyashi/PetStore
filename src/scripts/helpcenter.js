//If the user has not logged in yet, they cannot access to a helpcenter
const loggedInUser = localStorage.getItem('loggedInUser');
const avatar = document.querySelector('.avatar');
console.log(loggedInUser)
// set the avatar image
avatar.src = JSON.parse(loggedInUser).avatar;

//click submit button to post a question to the help center
const questionContainer = document.getElementById("question-container");

//save current user's question to the help center database - use local storage
const btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", function (event) {
    event.preventDefault(); //chặn các hành động mặc định khi submit
    const question = document.getElementById("question").value;
    const user = JSON.parse(loggedInUser);
    let date = new Date();
    date = date.toLocaleString();
    const questionObj = {
        id: Date.now(),
        author_id: user._id,
        question: question,
        date: date,
        likes: 0,
        answers: [],
    }
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.push(questionObj);
    localStorage.setItem('questions', JSON.stringify(questions));
    //display the question on the help center page
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `
    <div class="question-header">
        <img src="${user.avatar}" alt="avatar" class="avatar">
        <div class="question-info">
            <div class="question-user">${user.userName}</div>
            <div class="question-date">${questionObj.date}</div>
        </div>
    </div>
    <div class="question-body">
        <div class="question-text">${question}</div>
    </div>
    <div class="question-footer">
        <div class="question-likes">${questionObj.likes} likes</div>
        <button class="btn-like">Like</button>
        <button class="btn-answer">Answer</button>
    </div>
    `;
    // button like
    const btnLike = questionDiv.querySelector(".btn-like");
    btnLike.addEventListener("click", function (event) {
        event.preventDefault();
        questionObj.likes++;
        localStorage.setItem('questions', JSON.stringify(questions));
        questionDiv.querySelector(".question-likes").innerHTML = questionObj.likes + " likes";
    });
    // button answer
    const btnAnswer = questionDiv.querySelector(".btn-answer");
    btnAnswer.addEventListener("click", function (event) {
        event.preventDefault();
        //create a form to answer the question
        const answerForm = document.createElement("form");
        answerForm.className = "answer-form";
        answerForm.innerHTML = `
        <img src="${user.avatar}" alt="avatar" class="avatar">
        <input name="answer" id="answer" placeholder="Your answer">
        <button class="btn-submit-answer">Submit</button>
        `;
        questionDiv.appendChild(answerForm);
        //save the answer to the database
        const btnSubmitAnswer = answerForm.querySelector(".btn-submit-answer");
        btnSubmitAnswer.addEventListener("click", function (event) {
            event.preventDefault();
            const answer = answerForm.querySelector("#answer").value;
            const answerObj = {
                id: Date.now(),
                author_id: user._id,
                author_avatar: user.avatar,
                author_name: user.userName,
                answer: answer,
                date: date,
                likes: 0,
            }
            questionObj.answers.push(answerObj);
            localStorage.setItem('questions', JSON.stringify(questions));
            //display the answer on the help center page
            const answerDiv = document.createElement("div");
            answerDiv.className = "answer";
            answerDiv.innerHTML = `
            <div class="answer-header">
                <img src="${user.avatar}" alt="avatar" class="avatar">
                <div class="answer-info">
                    <div class="answer-user">${user.userName}</div>
                    <div class="answer-date">${answerObj.date}</div>
                </div>
            </div>
            <div class="answer-body">
                <div class="answer-text">${answer}</div>
            </div>
            <div class="answer-footer">
                <div class="answer-likes">${answerObj.likes} likes</div>
                <button class="btn-like">Like</button>
            </div>
            `;
            // button like
            const btnLike = answerDiv.querySelector(".btn-like");
            btnLike.addEventListener("click", function (event) {
                event.preventDefault();
                answerObj.likes++;
                localStorage.setItem('questions', JSON.stringify(questions));
                answerDiv.querySelector(".answer-likes").innerHTML = answerObj.likes + " likes";
            });
            questionDiv.appendChild(answerDiv);
            answerForm.remove();
        });
    });
    questionContainer.appendChild(questionDiv);
    document.getElementById("question").value = "";
});

//display all questions on the help center page
const questions = JSON.parse(localStorage.getItem('questions')) || [];
//get users from database

questions.forEach(function (questionObj) {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `
    <div class="question-header">
        <img src="${questionObj.author_avatar}" alt="avatar" class="avatar">
        <div class="question-info">
            <div class="question-user">${questionObj.userName}</div>
            <div class="question-date">${questionObj.date}</div>
        </div>
    </div>
    <div class="question-body">
        <div class="question-text">${questionObj.question}</div>
    </div>
    <div class="question-footer">
        <div class="question-likes">${questionObj.likes} likes</div>
        <button class="btn-like">Like</button>
        <button class="btn-answer">Answer</button>
    </div>
    `;
    // button like
    const btnLike = questionDiv.querySelector(".btn-like");
    btnLike.addEventListener("click", function (event) {
        event.preventDefault();
        questionObj.likes++;
        localStorage.setItem('questions', JSON.stringify(questions));
        questionDiv.querySelector(".question-likes").innerHTML = questionObj.likes + " likes";
    });
    // button answer
    const btnAnswer = questionDiv.querySelector(".btn-answer");
    btnAnswer.addEventListener("click", function (event) {
        event.preventDefault();
        //create a form to answer the question
        const answerForm = document.createElement("form");
        answerForm.className = "answer-form";
        answerForm.innerHTML = `
        <img src="${questionObj.author.avatar}" alt="avatar" class="avatar">
        <input name="answer" id="answer" placeholder="Your answer">
        <button class="btn-submit-answer">Submit</button>
        `;
        questionDiv.appendChild(answerForm);
        //save the answer to the database
        const btnSubmitAnswer = answerForm.querySelector(".btn-submit-answer");
        btnSubmitAnswer.addEventListener("click", function (event) {
            event.preventDefault();
            const answer = answerForm.querySelector("#answer").value;
            const answerObj = {
                id: Date.now(),
                author_id: questionObj.author._id,
                answer: answer,
                date: date,
                likes: 0,
            }
            questionObj.answers.push(answerObj);
            localStorage.setItem('questions', JSON.stringify(questions));
            //display the answer on the help center page
            const answerDiv = document.createElement("div");
            answerDiv.className = "answer";
            answerDiv.innerHTML = `
            <div class="answer-header">
                <img src="${questionObj.author.avatar}" alt="avatar" class="avatar">
                <div class="answer-info">
                    <div class="answer-user">${questionObj.author.userName}</div>
                    <div class="answer-date">${answerObj.date}</div>
                </div>
            </div>
            <div class="answer-body">
                <div class="answer-text">${answer}</div>
            </div>
            <div class="answer-footer">
                <div class="answer-likes">${answerObj.likes} likes</div>
                <button class="btn-like">Like</button>
            </div>
            `;
            // button like
            const btnLike = answerDiv.querySelector(".btn-like");
            btnLike.addEventListener("click", function (event) {
                event.preventDefault();
                answerObj.likes++;
                localStorage.setItem('questions', JSON.stringify(questions));
                answerDiv.querySelector(".answer-likes").innerHTML = answerObj.likes + " likes";
            });
            questionDiv.appendChild(answerDiv);
            answerForm.remove();
        });
    });
})




