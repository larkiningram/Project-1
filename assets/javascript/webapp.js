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


function callBing(query) {

  console.log(query);

  var q = query
    
  queryURL = "https://centralus.api.cognitive.microsoft.com/bing/v7.0/images/search?q="	 + q + "&count=10"

  $.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function(request){
      request.setRequestHeader("Ocp-Apim-Subscription-Key", "6e2cfe4724284d8fb174832d96aec26a")
    }
  }).then(function(response){
    console.log(response);
  })

}

callBing('cheeseburger');
})