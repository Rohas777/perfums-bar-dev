$(document).ready(function () {
    //NOTE - Инициализация телефонных масок

    let $telInput = $("[type='tel']");

    $telInput.inputmask({
        mask: "+7 (999) 999 99 99",
        placeholder: "+7 (XXX) XXX XX XX",
    });

    //NOTE - Переключение форм и кнопка "Я не помню пароль"

    $(".auth__form.active").slideDown();

    $(".auth__switch, .auth__signin-reset").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) return;

        const switchType = $(this).attr("data-switch"),
            switchForm = $("#" + switchType);

        $(".auth__switch").not($(this)).removeClass("active");
        $(".auth__form").not(switchForm).slideUp(400).removeClass("active");
        switchForm.slideDown(400).addClass("active");
        $(this).not(".auth__signin-reset").addClass("active");
    });

    //NOTE - Переключение входа по email/телефону

    $(".auth__signin-switch").click(function (e) {
        e.preventDefault();
        const allInputs = $(this).closest(".auth__item").find("input"),
            activeInput = allInputs.filter(".active"),
            hiddenInput = allInputs.not(".active");

        $(".auth__signin-switch").animate(
            {
                opacity: 0,
            },
            150,
            function () {
                $(".auth__signin-switch")
                    .text(activeInput.attr("data-desc"))
                    .animate(
                        {
                            opacity: 1,
                        },
                        150
                    );
            }
        );

        activeInput.removeClass("active");
        hiddenInput.addClass("active");

        $(this)
            .closest("form")
            .attr("data-auth-type", hiddenInput.attr("data-type"));
    });

    //NOTE - Скрыть/показать поле пароля

    $(".show-pass").click(function (e) {
        e.preventDefault();
        const input = $(this).closest(".auth__item").find("input");

        if ($(this).hasClass("hide-pass")) {
            input.attr("type", "password");
        } else {
            input.attr("type", "text");
        }

        $(this).toggleClass("hide-pass");
    });

    //NOTE - Сброс состояния ошибки у инпутов при вводе

    $("input").on("input", removeInputErrorState);

    //NOTE - Форма регистрации

    $("#signup").submit(function (e) {
        e.preventDefault();

        const sex = $(this).find('[name="signup-sex"]:checked').val();
        console.log(sex ? sex : false);

        const inputs = [
            {
                name: "name",
                elem: $("#signup-name"),
                value: $("#signup-name").val().trim(),
                errorText: "Пожалуйста, укажите ваше имя",
            },
            {
                name: "tel",
                elem: $("#signup-tel"),
                value: $("#signup-tel").val().trim(),
                errorText: "Пожалуйста, укажите ваш номер телефона",
            },
            {
                name: "email",
                elem: $("#signup-email"),
                value: $("#signup-email").val().trim(),
                errorText: "Пожалуйста, укажите ваш email",
            },
            {
                name: "sex",
                elem: $(this).find('[name="signup-sex"]'),
                value: sex ? sex : false,
                errorText: "Пожалуйста, укажите ваш пол",
            },
            {
                name: "date",
                elem: $("#signup-date"),
                value: $("#signup-date").val().trim(),
                errorText: "Пожалуйста, укажите дату вашего рождения",
            },
            {
                name: "pass",
                elem: $("#signup-pass"),
                value: $("#signup-pass").val(),
                errorText: "Пожалуйста, укажите пароль",
            },
            {
                name: "pass-repeat",
                elem: $("#signup-pass-repeat"),
                value: $("#signup-pass-repeat").val(),
                errorText: "Пожалуйста, повторите пароль",
            },
        ];

        console.log(checkForm(inputs));
    });

    //NOTE - Форма входа

    $("#signin").submit(function (e) {
        e.preventDefault();

        let inputs;

        if ($(this).attr("data-auth-type") == "tel") {
            inputs = [
                {
                    name: "tel",
                    elem: $("#signin-tel"),
                    value: $("#signin-tel").val().trim(),
                    errorText: "Пожалуйста, укажите ваш номер телефона",
                },
                {
                    name: "pass",
                    elem: $("#signin-pass"),
                    value: $("#signin-pass").val(),
                    errorText: "Пожалуйста, укажите ваш пароль",
                },
            ];
        } else if ($(this).attr("data-auth-type") == "email") {
            inputs = [
                {
                    name: "email",
                    elem: $("#signin-email"),
                    value: $("#signin-email").val().trim(),
                    errorText: "Пожалуйста, укажите ваш eamil",
                },
                {
                    name: "pass",
                    elem: $("#signin-pass"),
                    value: $("#signin-pass").val(),
                    errorText: "Пожалуйста, укажите ваш пароль",
                },
            ];
        }
        console.log(checkForm(inputs));
    });
    //NOTE - Форма сброса пароля

    $("#reset-pass").submit(function (e) {
        e.preventDefault();

        const inputs = [
            {
                name: "email",
                elem: $("#reset-pass-email"),
                value: $("#reset-pass-email").val().trim(),
                errorText: "Пожалуйста, укажите ваш email",
            },
        ];
        console.log(checkForm(inputs));
    });

    //NOTE - Сброс состояния выбора пола

    $("[name='signup-sex']").click(function () {
        $("[name='signup-sex']").removeClass("error");
    });
});
