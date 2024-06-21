$(document).ready(function () {
    //NOTE - Инициализация телефонных масок

    let $telInput = $("[type='tel']");

    $telInput.inputmask({
        mask: "+7 (999) 999 99 99",
        placeholder: "+7 (XXX) XXX XX XX",
    });

    //NOTE - Инициализация галлерей

    Fancybox.bind("[data-fancybox]", {});

    //NOTE - Слайдер в оффере

    const offerSwiper = new Swiper(".offer__slider", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
        },

        navigation: {
            nextEl: ".offer__slider .swiper-button-next",
            prevEl: ".offer__slider .swiper-button-prev",
        },
        pagination: {
            el: ".offer__slider .swiper-pagination",
            clickable: true,
        },
    });

    //NOTE - Кнопка для скролла на следующий блок

    $(".slide-down").click(function () {
        const scrollTarget = $(this)
            .closest("section")
            .next("section")
            .offset().top;

        let offset = parseFloat(
            window
                .getComputedStyle(document.documentElement)
                .getPropertyValue("--header-height")
                .trim()
        );

        console.log(offset);

        $("body, html").animate(
            {
                scrollTop: scrollTarget - offset,
            },
            "slow"
        );
    });

    //NOTE - Сброс состояния ошибки у инпутов при вводе

    $("input").on("input", removeInputErrorState);

    //NOTE - Форма заявки вопроса в UTP2

    $("#feedback").submit(function (e) {
        e.preventDefault();

        const inputs = [
            {
                name: "name",
                elem: $("#feedback-name"),
                value: $("#feedback-name").val().trim(),
                errorText: "Пожалуйста, укажите ваше имя",
            },
            {
                name: "tel",
                elem: $("#feedback-tel"),
                value: $("#feedback-tel").val().trim(),
            },
        ];

        console.log(checkForm(inputs));
    });

    //NOTE - Слайдер в мобильной верссии блока аудитории

    const audienceSwiper = new Swiper(".audience__slider", {
        slidesPerView: 1,
        spaceBetween: 230,
        loop: true,
        autoplay: {
            delay: 5000,
        },

        navigation: {
            nextEl: ".audience .swiper-button-next",
            prevEl: ".audience .swiper-button-prev",
        },
        pagination: {
            el: ".audience__slider .swiper-pagination",
            clickable: true,
        },
    });

    //NOTE - Слайдер магазинов

    const storesSwiper = new Swiper(".stores__slider", {
        loop: true,
        autoplay: {
            delay: 5000,
        },

        navigation: {
            nextEl: ".stores__swiper-container .swiper-button-next",
            prevEl: ".stores__swiper-container .swiper-button-prev",
        },
        pagination: {
            el: ".stores__swiper-container .swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            0: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            993: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },
    });
});
