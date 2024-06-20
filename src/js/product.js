$(document).ready(function () {
    //NOTE - Инициализация галлерей

    Fancybox.bind("[data-fancybox]", {});

    //NOTE - Кнопка оригинального бренда

    $(".product__orig-button").click(function () {
        $(".product__image_original").toggleClass("active");
    });

    //NOTE - Переключение литража флакона

    $(".product__capacity-item").click(function () {
        if ($(this).hasClass("active") || $(this).hasClass("not-avialable")) {
            return;
        }

        $(this)
            .closest(".product__capacity")
            .find(".product__capacity-item")
            .removeClass("active");
        $(this).addClass("active");
    });

    //NOTE - Инициализация счётчика

    function initProductCounter() {
        $(".counter").each(function () {
            let productCount = $(this).find("span").text() - 0,
                maxCount = $(this).data("max") - 0;

            if (productCount === 1) {
                $(this).find(".counter-control_minus").addClass("disabled");
            } else {
                $(this).find(".counter-control_minus").removeClass("disabled");
            }

            if (productCount === maxCount) {
                $(this).find(".counter-control_plus").addClass("disabled");
            } else {
                $(this).find(".counter-control_plus").removeClass("disabled");
            }
        });
    }

    initProductCounter();

    //NOTE - Счётчик товаров

    $(".counter-control").click(function () {
        const counterContainer = $(this).closest(".counter");
        let productCount = counterContainer.find("span").text() - 0,
            maxCount = counterContainer.data("max") - 0;

        if (productCount === 1 && $(this).hasClass("counter-control_minus")) {
            return;
        }
        if (
            productCount === maxCount &&
            $(this).hasClass("counter-control_plus")
        ) {
            return;
        }
        counterContainer.find(".counter-control").removeClass("disabled");

        if ($(this).hasClass("counter-control_minus")) {
            productCount--;
        }
        if ($(this).hasClass("counter-control_plus")) {
            productCount++;
        }

        if (productCount === 1) {
            counterContainer
                .find(".counter-control_minus")
                .addClass("disabled");
        }
        if (productCount === maxCount) {
            counterContainer.find(".counter-control_plus").addClass("disabled");
        }

        counterContainer.find("span").text(productCount);
    });

    //NOTE - Кнопка "В избранное"

    $(".fav-button").click(function () {
        $(this).toggleClass("added");
    });

    //NOTE - Слайдер похожих товаров

    const similarSwiper = new Swiper(".similar__slider", {
        spaceBetween: 35,
        loop: true,

        navigation: {
            nextEl: ".similar__slider .swiper-button-next",
            prevEl: ".similar__slider .swiper-button-prev",
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

    //NOTE - Слайдер рекомендуемых товаров

    const recommendationsSwiper = new Swiper(".recommendations__slider", {
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
