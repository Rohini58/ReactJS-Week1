function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};





var allQuestions = null;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        allQuestions = JSON.parse(this.responseText);
        console.log(allQuestions);

        var currentPage = -1;
        var totalScore = 0;
        var review = false;

        $(document).ready(function () {
            $("#quiz").hide();
            $("#alert").hide();
            $("#nextButton").html("Start Quiz");


            $("#nextButton").click(function () {
                $("#nextButton").html("Next");

                var answerArray = $("#myForm").serializeArray();

                // check if question has been answered
                if (answerArray.length == 0 && currentPage >= 0 && review == true) {
                    $("#alert").html("Please select an answer.");
                    $("#alert").fadeIn('fast');
                } else {
                    $("#alert").hide();

                    if (review) {
                        // evaluate question answered and add to score
                        $("input[type=radio]").attr('disabled', true);
                        $(".a" + allQuestions[currentPage].correctAnswer)
                        if (answerArray[0].value == allQuestions[currentPage].correctAnswer) {
                            totalScore++;
                        } else {
                            $(".a" + answerArray[0].value)
                        }

                        review = false; // review completed
                    } else {
                        $("#content").fadeOut('slow', function () {
                            currentPage++; // iterate to next question
                            if (currentPage == allQuestions.length) { // Show Score
                                // quiz is over
                                $("p").show();
                                $("#quiz").hide();
                                $("#nextButton").hide();
                                $("p").html("You answered <span class='score'>" + totalScore + "/" + allQuestions.length + "</span> questions correctly!");
                            } else {
                                review = true; // turn review on for next question
                                var thisQ = allQuestions[currentPage];
                                // display a question
                                $("p").hide();
                                $("#quiz").show();
                                $("#form-question").html(thisQ.question);
                                $("#form-answers").empty();
                                var choiceArray = thisQ.choices;
                                for (var i = 0; i < choiceArray.length; i++) {
                                    $("#form-answers").append('<div class="form-radio a' + i + '"><input type="radio" name="q' + currentPage + '" value="' + i + '"> ' + choiceArray[i] + '</div>');
                                }
                            }
                        });
                        $("#content").fadeIn('slow');
                    }

                }
            })
        });

    }
};
xmlhttp.open("GET", "https://raw.githubusercontent.com/Rohini58/ReactJS-Week1/main/questions.json", true);
xmlhttp.send();
