var count = 1;
var radioCount = 1;
var questionCount = 1;

// An array of questions
var questions = [
  "Happiness is the most important thing to me",
  "I will pay on our first date",
  "I'm the ultimate foodie",
  "I believe in second chances",
  "I'm a perfectionist",
  "I'm always down to Netflix and chill",
  "I always help those in need",
  "I'm a workout junkie",
  "I love to do outdoor activities",
  "I focus on long term goals"
];

function createQuestions() {
  for (let i = 0; i < questions.length; i++) {
    var questionRow = $("<div>");
    questionRow.addClass("row justify-content-center text-center");
    var questionDiv = $("<div>");
    questionDiv.addClass("col-md-6 text-center");
    var question = $("<h4>");
    question.text(questions[i]);
    questionDiv.append(question);
    questionRow.append(questionDiv);

    for (let i = 0; i < 5; i++) {
      var radioDiv = $("<div>");
      radioDiv.addClass("form-check form-check-inline");
      var radioButtonInput = $("<input>");
      radioButtonInput.addClass("form-check-input");
      radioButtonInput.attr("type", "radio");
      radioButtonInput.attr("name", "inlineRadioOptions" + questionCount);
      radioButtonInput.attr(
        "id",
        "question" + questionCount + "radio" + radioCount
      );
      radioButtonInput.attr("value", radioCount);
      radioButtonInput.attr("required", true);

      var radioButtonLabel = $("<label>");
      radioButtonLabel.addClass("form-check-label");
      radioButtonLabel.attr(
        "for",
        "question" + questionCount + "radio" + radioCount
      );

      radioButtonLabel.text(radioCount);
      radioDiv.append(radioButtonInput, radioButtonLabel);
      questionRow.append(radioDiv);
      counterCheck();
    }
    $("#survey").prepend(questionRow);
  }
}

function counterCheck() {
  if (radioCount >= 5) {
    radioCount = 1;
    questionCount++;
    count++;
  } else {
    radioCount++;
    count++;
  }
}

$("#submit").on("click", function() {
  event.preventDefault();
  var userInput = {
    name: $("#name")
      .val()
      .trim(),
    picture: $("#photo")
      .val()
      .trim(),
    data: []
  };

  var validation = [];
  for (let i = 1; i < questions.length + 1; i++) {
    var data = $("input[name=inlineRadioOptions" + [i] + "]:checked").val();
    validation.push(data);
  }

  function pushData() {
    for (let j = 1; j < questions.length + 1; j++) {
      var data = $("input[name=inlineRadioOptions" + [j] + "]:checked").val();
      userInput.data.push(data);
    }
  }

  console.log({ validation });
  if (validation.indexOf(undefined) >= 0) {
    alert("Fill in all the questions before submitting");
  } else {
    pushData();
    $.post("/api/friends", userInput).then(function(data) {
      var bestFriend = $("<div>");
      var name = $("<h2>");
      name.text(data.name);
      var photo = $("<img>");
      photo.attr("src", data.photo);
      photo.attr("width", "400px");

      bestFriend.append(name, photo);
      $("#best-friend").append(bestFriend);
    });
  }
});
createQuestions();
