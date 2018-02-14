$(document).ready(function() { // Don't run until the webpage is fully loaded

    var placeholder = ['e.g. chicken,garlic,tomato','e.g. beef,carrots','e.g. pork,broccoli,onions','e.g. string beans,carrots,peas','e.g. flour,sugar,chocolate'];
    var rand = Math.floor(Math.random() * (placeholder.length - 0)); //The maximum is inclusive and the minimum is inclusive 
    // Sets the placeholder text to one of the strings typed out above
    $("#ingredients").attr('placeholder',placeholder[rand]);

    // Runs when the search button is pressed
    $("#ingredients").keyup(function(event) { // This is when the enter key is hit
        if (event.keyCode === 13) {
            $("#search").click(); // Runs the onclick function for the Search button
        }
    });
    $("#search").click(function(e) {
        e.preventDefault();
        var ingredients = $("#ingredients").val().split(',');
        console.log(ingredients);

        var query = 'i=';
        for (var i = 0; i < ingredients.length; i++) {
            query += ingredients[i];
            if (i < ingredients.length-1) {
                query += ",";
            }
        }

        var myurl = "http://www.recipepuppy.com/api/?" + query;
        console.log(myurl);

        // Runs when connecting to the api
        $.ajax({
            url: myurl,
            dataType: "jsonp", // jsonp goes around the CORS issue
            jsonpCallback: "logResults", // Prevents the '?callback' string from being appended to the url
            success: function(json) { 
                console.log(json) 
                var results = '';
                for (var i = 0; i < json.results.length; i++) {
                    results += '<img src="' + json.results[i].thumbnail + '">';
                    results += '<li>\n<a href=' + json.results[i].href + ' target="_blank">' + json.results[i].title + '</a>\n<br><br>';
                }
                $("#recipeResults").html(results);

                if (json.results.length != 0) {
                    $("#relativeFooter").css('position', 'relative'); // Makes the footer become relative after successful search
                }
            }
        });
    });

});