class QuizData {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  nextQuestion() {
    this.currentIndex++;
  }

  checkAnswer(answer) {
    const currentQuestion = this.getCurrentQuestion();
    return currentQuestion.correctAnswer === answer;
  }
}

// Quiz View
class QuizView {
  constructor() {
    this.questionElement = document.getElementById("question");
    this.answerElement = document.getElementById("answer");
    this.submitButton = document.getElementById("submit");
    this.nextButton = document.getElementById("next");
    this.resultElement = document.getElementById("result");
  }

  showQuestion(question) {
    this.questionElement.textContent = question.text;
    this.answerElement.innerHTML = "";
    question.options.forEach((option) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = option;
      this.answerElement.appendChild(input);
      const label = document.createElement("label");
      label.textContent = option;
      this.answerElement.appendChild(label);
    });
    this.submitButton.disabled = false;
    this.nextButton.disabled = true;
    this.resultElement.textContent = "";
  }

  getSelectedAnswer() {
    const selectedInput = this.answerElement.querySelector("input:checked");
    return selectedInput ? selectedInput.value : null;
  }

  showResult(isCorrect) {
    const message = isCorrect ? "Richtig!" : "Falsch!";
    this.resultElement.textContent = message;
    this.submitButton.disabled = true;
    this.nextButton.disabled = false;
  }
}

// Quiz Controller
class QuizController {
  constructor(data, view) {
    this.data = data;
    this.view = view;

    this.view.submitButton.addEventListener(
      "click",
      this.submitAnswer.bind(this)
    );
    this.view.nextButton.addEventListener(
      "click",
      this.nextQuestion.bind(this)
    );

    this.showCurrentQuestion();
  }

  showCurrentQuestion() {
    const currentQuestion = this.data.getCurrentQuestion();
    this.view.showQuestion(currentQuestion);
  }

  submitAnswer() {
    const selectedAnswer = this.view.getSelectedAnswer();
    if (!selectedAnswer) {
      return;
    }

    const isCorrect = this.data.checkAnswer(selectedAnswer);
    this.view.showResult(isCorrect);
  }

  nextQuestion() {
    this.data.nextQuestion();
    if (this.data.currentIndex === this.data.questions.length) {
      // Quiz ist fertig
      return;
    }
    this.showCurrentQuestion();
  }

  init() {}
}

// Initialisiere das Quiz
const questions = [
  {
    text: "Was ist die Hauptstadt von Deutschland?",
    options: ["Berlin", "München", "Frankfurt"],
    correctAnswer: "Berlin",
  },
  {
    text: "Wie viele Planeten gibt es in unserem Sonnensystem?",
    options: ["8", "9", "10"],
    correctAnswer: "8",
  },
  {
    text: "Wer hat die Relativitätstheorie erfunden?",
    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking"],
    correctAnswer: "Albert Einstein",
  },
];

const data = new QuizData(questions);
const view = new QuizView();
const controller = new QuizController(data, view);

export { controller as QuizController };
