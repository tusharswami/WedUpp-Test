var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var file = 'file.txt';
var number;
var finalWordsArray = [];
app.use(bodyParser.urlencoded({ extended: true }));


fs.readFile(file, 'utf8', function (err, data) {

  if (err) throw err;

  var wordsArray = wordSplit(data);
  var listWord = makeListWord(wordsArray);
  var finalWordsArray = sortByCount(listWord);

});


function wordSplit (text) {
 
  var wordsArray = text.split(/\s+/);
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

app.get("", function(req, res){
   res.render("home.ejs"); 
   console.log("Made a request to home page");
   
});

app.get("/result", function(req, res){
//   res.render("result.ejs");
    res.render("result.ejs", {finalWordsArray : finalWordsArray, number : number})
   console.log(finalWordsArray);
   console.log("Made a request to home page");
});


app.post("/submit",function(req,res){
    number = req.body.number;
    res.render("result.ejs", {finalWordsArray : finalWordsArray, number : number});
    console.log(finalWordsArray);
    console.log("redirected to ");
    console.log(number);
});

app.get("*", function(req, res){

    res.render("home.ejs")
   
   console.log("Made a request to home page");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});
