$(document).ready(function () {
    //NOTE - Инициализация телефонных масок

    let $telInput = $("[type='tel']");

    $telInput.inputmask({
        mask: "+7 (999) 999 99 99",
        placeholder: "+7 (XXX) XXX XX XX",
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
});
