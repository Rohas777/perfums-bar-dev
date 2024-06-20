//NOTE - Слайдер отзывов

const reviewsSwiper = new Swiper(".reviews__slider", {
    loop: true,
    navigation: {
        nextEl: ".reviews__nav .swiper-button-next",
        prevEl: ".reviews__nav .swiper-button-prev",
    },
    pagination: {
        el: ".reviews .swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            spaceBetween: 30,
            slidesPerView: 1,
        },
        601: {
            slidesPerView: 3,
        },
        993: {
            spaceBetween: 40,
        },
    },
});
