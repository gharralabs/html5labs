﻿$().ready(function () {

    var pingpong = {

        pontuacaoA: 0,
        pontuacaoB: 0,

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
        moverEsteiraAAutomaticamente();
        moverBola();
    }


    function moverBola()
    {
        var bola = pingpong.bola;

        var bolaX = bola.x + bola.velocidade * bola.direcaoX;
        var bolaY = bola.y + bola.velocidade * bola.direcaoY;

        if (bolaX >= pingpong.esteiraA.x && bolaX <= pingpong.esteiraA.x + pingpong.esteiraA.largura)
        {
            if( bolaY >= pingpong.esteiraA.y && bolaY <= pingpong.esteiraA.y + pingpong.esteiraA.altura)
            {
                bola.direcaoX = 1;
            }
        }

        
        if (bolaX >= pingpong.esteiraB.x && bolaX <= pingpong.esteiraB.x + pingpong.esteiraB.largura)
        {
            if( bolaY >= pingpong.esteiraB.y && bolaY <= pingpong.esteiraB.y + pingpong.esteiraB.altura )
            {
                bola.direcaoX = -1;
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


    function moverEsteiraAAutomaticamente()
    {
        var velocidade = 4;
        var direcao = 1;

        var esteiraY = pingpong.esteiraA.y + pingpong.esteiraA.altura / 2;

        if (esteiraY > pingpong.bola.y)
            direcao = -1;

        pingpong.esteiraA.y += velocidade * direcao;

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

        pingpong.pontuacaoA++;
        $("#score-a").text(pingpong.pontuacaoA);
    }


    function jogadorBVenceu()
    {
        pingpong.bola.x = 150;
        pingpong.bola.y = 100;
        pingpong.bola.direcaoX = 1;
        pingpong.pontuacaoB++;
        $("#score-b").text(pingpong.pontuacaoB);
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