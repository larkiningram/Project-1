// $(document).ready(function () {
var recipeNames = [];
var recipeLines = [];

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
    $(".recipeCol").append("<strong>" + recipeNames[showIndex] + "</strong><br></br>");
    for (i in recipeLines) {
      $(".recipeCol").append(recipeLines[showIndex][i] + "<br></br>");
    }
    return recipeLines;
  })

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

// function amazon() {

//   var ingredient = $("#search").val();
//   var amazonURL = "https://www.amazon.com/s?k=" + ingredient;

//   console.log(amazonURL);

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

