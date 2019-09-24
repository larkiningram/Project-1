// $(document).ready(function () {
var recipeNames = [];
var recipeLines = [];
var recipeFilters = [{ param: "&health=peanut-free", check: false }, {param: "&health=vegetarian", check: false}, {param: "&health=sugar-conscious", check: false}, {param: "&health=tree-nut-free", check: false}, {param: "&diet=low-fat", check: false}, {param: "&diet=high-protein", check: false}, {param: "&health=vegan", check: false}];

// nut variables
var protien = 0;
var carbs = 0;
var fat = 0;
// nut recommended variables
const recProtien = 196;
const recCarbs = 147;
const recFat = 65;

//function to call the Edamam api, can add more parameters to improve and specify the query
function callEdamam(query) {
  var queryURL = "https://api.edamam.com/search?";

  var q = query;

  var apiId = "app_id=6b37a04b";

  var apiKey = "app_key=59ee4eaaea79bef6ea234639a9c48a1a";

  queryURL = queryURL + "q=" + q + "&" + apiId + "&" + apiKey;

  recipeLines = [];
  recipeNames = [];
  
  for(var i = 0; i < recipeFilters.length; i++){
    if(recipeFilters[i].check === true){
      queryURL = queryURL + recipeFilters[i].param;
    }
  }

  console.log(queryURL);

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


    // set variables for nut values
    var nutrients = response.hits[showIndex].recipe.totalNutrients;
    protien = (nutrients.PROCNT.quantity).toFixed(2);
    carbs = (nutrients.CHOCDF.quantity).toFixed(2);
    fat = (nutrients.FAT.quantity).toFixed(2);

    var recipeName = recipeNames[showIndex];
    var recipeLine = recipeLines[showIndex];

    console.log(recipeName);
    console.log(recipeLine);

    callBing(recipeName);

    $(".name").append("<strong>" + recipeName + "</strong><br></br>");
    for (i in recipeLine) {
      $(".ingredients").append(recipeLine[i] + "<br></br>");
    };

    renderCharts();
    // amazon(recipeLine);

  })
};

$(".peanut-check").on('click', function(){
  if(recipeFilters[0].check === true){
  recipeFilters[0].check = false;
  console.log(recipeFilters[0].check)
  } else {
    recipeFilters[0].check = true;
    console.log(recipeFilters[0].check)
  }
})

$(".veg-check").on('click', function () {
  if (recipeFilters[1].check === true) {
    recipeFilters[1].check = false;
    console.log(recipeFilters[1].check)
  } else {
    recipeFilters[1].check = true;
    console.log(recipeFilters[1].check)
  }
})

$(".sugar-check").on('click', function () {
  if (recipeFilters[2].check === true) {
    recipeFilters[2].check = false;
    console.log(recipeFilters[2].check)
  } else {
    recipeFilters[2].check = true;
    console.log(recipeFilters[2].check)
  }
})

$(".tree-nut-check").on('click', function () {
  if (recipeFilters[3].check === true) {
    recipeFilters[3].check = false;
    console.log(recipeFilters[1].check)
  } else {
    recipeFilters[3].check = true;
    console.log(recipeFilters[3].check)
  }
})

$(".fat-check").on('click', function () {
  if (recipeFilters[4].check === true) {
    recipeFilters[4].check = false;
    console.log(recipeFilters[4].check)
  } else {
    recipeFilters[4].check = true;
    console.log(recipeFilters[4].check)
  }
})

$(".protein-check").on('click', function () {
  if (recipeFilters[5].check === true) {
    recipeFilters[5].check = false;
    console.log(recipeFilters[5].check)
  } else {
    recipeFilters[5].check = true;
    console.log(recipeFilters[5].check)
  }
})

$(".vegan-check").on('click', function () {
  if (recipeFilters[6].check === true) {
    recipeFilters[6].check = false;
    console.log(recipeFilters[6].check)
  } else {
    recipeFilters[6].check = true;
    console.log(recipeFilters[6].check)
  }
})

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

  queryURL = "https://centralus.api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + q + " food&count=10"

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
 
function renderCharts() {
  $("#barChart").empty();
  // bar chart
  Chart.defaults.global.defaultFontColor = 'black';
  Chart.defaults.global.defaultFontSize = 16;
  var barctx = $("#barChart");
  var myBarChart = new Chart(barctx, {
    type: 'bar',
    data: {
      labels: ['Protiens (g)', 'Carbs (g)', 'Fats (g)'],
      datasets: [{
        data: [protien, carbs, fat],
        backgroundColor: [
          '#426B69',
          '#222E50',
          '#2A4849'
        ],
        borderColor: [
          '#426B69',
          '#222E50',
          '#2A4849'
        ],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
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

//bcf2f865ecb15e58d0d9622617c02b63f872a838
