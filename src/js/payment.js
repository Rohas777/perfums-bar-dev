function turnPaymentPopup(popup, turn) {
    if (turn) {
        popup.fadeIn(400).addClass("active");
        switchScroll();
        return;
    }

    popup.fadeOut(600);
    popup.removeClass("active");
    switchScroll();
}

$(document).ready(function () {
    //NOTE - Инициализация телефонных масок

    let $telInput = $("[type='tel']");

    $telInput.inputmask({
        mask: "+7 (999) 999 99 99",
        placeholder: "+7 (XXX) XXX XX XX",
    });

    //NOTE - Сброс состояния ошибки у инпутов при вводе

    $("input").on("input", removeInputErrorStatePayment);

    $(".payment__marker").hover(function () {
        if (
            !$(this).closest(".message-wrapper").hasClass("success") &&
            !$(this).closest(".message-wrapper").hasClass("error")
        )
            return;

        $(this).find(".message").fadeToggle(400);
    });

    //NOTE - Форма оплаты

    $("#paymentForm").submit(function (e) {
        e.preventDefault();

        const inputs = [
            {
                name: "name",
                elem: $("#paymentName"),
                value: $("#paymentName").val().trim(),
                errorText: "Пожалуйста, укажите ваше имя",
            },
            {
                name: "surname",
                elem: $("#paymentSurname"),
                value: $("#paymentSurname").val().trim(),
                errorText: "Пожалуйста, укажите вашу фамилию",
            },
            {
                name: "middlename",
                elem: $("#paymentMiddlename"),
                value: $("#paymentMiddlename").val().trim(),
                errorText: "Пожалуйста, укажите ваше отчество",
            },
            {
                name: "tel",
                elem: $("#paymentTel"),
                value: $("#paymentTel").val().trim(),
                errorText: "Пожалуйста, укажите ваш телефон",
            },
            {
                name: "email",
                elem: $("#paymentEmail"),
                value: $("#paymentEmail").val().trim(),
                errorText: "Пожалуйста, укажите ваш eamil",
            },
            {
                name: "region",
                elem: $("#paymentRegion"),
                value: $("#paymentRegion").val().trim(),
                errorText: "Пожалуйста, укажите вашу страну/регион",
            },
            {
                name: "address",
                elem: $("#paymentAddress"),
                value: $("#paymentAddress").val().trim(),
                errorText: "Пожалуйста, укажите ваш адрес",
            },
        ];

        let check = checkForm(inputs, true);
        let paymentType = $("[name='paymentType']:checked").attr("id");

        console.log(check);

        if (!check) return;

        console.log(paymentType);

        switch (paymentType) {
            case "paymentQr":
                turnPaymentPopup($(".qr-popup"), true);
                break;
            // case "paymentOnline":
            //     break;
            // case "paymentSbp":
            //     break;
            default:
                turnPaymentPopup($(".success-popup"), true);
        }
    });

    $("[name='paymentType']").change(function () {
        $(".payment__btns [type='submit']").text($(this).val());
    });

    $(document).on("mouseup", function (e) {
        let popup = $(".payment-popup.active");

        if (
            !popup.find(".payment-popup__wrapper").is(e.target) &&
            !popup.find(".payment-popup__wrapper").find(e.target).length &&
            popup.hasClass("active")
        ) {
            turnPaymentPopup(popup, false);
        }
    });
    $(".payment-popup__close").click(function (e) {
        turnPaymentPopup($(this).closest(".payment-popup"), false);
    });
});
