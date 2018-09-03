

function createTable(tableData) {
  var table = document.getElementById("scoretable");
  var tableHead = document.createElement('thead');
  var columnheader = document.createElement('tr')
  var nameheader = document.createElement('th')
  nameheader.appendChild(document.createTextNode("Player"));
  var scoreheader = document.createElement('th');
  scoreheader.appendChild(document.createTextNode("Score"));
  columnheader.appendChild(nameheader);
  columnheader.appendChild(scoreheader);
  tableHead.appendChild(columnheader);
  table.appendChild(tableHead);
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
}




$.ajax({
   url : 'https://brettljausn.000webhostapp.com/fetch_scores.php', // your php file
   type : 'GET', // type of the HTTP request
   success : function(data){
      var obj = jQuery.parseJSON(data);
      console.log(obj);
      createTable(obj);
   }
});

var questions = eval("[[\"This drink contains caffeine.\", \"Coffee\", \"Mineral water\", \"Orange juice\", \"Coffee\", \"Beer\"],[\"Finish the proverb:\\r\\n\\r\\nPoets are born, ________.\", \"...not made.\", \"...not made.\", \"...but can also be made.\", \"...but thats not for sure.\", \"..., long live the poets!\"]]");

$.get('https://brettljausn.000webhostapp.com/q_general.txt', function(data) {
   console.log(data);
   questions = eval(data);
}, 'text');

// var questions = eval("[[\"This drink contains caffeine.\", \"Coffee\", \"Mineral water\", \"Orange juice\", \"Coffee\", \"Beer\"], [\"Finish the proverb:\\r\\n\\r\\nPoets are born, ________.\", \"...not made.\", \"...not made.\", \"...but can also be made.\", \"...but thats not for sure.\", \"..., long live the poets!\"], [\"If a TV program is rated G then this is true.\", \"It is suitable for all audiences.\", \"It contains moderate violence.\", \"It contains mild sexual situations.\", \"It is suitable for all audiences.\", \"It is suitable for young children.\"], [\"The theory of relativity was introduced in physics by this man.\", \"Albert Einstein\", \"Galileo Galilei\", \"Albert Einstein\", \"Archimedes\", \"Isaac Newton\"], [\"The symbol for the chemical element iron is this.\", \"Fe\", \"I\", \"Fe\", \"Zn\", \"Br\"], [\"The author of the novel A Portrait of the Artist as a Young Man is this writer.\", \"James Joyce\", \"T. S. Eliot\", \"Samuel Beckett\", \"William Faulkner\", \"James Joyce\"], [\"The capital of Mongolia is this city.\", \"Ulaanbaatar\", \"Davao\", \"Islamabad\", \"Quezon\", \"Ulaanbaatar\"], [\"Mitochondrias function in cells is to perform this.\", \"To convert organic materials into energy\", \"To control chemical reactions within the cytoplasm\", \"To store information needed for cellular division\", \"To convert organic materials into energy\", \"To process proteins targeted to the plasma membrane\"], [\"The US bought Alaska in this year.\", \"1867\", \"1942\", \"1882\", \"1854\", \"1867\"], [\"The 23rd US President was in office during this period.\", \"1889 - 1893\", \"1909 - 1913\", \"1889 - 1893\", \"1837 - 1841\", \"1877 - 1881\"], [\"One of these actors did not star in the 1971 movie A Clockwork Orange.\", \"Warren Brown\", \"Michael Bates\", \"Patrick Magee\", \"Warren Brown\", \"Malcolm McDowell\"], [\"The first Bulgarian state was formed in this year.\", \"681 AD\", \"429 AD\", \"681 AD\", \"712 AD\", \"651 AD\"], [\"The 1962 Soccer World Cup tournament was held in this country.\", \"Chile\", \"Switzerland\", \"Mexico\", \"Chile\", \"Italy\"]]")

var question_index = Math.floor(Math.random() * questions.length);;
var score = 0;
var strikes = 0;


document.getElementById("question").innerHTML = questions[question_index][0];
document.getElementById("label_a").innerHTML = questions[question_index][2];
document.getElementById("label_b").innerHTML = questions[question_index][3];
document.getElementById("label_c").innerHTML = questions[question_index][4];
document.getElementById("label_d").innerHTML = questions[question_index][5];
document.getElementById("score").innerHTML = "Score: " + score;
document.getElementById("strikes").innerHTML = "Wrong answers allowed: " + (3-strikes);


var radios = document.getElementsByName('answer');

