// $(document).ready(function () {
var recipeNames = [];
var recipeLines = [];
// var measurement = ["/", "grams", "gram", "teaspoons", "tsp", "tbsp", "teaspoon", "tablespoons", "tablespoon", "cups", "cup", "pounds", "pound", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];


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

    var showIndex = Math.floor(Math.random() * (recipeNames.length - 1));

    var recipeName = recipeNames[showIndex];
    var recipeLine = recipeLines[showIndex];

    console.log(recipeName);
    console.log(recipeLine);

    callBing(recipeName);

    $(".name").append("<strong>" + recipeName + "</strong><br></br>");
    for (i in recipeLine) {
      $(".ingredients").append(recipeLine[i] + "<br></br>");
    };

  })
};


$("#later").on("click", function (event) {
  event.preventDefault();

  var ingredient = $("#ingredient").val();
  var ingredientLink = ingredient.split(" ").join("+");
  var amazonURL = "https://www.amazon.com/s?k=" + ingredientLink;
  callBingIngredients(ingredient);

  var link = ("<a href='" + amazonURL + "' target='_blank'>" + ingredient + "</a>");

  $(".amazonLinks").append(link + "<br></br>");

  $("#ingredient").val("");
});


//test callEdamam function

$("#initial").on("click", function (event) {
  $(".name").html("");
  $(".ingredients").html("");
  $(".recipeCol h3").html("");

  var ingredient = $("#search").val();

  event.preventDefault();

  callEdamam(ingredient);

  $("#search").val("");

});

$("#clear").on("click", function () {
  $(".amazonLinks").empty();
  $(".imgContainer").empty();
});




// Bing API - recipe image  //my variables to work on
function callBing(query) {

  console.log(query);

  var q = query

  queryURL = "https://centralus.api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + q + "&count=10"

  $.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("Ocp-Apim-Subscription-Key", "6e2cfe4724284d8fb174832d96aec26a")
    }
  }).then(function (response) {
    console.log(response)
    console.log(response.value[0].contentUrl);
    var recipeImage = response.value[0].contentUrl;

    if (recipeImage !== undefined) {
      $(".name").append($("<img src='" + recipeImage + "' height='200px'>"));
    } else {
      console.log(response.value[0].contentUrl);
      alert("Try another query!");
    }
    // need to decide on an action for undefined
  })

};

// Bing API - ingredients  //my variables to work on
function callBingIngredients(query) {

  console.log(query);

  var q = query

  queryURL = "https://centralus.api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + q + "&count=10"

  $.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("Ocp-Apim-Subscription-Key", "6e2cfe4724284d8fb174832d96aec26a")
    }
  }).then(function (response) {
    console.log(response)
    console.log(response.value[0].contentUrl);
    var recipeImage = response.value[0].contentUrl;

    if (recipeImage !== undefined) {
      $(".imgContainer").html($("<img src='" + recipeImage + "' height='200px'>"));
    }
  })
};

//bcf2f865ecb15e58d0d9622617c02b63f872a838
