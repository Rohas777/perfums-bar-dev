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
    //NOTE - Слайдер в преимуществ оффере

    const offerAdvantagesSwiper = new Swiper(".offer-advantages__slider", {
        slidesPerView: 1,
        spaceBetween: 40,
        loop: true,
        navigation: {
            nextEl: ".offer-advantages__slider .swiper-button-next",
            prevEl: ".offer-advantages__slider .swiper-button-prev",
        },
    });

    //=include offer-advantage.js

    //NOTE - Слайдер категорий

    const categoriesSwiper = new Swiper(".categories__slider", {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
    });

    //NOTE - Слайдер доп услуг

    const servicesSwiper = new Swiper(".services__slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".services .swiper-pagination",
            clickable: true,
        },
    });
    //=include auth-popup.js

    //NOTE - Функционал блока FAQ

    //NOTE - Массив ответов для FAQ блока

    const answers = [
        "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
        "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
        "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
        "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
        "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
        "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
    ];
    let questions = $(".faq__question"),
        answer = $(".faq__answer");

    $(".faq__answer-mobile").eq(0).slideDown(400);

    questions.click(function () {
        let curQuestion = $(this);
        let index = questions.get().indexOf(this);
        if (
            answer.attr("data-faq-index") == index ||
            questions.hasClass("animating")
        ) {
            return;
        }
        questions.removeClass("active");
        $(this).addClass("active");
        $(this).addClass("animating");

        answer.slideUp(400);
        $(".faq__answer-mobile").slideUp(400);
        setTimeout(function () {
            answer.html(answers[index]).slideDown(600);
            answer.attr("data-faq-index", index);
            curQuestion
                .next(".faq__answer-mobile-wrapper")
                .find(".faq__answer-mobile")
                .html(answers[index])
                .slideDown(600);
        }, 400);
        setTimeout(function () {
            questions.removeClass("animating");
        }, 1000);
    });

    //NOTE - Сброс состояния ошибки у инпутов при вводе

    $("input").on("input", removeInputErrorState);

    //NOTE - Форма подписки в UTP2

    $("#follow").submit(function (e) {
        e.preventDefault();

        const inputs = [
            {
                name: "email",
                elem: $("#follow-email"),
                value: $("#follow-email").val().trim(),
                errorText: "Пожалуйста, укажите ваш Email",
            },
        ];
        console.log(checkForm(inputs));
    });

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

    //NOTE - Слайдер сертификатов

    const certsSwiper = new Swiper(".certs__slider", {
        slidesPerView: 3,
        loop: true,
        navigation: {
            nextEl: ".certs__nav .swiper-button-next",
            prevEl: ".certs__nav .swiper-button-prev",
        },
        pagination: {
            el: ".certs__wrapper .swiper-pagination",
            clickable: true,
        },
    });

    //=include reviews-block.js
});
