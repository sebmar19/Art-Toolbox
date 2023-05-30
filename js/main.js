$(document).ready(function () {
    $("nav li, .location div").on("click", irSeccion);
    $(".btn-light").on("click", mostrarLightbox);
    $(".btn-cerrar").on("click", cerrarLightbox);
    $(".btn-menu-mobile").on("click", mostrarMenu);
    $(".cerrar-menu").on("click", ocultarMenu);
    $(".btn-marcas").on("click", moverGaleria);
    $(".videos-btn").on("click", cambiarVideo);
    $(window).on("keydown", function (e) {
        var tecla = e.key;
        console.log(tecla);
        if (tecla == "Escape") {
            cerrarLightbox();
        }
    })
    checkPos();
    $(window).scroll(function () {
        checkPos();
    });

});

function irSeccion() {
    var destino = $(this).index();
    destino++;
    console.log(destino);
    scrollToSection(destino);

}

function scrollToSection(destino) {
    var scrollDestino = $("section:nth-of-type(" + destino + ")").offset().top;
    console.log(scrollDestino);
    $("body, html").animate({
        scrollTop: scrollDestino
    }, '500');
}


function mostrarLightbox() {
    var seccion = $(this).attr("data-sec");
    console.log(seccion);
    $("." + seccion).fadeIn(0, function () {
        if ($(".visible").length == 1) {
            $(".visible").fadeOut(0, function () {
                $(".light-cont").removeClass("visible");
                $(".light-cont." + seccion).css("display", "flex");
                $(".light-cont." + seccion).addClass("visible");
                $(".lightbox").fadeIn(300);

                if (seccion == "paula") {
                    $(".lightbox").addClass("fondo-azul");
                } else if (seccion == "david") {
                    $(".lightbox").addClass("fondo-amarillo");
                }
            });
        } else {
            $(".light-cont." + seccion).css("display", "flex");
            $(".light-cont." + seccion).addClass("visible");
            $(".lightbox").fadeIn(300);

            if (seccion == "paula") {
                $(".lightbox").addClass("fondo-azul");
            } else if (seccion == "david") {
                $(".lightbox").addClass("fondo-amarillo");
            }
        }


    });

}

function cerrarLightbox() {
    $("video")[0].pause();
    $(".lightbox").fadeOut(300, function () {
        $(".light-cont").removeClass("visible");
        $(".light-cont").attr("style", "");
        $(".lightbox").removeClass("fondo-azul");
        $(".lightbox").removeClass("fondo-amarillo");
    });
}

function mostrarMenu() {
    $("nav").css("right", "0vw");
}

function ocultarMenu() {
    $("nav").attr("style", "");
}


function moverGaleria() {
    var distancia = parseInt($(".marcas-cont").width(), 10);
    console.log(distancia);
    var pos = parseInt($(".marcas-wrapper").css("margin-left"), 10);
    var element = parseInt($(".marca-elem").width(), 10);
    console.log(pos);
    var visibles = parseInt(distancia / element, 10);
    var cantidad = parseInt($(".marca-elem").length, 10);
    var limite = parseInt(cantidad / visibles, 10);
    console.log(visibles);
    console.log((pos / distancia) + " d " + (limite - 1));
    if ($(this).hasClass("btn-der")) {
        if ((-pos / distancia) < (limite - 1)) {
            var mover = pos - distancia
            $(".marcas-wrapper").css("margin-left", mover);
        }
    }
    if ($(this).hasClass("btn-izq")) {
        if ((-pos / distancia) > (0)) {
            var mover = pos + distancia
            $(".marcas-wrapper").css("margin-left", mover);
        }
    }


}

function checkPos() {

    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height() / 2;
    // console.log(scrollPos);

    var seccionesPos = $("section");
    var posiciones = [];
    for (var i = 0; i < seccionesPos.length; i++) {
        posiciones[i] = seccionesPos.eq(i).offset().top;

    }
    // console.log(posiciones);
    var actual = 0;
    for (var i = 0; i < seccionesPos.length; i++) {
        if ((scrollPos + windowHeight) >= posiciones[i]) {
            actual = i;
        }

    }
    console.log(actual);
    $(".location div").removeClass("active");
    $(".location div:nth-child(" + (actual + 1) + ")").addClass("active");

}

function cambiarVideo() {
    var url = $(this).attr("data-url");
    var video = $(this).parent().parent().children(".video-wrapper").children("video");
    video.attr("src", url);
    video[0].load();
    video[0].play();
}
