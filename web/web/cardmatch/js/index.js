$().ready(function () {
    

    $("#cards").children()
               .each(function (index) {
                   $(this).click(function () {
                       $(this).toggleClass("card-flipped");
                   });
               });


    angulo = 0;
    setInterval(function () {
        angulo+=10;

        

        $("#teste").css('transform', 'rotateY(' + angulo + 'deg)');
    }, 1000);
    
});