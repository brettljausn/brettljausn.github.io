

var questions =eval("[[\"This drink contains caffeine.\", \"Coffee\", \"Mineral water\", \"Orange juice\", \"Coffee\", \"Beer\"], [\"Finish the proverb:\\r\\n\\r\\nPoets are born, ________.\", \"...not made.\", \"...not made.\", \"...but can also be made.\", \"...but thats not for sure.\", \"..., long live the poets!\"], [\"If a TV program is rated G then this is true.\", \"It is suitable for all audiences.\", \"It contains moderate violence.\", \"It contains mild sexual situations.\", \"It is suitable for all audiences.\", \"It is suitable for young children.\"], [\"The theory of relativity was introduced in physics by this man.\", \"Albert Einstein\", \"Galileo Galilei\", \"Albert Einstein\", \"Archimedes\", \"Isaac Newton\"], [\"The symbol for the chemical element iron is this.\", \"Fe\", \"I\", \"Fe\", \"Zn\", \"Br\"], [\"The author of the novel A Portrait of the Artist as a Young Man is this writer.\", \"James Joyce\", \"T. S. Eliot\", \"Samuel Beckett\", \"William Faulkner\", \"James Joyce\"], [\"The capital of Mongolia is this city.\", \"Ulaanbaatar\", \"Davao\", \"Islamabad\", \"Quezon\", \"Ulaanbaatar\"], [\"Mitochondrias function in cells is to perform this.\", \"To convert organic materials into energy\", \"To control chemical reactions within the cytoplasm\", \"To store information needed for cellular division\", \"To convert organic materials into energy\", \"To process proteins targeted to the plasma membrane\"], [\"The US bought Alaska in this year.\", \"1867\", \"1942\", \"1882\", \"1854\", \"1867\"], [\"The 23rd US President was in office during this period.\", \"1889 - 1893\", \"1909 - 1913\", \"1889 - 1893\", \"1837 - 1841\", \"1877 - 1881\"], [\"One of these actors did not star in the 1971 movie A Clockwork Orange.\", \"Warren Brown\", \"Michael Bates\", \"Patrick Magee\", \"Warren Brown\", \"Malcolm McDowell\"], [\"The first Bulgarian state was formed in this year.\", \"681 AD\", \"429 AD\", \"681 AD\", \"712 AD\", \"651 AD\"], [\"The 1962 Soccer World Cup tournament was held in this country.\", \"Chile\", \"Switzerland\", \"Mexico\", \"Chile\", \"Italy\"]]")
var question_index = 0;
var score = 0;
document.getElementById("question").innerHTML = questions[question_index][0];
document.getElementById("label_a").innerHTML = questions[question_index][2];
document.getElementById("label_b").innerHTML = questions[question_index][3];
document.getElementById("label_c").innerHTML = questions[question_index][4];
document.getElementById("label_d").innerHTML = questions[question_index][5];


var radios = document.getElementsByName('answer');

function myFunction() {
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
        // do whatever you want with the checked radio
        document.getElementById("display_answer").innerHTML = radios[i].value;
        if(questions[question_index][i+2] == questions[question_index][1]){
          score = score + 10;
          alert("Correct!")
        } else {
          alert("Wrong!")
          score = score -5;
        }
        question_index = question_index + 1;
        document.getElementById("question").innerHTML = questions[question_index][0];
        document.getElementById("label_a").innerHTML = questions[question_index][2];
        document.getElementById("label_b").innerHTML = questions[question_index][3];
        document.getElementById("label_c").innerHTML = questions[question_index][4];
        document.getElementById("label_d").innerHTML = questions[question_index][5];
        radios[i].checked=false;
        //document.getElementById("player_score").innerHTML = score;


        // only one radio can be logically checked, don't check the rest
        break;
    }
}
}
