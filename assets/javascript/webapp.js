$(document).ready(function(){

function callEdamam(query){
  var queryURL = "ttps://api.edamam.com/search?";

  var q = query;

  var apiId = "api_id=6b37a04b";

  var apiKey = "api_key=59ee4eaaea79bef6ea234639a9c48a1a";

  queryURL = queryURL + q + "&" + apiId + "&" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response)

  })

    
}


});