function submit_answer() {
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
        // do whatever you want with the checked radio
        if(questions[question_index][i+2] == questions[question_index][1]){
          score = score + 10;
          document.getElementById("score").innerHTML = "Score: " + score;
          document.getElementById("display_answer").innerHTML = "Correct answer!";
        } else {
          score = score - 5;
          strikes = strikes + 1;

          if(strikes == 4){
            var player_name = prompt("Your final score is " + score + ". Please enter your name", "Harry Potter");
            console.log(player_name);
            console.log(score);
            if (player_name && !player_name.trim()) {
              $.ajax({
                 url : 'https://brettljausn.000webhostapp.com/submit_score.php', // your php file
                 type : 'POST', // type of the HTTP request
                 data: {
                   'name' : player_name,
                   'score': score,
                 }
              });
            }

            setTimeout(function (){

            location.reload();

          }, 50);
          }

          document.getElementById("strikes").innerHTML = "Wrong answers allowed: " + (3-strikes);
          document.getElementById("score").innerHTML = "Score: " + score;
          document.getElementById("display_answer").innerHTML = "Wrong answer! The correct answer would have been '" + questions[question_index][1] + "'.";
        }
        questions.splice(question_index,1);
        question_index = Math.floor(Math.random() * questions.length);
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

function resetQuiz(){

  var myNode = document.getElementById("scoretable");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

  $.ajax({
     url : 'https://brettljausn.000webhostapp.com/fetch_scores.php', // your php file
     type : 'GET', // type of the HTTP request
     success : function(data){
        var obj = jQuery.parseJSON(data);
        console.log(obj);
        createTable(obj);
     }
  });


  var questions = eval("[[\"This drink contains caffeine.\", \"Coffee\", \"Mineral water\", \"Orange juice\", \"Coffee\", \"Beer\"], [\"Finish the proverb:\\r\\n\\r\\nPoets are born, ________.\", \"...not made.\", \"...not made.\", \"...but can also be made.\", \"...but thats not for sure.\", \"..., long live the poets!\"], [\"If a TV program is rated G then this is true.\", \"It is suitable for all audiences.\", \"It contains moderate violence.\", \"It contains mild sexual situations.\", \"It is suitable for all audiences.\", \"It is suitable for young children.\"], [\"The theory of relativity was introduced in physics by this man.\", \"Albert Einstein\", \"Galileo Galilei\", \"Albert Einstein\", \"Archimedes\", \"Isaac Newton\"], [\"The symbol for the chemical element iron is this.\", \"Fe\", \"I\", \"Fe\", \"Zn\", \"Br\"], [\"The author of the novel A Portrait of the Artist as a Young Man is this writer.\", \"James Joyce\", \"T. S. Eliot\", \"Samuel Beckett\", \"William Faulkner\", \"James Joyce\"], [\"The capital of Mongolia is this city.\", \"Ulaanbaatar\", \"Davao\", \"Islamabad\", \"Quezon\", \"Ulaanbaatar\"], [\"Mitochondrias function in cells is to perform this.\", \"To convert organic materials into energy\", \"To control chemical reactions within the cytoplasm\", \"To store information needed for cellular division\", \"To convert organic materials into energy\", \"To process proteins targeted to the plasma membrane\"], [\"The US bought Alaska in this year.\", \"1867\", \"1942\", \"1882\", \"1854\", \"1867\"], [\"The 23rd US President was in office during this period.\", \"1889 - 1893\", \"1909 - 1913\", \"1889 - 1893\", \"1837 - 1841\", \"1877 - 1881\"], [\"One of these actors did not star in the 1971 movie A Clockwork Orange.\", \"Warren Brown\", \"Michael Bates\", \"Patrick Magee\", \"Warren Brown\", \"Malcolm McDowell\"], [\"The first Bulgarian state was formed in this year.\", \"681 AD\", \"429 AD\", \"681 AD\", \"712 AD\", \"651 AD\"], [\"The 1962 Soccer World Cup tournament was held in this country.\", \"Chile\", \"Switzerland\", \"Mexico\", \"Chile\", \"Italy\"]]")
  var question_index = Math.floor(Math.random() * questions.length);;
  var score = 0;
  var strikes = 0;
  console.log(strikes);


  document.getElementById("question").innerHTML = questions[question_index][0];
  document.getElementById("label_a").innerHTML = questions[question_index][2];
  document.getElementById("label_b").innerHTML = questions[question_index][3];
  document.getElementById("label_c").innerHTML = questions[question_index][4];
  document.getElementById("label_d").innerHTML = questions[question_index][5];
  document.getElementById("score").innerHTML = 0;
  document.getElementById("strikes").innerHTML = "Wrong answers allowed: " + 3;
  document.getElementById("display_answer").innerHTML = "";


  var radios = document.getElementsByName('answer');

}
