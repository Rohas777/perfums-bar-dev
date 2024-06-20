$(document).ready(function () {
    //NOTE - Функционал кнопки поиска

    $(".search__open").click(function () {
        if (!$(this).closest(".search").hasClass("active")) {
            $(this).closest(".search").addClass("active");
            $(this).closest(".menu__search").addClass("active");
            $(".menu__buttons").addClass("search-opened");
            setTimeout(function () {
                $(".search__input").focus();
            }, 800);
        }
    });

    $(".search__close").click(function () {
        if ($(this).closest(".search").hasClass("active")) {
            $(this).closest(".search").removeClass("active");
            $(this).closest(".menu__search").removeClass("active");
            $(".menu__buttons").removeClass("search-opened");
            setTimeout(function () {
                $(".search__input").val("");
            }, 800);
        }
    });
    $(document).on("mouseup", function (e) {
        if (
            !$(".menu__search").is(e.target) &&
            $(".menu__search").has(e.target).length === 0
        ) {
            if ($(".search").hasClass("active")) {
                $(".search").removeClass("active");
                $(".menu__search").removeClass("active");
                $(".menu__buttons").removeClass("search-opened");
                setTimeout(function () {
                    $(".search__input").val("");
                }, 800);
            }
        }
    });

    //NOTE - Переключение цвета категорий

    $(".menu__categories button").click(function () {
        if ($(this).hasClass("active")) return;

        $(".menu__categories button").removeClass("active");
        $(this).addClass("active");
    });
    $(".menu__subcategories button").click(function () {
        if ($(this).hasClass("active")) return;

        $(".menu__subcategories button").removeClass("active");
        $(this).addClass("active");
    });

    //=include product-card.js

    //NOTE - Функционал кнопки фильтров

    $(".menu__filter").click(function () {
        turnOverlay(true);
        $(this).addClass("active");
        $(".filter").addClass("opened");
    });

    $(".overlay").on("mouseup", function () {
        turnOverlay(false);
        $(".menu__filter").removeClass("active");
        $(".filter").removeClass("opened");
    });

    $(".filter__close").click(function () {
        turnOverlay(false);
        $(".menu__filter").removeClass("active");
        $(".filter").removeClass("opened");
    });

    //NOTE - Фильтры

    $(".filter__head-wrapper").click(function () {
        if (!$(this).find(".filter__show").length) return;

        $(this)
            .closest(".filter__chunk")
            .find(".filter__body")
            .slideToggle(300);
        $(this).toggleClass("opened");
    });

    $(".filter__reset").click(function (e) {
        e.preventDefault();
        $(this).closest(".filter__chunk").find("input").prop("checked", false);
    });

    $(
        ".filter__range .filter__reset, .filter__btns button[type='reset']"
    ).click(function () {
        $(".filter-range").slider("values", [4000, 20000]);
        $(".filter__range-min").text($(".filter-range").slider("values")[0]);
        $(".filter__range-max").text($(".filter-range").slider("values")[1]);
    });

    $(function () {
        $(".filter-range").slider({
            range: true,
            value: 37,
            min: 2000,
            max: 20000,
            step: 100,
            values: [4000, 20000],
            slide: function (event, ui) {
                $(".filter__range-min").text(ui.values[0]);
                $(".filter__range-max").text(ui.values[1]);
            },
        });
    });

    //NOTE - Слайдер истории просмотров

    const historySwiper = new Swiper(".history__slider", {
        spaceBetween: 35,
        loop: true,

        navigation: {
            nextEl: ".history__slider .swiper-button-next",
            prevEl: ".history__slider .swiper-button-prev",
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
