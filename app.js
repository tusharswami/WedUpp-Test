var express = require("express"); //including express framework
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var file = 'file.txt';
var number;
var finalWordsArray = [];
app.use(bodyParser.urlencoded({ extended: true }));


fs.readFile(file, 'utf8', function (err, data) {

  if (err) throw err;

  var wordsArrayIni = wordSplit(data);
  var wordsArray = [];
  for(var i=0;i<wordsArrayIni.length;i++){
    wordsArray[i]=wordsArrayIni[i].toLowerCase();
  }
  var listWord = makeListWord(wordsArray);
  finalWordsArray = sortByCount(listWord);

});


function wordSplit (text) {
 
  var wordsArray = text.split(/\s+/);
  for( var i = 0; i < wordsArray.length-1; i++){ 
    
      if ( wordsArray[i] == "the" || wordsArray[i] === "and" || wordsArray[i] === "a" || wordsArray[i] === "of" || wordsArray[i] === "in" || wordsArray[i] ==="is" || wordsArray[i]==="to" ) {
        wordsArray.splice(i, 1); //This is definitely not the Ideal approach
        }
    }
    
    for( i = 0; i < wordsArray.length-1; i++){ 
    
      if (wordsArray[i] == 'A' || wordsArray[i] == 'The' || wordsArray[i] === "the" || wordsArray[i] == 'a') {
        wordsArray.splice(i, 1); 
        }
    }
  return wordsArray;
}


function makeListWord (wordsArray) {

  
  var listWord = {};
  
  wordsArray.forEach(function (value) {
    if (listWord.hasOwnProperty(value)) {
      listWord[value]++;
    } else {
      listWord[value] = 1;
    }
  });
  

  return listWord;

}


function sortByCount (listWord) {

  finalWordsArray = Object.keys(listWord).map(function(value) {
    return {
      name: value,
      total: listWord[value]
    };
  });

  finalWordsArray.sort(function(a, b) {
    return b.total - a.total;
  });

  return finalWordsArray;

}

//Requests Zone
app.get("", function(req, res){
   res.render("home.ejs"); 
   console.log("Made a request to home page");
   
});

app.get("/result", function(req, res){
    res.render("result.ejs", {finalWordsArray : finalWordsArray});
   console.log("Made a request to home page");
});

app.post("/submit",function(req,res){
    number = req.body.number;
    res.render("result.ejs", {finalWordsArray : finalWordsArray, number : number});
    console.log(finalWordsArray);
    console.log("frequency print successful")
});

app.get("*", function(req, res){
  
    res.render("home.ejs")
    console.log("Redirected to home page");
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});
