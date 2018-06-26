$(function(){
    var $h1 = $("h1");
    var $zip =$("inpunt[name = 'zip']");
    $("form").on("submit", function(event){
        evenet.prevenDefault();
        var zipCode = $.trim($zip.val());
        $h1.text("Cargando...");
        var request = $.ajax({
            url:"/" + zipCode,
            dataType: "json"
        });
    
        request.done(function(data){
            var temperature = data.temperature;
            $h1.html("La temperatura es" + temperature + "&#176; en " + zipCode + ".")
        });

        request.fail(function() {
            $h1.text("Error!")
        });
    });
});