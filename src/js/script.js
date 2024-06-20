//NOTE - Функция переключения скролла

function switchScroll(item = $("html, body")) {
    if (item.hasClass("hidden")) {
        item.removeClass("hidden");
    } else {
        item.addClass("hidden");
    }
}

//NOTE - Функция валидации Email'а

function validateEmail(email) {
    var re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}

//NOTE - Функция валидации пароля

function validatePassword(password) {
    // Регулярное выражение для проверки:
    // - Минимум одна буква: [a-zA-Z]
    // - Минимум одна цифра: \d
    // - Минимум 8 символов:.{8,}
    // - Минимум одна заглавная буква: [A-Z]
    // - Только латинские символы: [a-zA-Z\d]
    var regex = /^[a-zA-Z\d]{8,}$/;

    return regex.test(password);
}

//NOTE - Функция валидации повтора пароля

function validatePasswordRepeat(input, password) {
    const passOriginal = input.closest("form").find(".original-pass");

    return password === passOriginal.val();
}

//NOTE - Функция валидации даты

function validateBirthDate(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);

    // Проверяем, что дата существует и не превышает сегодняшнюю дату
    if (isNaN(birthDate.getTime()) || birthDate > today) {
        return false;
    }

    // Вычисляем разницу в годах
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    // Учитываем разницу в месяцах, учитывая, что месяцы считаются с нуля
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Проверяем, что возраст не превышает 80 лет
    if (age <= 80) {
        return true;
    } else {
        return false;
    }
}

//NOTE - Функция вызыва сообщения об ошибке

function showMessage(elem, text, isPayment) {
    if (isPayment) {
        elem.addClass("error").text(text);
        return;
    }

    if (!elem.hasClass("error")) {
        elem.addClass("error").text(text).slideDown(300);
        return;
    }
    elem.slideUp(300);
    setTimeout(function () {
        elem.text(text).slideDown(300);
    }, 300);
}

//NOTE - Функция проверки инпута для вывода сообщения

function checkInputForMessage(input, inputVal, errorText, isPayment) {
    const messageWrapper = input.closest(".message-wrapper");
    const message = messageWrapper.find(".message");
    if (!inputVal) {
        showMessage(message, errorText, isPayment);
        return false;
    }
    if (input.attr("data-type") == "email" && !validateEmail(inputVal)) {
        showMessage(message, "Пожалуйста, введите корректный Email", isPayment);
        return false;
    }
    if (
        input.attr("data-type") == "signup-pass" &&
        !validatePassword(inputVal)
    ) {
        showMessage(
            message,
            "Пожалуйста, введите корректный пароль",
            isPayment
        );
        return false;
    }
    if (
        input.attr("data-type") == "signup-pass-repeat" &&
        !validatePasswordRepeat(input, inputVal)
    ) {
        showMessage(message, "Пароли должны совпадать", isPayment);
        return false;
    }
    if (input.attr("data-type") == "birth" && !validateBirthDate(inputVal)) {
        showMessage(
            message,
            "Пожалуйста, введите корректную дату рождения",
            isPayment
        );
        return false;
    }
    if (input.attr("data-type") == "tel" && !input.inputmask("isComplete")) {
        showMessage(
            message,
            "Пожалуйста, введите корректный номер телефона",
            isPayment
        );
        return false;
    }

    return true;
}

//NOTE - Функция проверки инпута для изменения состояния intime

function checkIntimeInput(
    input,
    inputVal,
    errorText = "Вам необходимо корректно заполнить поля",
    isPayment
) {
    const messageWrapper = input.closest(".message-wrapper");
    const message = messageWrapper.find(".message");

    if (!inputVal) {
        input.addClass("error");
        messageWrapper.addClass("error");
    }
    if (input.attr("data-type") == "tel" && !input.inputmask("isComplete")) {
        input.addClass("error");
        messageWrapper.addClass("error");
    }
    if (input.attr("data-type") == "email" && !validateEmail(inputVal)) {
        input.addClass("error");
        messageWrapper.addClass("error");
    }

    if (!checkInputForMessage(input, inputVal, errorText, isPayment))
        return false;

    input.removeClass("error");
    messageWrapper.removeClass("error");
    message.removeClass("error");
    return inputVal;
}

//NOTE - Функция проверки инпута для изменения состояния

function checkInput(
    input,
    inputVal,
    errorText = "Вам необходимо корректно заполнить поля",
    isPayment
) {
    const messageWrapper = input.closest(".message-wrapper");
    const message = messageWrapper.find(".message");

    if (input.attr("data-type") == "tel" && !input.inputmask("isComplete")) {
        input.addClass("error");
        messageWrapper.addClass("error");
    }
    if (!inputVal) {
        input.addClass("error");
        messageWrapper.addClass("error");
    }
    if (input.attr("data-type") == "email" && !validateEmail(inputVal)) {
        input.addClass("error");
        messageWrapper.addClass("error");
    }
    if (
        input.attr("data-type") == "signup-pass" &&
        !validatePassword(inputVal)
    ) {
        input.addClass("error");
        messageWrapper.addClass("error");
    }
    if (
        input.attr("data-type") == "signup-pass-repeat" &&
        !validatePasswordRepeat(input, inputVal)
    ) {
        input.addClass("error");
        messageWrapper.addClass("error");
    }
    if (input.attr("data-type") == "birth" && !validateBirthDate(inputVal)) {
        input.addClass("error");
        messageWrapper.addClass("error");
    }
    if (message.hasClass("error")) {
        return;
    }

    if (!checkInputForMessage(input, inputVal, errorText, isPayment))
        return false;

    input.removeClass("error");
    messageWrapper.removeClass("error");
    message.removeClass("error").slideUp(300);
    return inputVal;
}

//NOTE - Функция сброса состояния ошибки у текущего инпута

function removeInputErrorState() {
    $(this).removeClass("error");
    $(this)
        .closest(".message-wrapper")
        .removeClass("error")
        .find(".message")
        .removeClass("error")
        .slideUp(300);
}

//NOTE - Функция сброса состояния ошибки у текущего инпута формы оплаты

function removeInputErrorStatePayment() {
    const input = $(this),
        inputVal = input.val().trim();
    let check = checkIntimeInput(
        input,
        inputVal,
        "Вам необходимо корректно заполнить это поле",
        true
    );

    if (check) {
        $(this).removeClass("error").addClass("success");
        $(this)
            .closest(".message-wrapper")
            .removeClass("error")
            .addClass("success")
            .find(".message")
            .text("Успешно")
            .removeClass("error")
            .addClass("success");
    } else {
        $(this).removeClass("error").addClass("success");
        $(this)
            .closest(".message-wrapper")
            .removeClass("success")
            .addClass("error")
            .find(".message")
            .removeClass("success")
            .addClass("error");
    }
}

//NOTE - Функция проверки формы

function checkForm(inputs, isPayment = false) {
    let response = {};

    inputs.forEach((input) => {
        response[input.name] = checkInput(
            input.elem,
            input.value,
            input.errorText,
            isPayment
        );
    });
    for (let elem in response) {
        if (!response[elem]) {
            return false;
        }
    }

    return response;
}

//NOTE - Включение/выключение оверлея

function turnOverlay(turn) {
    if (turn) {
        $("body, html").addClass("hidden");
        $(".overlay").fadeIn(300);
        return;
    }

    $("body, html").removeClass("hidden");
    $(".overlay").fadeOut(300);
}

$(document).ready(function () {
    $(".header__burger").click(function () {
        $(this).toggleClass("active");
        $(".header__nav").slideToggle(500);
        switchScroll();
    });
});
