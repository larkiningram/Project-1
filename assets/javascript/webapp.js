$(document).ready(function(){


//function to call the Edamam api, can add more parameters to improve and specify the query
function callEdamam(query){
  var queryURL = "https://api.edamam.com/search?";

  var q = query;

  var apiId = "app_id=6b37a04b";

  var apiKey = "app_key=59ee4eaaea79bef6ea234639a9c48a1a";

  queryURL = queryURL + "q=" + q + "&" + apiId + "&" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    response.hits.forEach(function(hit){
      console.log(hit.recipe.ingredientLines);
    });
  })   
}

//test callEdamam function
callEdamam("chicken");


});