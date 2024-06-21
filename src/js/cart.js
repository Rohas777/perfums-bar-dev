$(document).ready(function () {
    //=include product-card-cart.js

    //NOTE - Слайдер товаров

    if ($(".product-card-cart").length > 3) {
        const cartSwiper = new Swiper(".cart__slider", {
            slidesPerView: 3,
            spaceBetween: 35,

            navigation: {
                nextEl: ".cart .swiper-button-next",
                prevEl: ".cart .swiper-button-prev",
            },

            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                361: {
                    slidesPerView: 2,
                },
                601: {
                    slidesPerView: 3,
                },
                769: {
                    slidesPerView: 4,
                },
                993: {
                    slidesPerView: 3,
                },
            },
        });
    } else {
        $(".cart").addClass("disabled");
    }

    //NOTE - Слайдер рекомендуемых товаров

    const recommendationsSwiper = new Swiper(".recommendations__slider", {
        slidesPerView: 3,
        spaceBetween: 35,
        loop: true,

        navigation: {
            nextEl: ".recommendations__slider .swiper-button-next",
            prevEl: ".recommendations__slider .swiper-button-prev",
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
});
