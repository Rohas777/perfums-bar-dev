$(document).ready(function () {
    //NOTE - Слайдер рекомендуемых постов

    const postRecsSwiper = new Swiper(".posts-recommendations__slider", {
        slidesPerView: 3,
        spaceBetween: 35,
        loop: true,
        autoplay: {
            delay: 5000,
        },

        navigation: {
            nextEl: ".posts-recommendations .swiper-button-next",
            prevEl: ".posts-recommendations .swiper-button-prev",
        },
    });
});
