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
    // console.log(recipeNames);
    // console.log(recipeLines);


    var showIndex = Math.floor(Math.random() * (recipeNames.length - 1));

    // console.log(recipeNames[showIndex]);
    // console.log(recipeLines[showIndex]);
    var recipeName = recipeNames[showIndex];
    var recipeLine = recipeLines[showIndex];
    callBing(recipeName);

    $(".recipeCol").append("<strong>" + recipeName + "</strong><br></br>");
    for (i in recipeLine) {
      $(".recipeCol").append(recipeLine[i] + "<br></br>");
    };

    // amazon(recipeLine);

  })

};


$("#later").on("click", function (event) {
  event.preventDefault();

  // $(".shopCol").html("");

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
  $(".recipeCol").html("");

  var ingredient = $("#search").val();

  event.preventDefault();

  // console.log("hi");

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

    if(recipeImage !== undefined){
      $(".recipeCol").append($("<img src='" + recipeImage + "'>"));
    } else{
      console.log(response.value[0].contentUrl);
    }
    // need to decide on an action for undefined
  })

}
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

    if(recipeImage !== undefined){
      $(".imgContainer").append($("<img src='" + recipeImage + "'>"));
    }
  })
}
 


// function suggestions() {

//   for (i in foodTypes) {

//     var link = $('<a href="#" class="type ' + foodTypes[i] + 'Topic">' + foodTypes[i] + '</a><br>')
//     $("#suggestions").append(link);
//   }

// };



// function amazon(lines) {
//   $(".shopCol").html("");

//   var amazonURL;

//   for (i in lines) {
//     var txt = lines[i];
//     var ingredient = lines[i].split(" ").join("+");
//     for (j in measurement) {
//       ingredient = ingredient.replace(measurement[j], "");
//     }
//     amazonURL = "https://www.amazon.com/s?k=" + ingredient;

//     // var link = txt.link(amazonURL);

//     var link = ("<a href='" + amazonURL + "' target='_blank'>" + txt + "</a>");

//     $(".shopCol").append(link + "<br></br>");
//   }
//   console.log(amazonURL);





// };
//bcf2f865ecb15e58d0d9622617c02b63f872a838
