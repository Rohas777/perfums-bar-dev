$(document).ready(function () {
    //NOTE - Слайдер в оффере

    const mainSwiper = new Swiper(".main__history-slider", {
        slidesPerView: 2,
        spaceBetween: 35,

        navigation: {
            nextEl: ".main__history .swiper-button-next",
            prevEl: ".main__history .swiper-button-prev",
        },
        pagination: {
            el: ".main__history .swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            1261: {
                slidesPerView: 3,
            },
        },
    });

    //NOTE - Кнопка избранного

    $(".fav-button").click(function () {
        $(this).toggleClass("added");
    });

    //NOTE - Слайдер избранных товаров

    const favsSwiper = new Swiper(".favs__slider", {
        spaceBetween: 35,

        navigation: {
            nextEl: ".favs__slider .swiper-button-next",
            prevEl: ".favs__slider .swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            391: {
                slidesPerView: 2,
            },
            601: {
                slidesPerView: 4,
            },
            1261: {
                slidesPerView: 3,
            },
        },
    });

    //FIXME - Все кнопки избранное в блоке избранное активны

    $(".favs .fav-button").addClass("added");
});
