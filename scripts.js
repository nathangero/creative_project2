$(document).ready(function() { // Don't run until the webpage is fully loaded

    $("#start").click(function(e) {
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
                $("#relativeFooter").css('position', 'relative'); // Makes the footer become relative after successful search
            }
        });
    });

});