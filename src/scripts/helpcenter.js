const loggedInUserObj = localStorage.getItem('loggedInUser');
const user = JSON.parse(loggedInUserObj);
if(user.avatar === "") {
    user.avatar = "https://www.w3schools.com/howto/img_avatar.png";
}

//click submit button to post a question to the help center
const questionContainer = document.getElementById("question-container");

//save current user's question to the help center database - use local storage
const btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", function (event) {
    event.preventDefault(); //chặn các hành động mặc định khi submit
    const question = document.getElementById("question").value;
    const questionObj = {
        id: Date.now(),
        author_id: user._id,
        author_avatar: user.avatar,
        author_name: user.username,
        question: question,
        date: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(),
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
            <div class="question-user">${user.username}</div>
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
    <div class="divide"></div>
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
                author_name: user.username,
                answer: answer,
                date: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(),
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
                    <div class="answer-user">${user.username}</div>
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
            <div class="divide"></div>
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

// lấy dữ liệu từ localStorage
const questions = JSON.parse(localStorage.getItem('questions'));

// tạo các thành phần HTML để hiển thị dữ liệu
const container = document.createElement('div');
container.className = 'container';
questions.forEach(question => {
  const questionDiv = document.createElement('div');
    questionDiv.className = 'questionDiv';
  questionDiv.innerHTML = `
    <div class="question-header">
        <img src="${question.author_avatar}" alt="avatar" class="avatar">
        <div class="question-info">
            <div class="question-user">${question.author_name}</div>
            <div class="question-date">${question.date}</div>
        </div>
    </div>
    <div class="question-body">
        <div class="question-text">${question.question}</div>
    </div>
    <div class="question-footer">
        <div class="question-likes">${question.likes} likes</div>
        <button class="btn-like">Like</button>
        <button class="btn-answer">Answer</button>
    </div>
    <div class="divide"></div>
  `;
  //button like
    const btnLike = questionDiv.querySelector(".btn-like");
    btnLike.addEventListener("click", function (event) {
        event.preventDefault();
        question.likes++;
        localStorage.setItem('questions', JSON.stringify(questions));
        questionDiv.querySelector(".question-likes").innerHTML = question.likes + " likes";
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
            console.log("click");
            event.preventDefault();
            const answer = answerForm.querySelector("#answer").value;
            const answerObj = {
                id: Date.now(),
                author_id: user._id,
                author_avatar: user.avatar,
                author_name: user.username,
                answer: answer,
                date: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(),
                likes: 0,
            }
            question.answers.push(answerObj);
            localStorage.setItem('questions', JSON.stringify(questions));
            //display the answer on the help center page
            const answerDiv = document.createElement("div");
            answerDiv.className = "answer";
            answerDiv.innerHTML = `
            <div class="answer-header">
                <img src="${user.avatar}" alt="avatar" class="avatar">
                <div class="answer-info">
                    <div class="answer-user">${user.username}</div>
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
            <div class="divide"></div>
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

    const answersDiv = document.createElement('div');
    answersDiv.className = 'answersDiv';
    question.answers.forEach(answer => {
    const answerDiv = document.createElement('div');
    answerDiv.innerHTML = `
        <div class="answer-header">
                <img src="${answer.author_avatar}" alt="avatar" class="avatar">
                <div class="answer-info">
                    <div class="answer-user">${answer.author_name}</div>
                    <div class="answer-date">${answer.date}</div>
                </div>
            </div>
            <div class="answer-body">
                <div class="answer-text">${answer.answer}</div>
            </div>
            <div class="answer-footer">
                <div class="answer-likes">${answer.likes} likes</div>
                <button class="btn-like">Like</button>
            </div>
            <div class="divide"></div>
    `;
    // button like
    const btnLike = answerDiv.querySelector(".btn-like");
    btnLike.addEventListener("click", function (event) {
        event.preventDefault();
        answer.likes++;
        localStorage.setItem('questions', JSON.stringify(questions));
        answerDiv.querySelector(".answer-likes").innerHTML = answer.likes + " likes";
    });

    answersDiv.appendChild(answerDiv);
  });
  questionDiv.appendChild(answersDiv);
  container.appendChild(questionDiv);
});

// hiển thị các thành phần HTML
document.body.appendChild(container);

