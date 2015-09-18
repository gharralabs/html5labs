$().ready(function () {

    var pingpong = {

        esteiraA: {
            x: 50,
            y: 100,
            largura: 20,
            altura: 70
        },

        esteiraB: {
            x: 320,
            y: 100,
            largura: 20,
            altura: 70
        },

        playground : {
            offsetTop: $("#playground").offset().top,
            altura: parseInt($("#playground").height()),
            largura: parseInt($("#playground").width())
        },

        bola: {
            velocidade: 5,
            x: 150,
            y: 100,
            direcaoX: 1,
            direcaoY : 1
        }
    };


    function loopJogo()
    {
        moverBola();
    }


    function moverBola()
    {
        var bola = pingpong.bola;

        var bolaX = bola.x + bola.velocidade * bola.direcaoX;
        var bolaY = bola.y + bola.velocidade * bola.direcaoY;

        if (bolaX >= pingpong.esteiraA.x && bola <= pingpong.esteiraA.x + pingpong.esteiraA.largura)
        {
            if( bolaY >= pingpong.esteiraA.y && bolaY <= pingpong.esteiraA.y + pingpong.esteiraA.altura)
            {
                bola.direcaoX = 1;
            }
        }


        if (bolaAtingiuTopoOuRodape())
            bola.direcaoY *= -1;

        if (bolaAtingiuParedeDireita())
            jogadorAVenceu();

        if (bolaAtingiuParedeEsquerda())
            jogadorBVenceu();

        bola.x += bola.direcaoX * bola.velocidade;
        bola.y += bola.direcaoY * bola.velocidade;
    }

    function bolaAtingiuTopoOuRodape()
    {
        var y = pingpong.bola.y + pingpong.bola.velocidade * pingpong.bola.direcaoY;
        return y < 0 || y > pingpong.playground.altura;
    }

    function bolaAtingiuParedeDireita()
    {
        return pingpong.bola.x + pingpong.bola.velocidade * pingpong.bola.direcaoX > pingpong.playground.largura;
    }

    function bolaAtingiuParedeEsquerda()
    {
        return pingpong.bola.x + pingpong.bola.velocidade * pingpong.bola.direcaoX < 0;
    }


    function desenharBola()
    {
        var bola = pingpong.bola;
        $("#ball").css({
            "left": bola.x,
            "top": bola.y
        });
    }

    function jogadorAVenceu()
    {
        pingpong.bola.x = 250;
        pingpong.bola.y = 100;
        pingpong.bola.direcaoX = -1;
    }


    function jogadorBVenceu()
    {
        pingpong.bola.x = 150;
        pingpong.bola.y = 100;
        pingpong.bola.direcaoX = 1;
    }


    function desenharEsteiras()
    {
        $("#paddleA").css("top", pingpong.esteiraA.y);
        $("#paddleB").css("top", pingpong.esteiraB.y);
    }

    function tratarEntradaMouse()
    {
        $('#playground').mouseenter(function () {
            pingpong.isPaused = false;
        });

        $('#playground').mouseleave(function () {
            pingpong.isPaused = true;
        });
        
        $('#playground').mousemove(function (e) {
            pingpong.esteiraB.y = e.pageY - pingpong.playground.offsetTop;
        });
    }

    function desenhar()
    {
        desenharBola();
        desenharEsteiras();
        window.requestAnimationFrame(desenhar);
    }

    function iniciar()
    {
        pingpong.timer = setInterval(loopJogo, 1000 / 30);
        window.requestAnimationFrame(desenhar);
        tratarEntradaMouse();
    }

    iniciar();
    
});