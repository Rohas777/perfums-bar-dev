//NOTE - Переключение литража флакона

$(".product-capacity").click(function () {
    if ($(this).hasClass("active") || $(this).hasClass("not-avialable")) {
        return;
    }

    $(this)
        .closest(".product-card-cart__capacity")
        .find(".product-capacity")
        .removeClass("active");
    $(this).addClass("active");
});

//NOTE - Кнопка избранного

$(".fav-button").click(function () {
    $(this).toggleClass("added");
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
    if (productCount === maxCount && $(this).hasClass("counter-control_plus")) {
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
        counterContainer.find(".counter-control_minus").addClass("disabled");
    }
    if (productCount === maxCount) {
        counterContainer.find(".counter-control_plus").addClass("disabled");
    }

    counterContainer.find("span").text(productCount);
});
