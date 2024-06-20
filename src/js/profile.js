$(document).ready(function () {
    //NOTE - Слайдер в оффере

    const mainSwiper = new Swiper(".main__history-slider", {
        slidesPerView: 3,
        spaceBetween: 35,
        loop: true,
        autoplay: {
            delay: 5000,
        },

        navigation: {
            nextEl: ".main .swiper-button-next",
            prevEl: ".main .swiper-button-prev",
        },
    });

    //NOTE - Кнопка избранного

    $(".fav-button").click(function () {
        $(this).toggleClass("added");
    });
});
