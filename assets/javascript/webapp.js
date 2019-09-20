// $(document).ready(function () {
var recipeNames = [];
var recipeLines = [];
var measurement = ["/", "grams", "gram", "teaspoons", "tsp", "tbsp", "teaspoon", "tablespoons", "tablespoon", "cups", "cup", "pounds", "pound", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

//function to call the Edamam api, can add more parameters to improve and specify the query
function callEdamam(query) {
  var queryURL = "https://api.edamam.com/search?";

  var q = query;

  var apiId = "app_id=6b37a04b";

  var apiKey = "app_key=59ee4eaaea79bef6ea234639a9c48a1a";

  queryURL = queryURL + "q=" + q + "&" + apiId + "&" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var hits = response.hits;
    for (i in hits) {
      recipeNames.push(hits[i].recipe.label);
      recipeLines.push(hits[i].recipe.ingredientLines);
    }
    console.log(recipeNames);
    console.log(recipeLines);


    var showIndex = Math.floor(Math.random() * (recipeNames.length - 1));

    // console.log(recipeNames[showIndex]);
    // console.log(recipeLines[showIndex]);
    var recipeName = recipeNames[showIndex];
    var recipeLine = recipeLines[showIndex];
    $(".recipeCol").append("<strong>" + recipeName + "</strong><br></br>");
    for (i in recipeLine) {
      $(".recipeCol").append(recipeLine[i] + "<br></br>");
    };

    amazon(recipeLine);

  })

};

function amazon(lines) {
  $(".shopCol").html("");

  var amazonURL;

  for (i in lines) {
    var txt = lines[i];
    var ingredient = lines[i].split(" ").join("+");
    for (j in measurement) {
      ingredient = ingredient.replace(measurement[j], "");
    }
    amazonURL = "https://www.amazon.com/s?k=" + ingredient;

    // var link = txt.link(amazonURL);

    var link = ("<a href='" + amazonURL + "' target='_blank'>" + txt + "</a>");

    $(".shopCol").append(link + "<br></br>");
  }
  console.log(amazonURL);

};


//test callEdamam function

$("button").on("click", function (event) {
  $(".recipeCol").html("");
  var ingredient = $("#search").val();

  event.preventDefault();

  console.log("hi");

  callEdamam(ingredient);

  $("#search").val("");

});

// function suggestions() {

//   for (i in foodTypes) {

//     var link = $('<a href="#" class="type ' + foodTypes[i] + 'Topic">' + foodTypes[i] + '</a><br>')
//     $("#suggestions").append(link);
//   }

// };




// function callEdamam(query) {
//   var queryURL = "https://api.edamam.com/search?";

//   var q = query;

//   var apiId = "app_id=6b37a04b";

//   var apiKey = "app_key=59ee4eaaea79bef6ea234639a9c48a1a";

//   queryURL = queryURL + "q=" + q + "&" + apiId + "&" + apiKey;

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function (response) {
//     // console.log(response);
//     response.hits.forEach(function (hit) {
//       // console.log(hit.recipe.label);
//       $(".recipeCol").append(hit.recipe.ingredientLines + "<br></br>");

//     });
//   })
// };

