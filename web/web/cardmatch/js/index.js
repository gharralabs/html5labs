$().ready(function () {
    

    $("#cards").children()
               .each(function (index) {
                   $(this).click(function () {
                       $(this).toggleClass("card-flipped");
                   });
               });


    angulo = 0;
    setInterval(function () {
        angulo++;

        

        $("#teste").css('transform', 'rotateY(' + angulo + 'deg)');
    }, 1000);
    
});