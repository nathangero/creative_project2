$(document).ready(function() { // Don't run until the webpage is fully loaded

    $("#start").click(function(e) {
        e.preventDefault();
        var ingredients = $("#ingredients").val().split(' ');
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
            url : myurl,
            dataType : "json",
            success : function(json){
                console.log(json);
            }
        })
    });

});