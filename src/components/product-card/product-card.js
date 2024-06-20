//NOTE - Переключение литража флакона

$(".product-card__capacity-item").click(function () {
    if ($(this).hasClass("active") || $(this).hasClass("not-avialable")) {
        return;
    }

    $(this)
        .closest(".product-card__capacity")
        .find(".product-card__capacity-item")
        .removeClass("active");
    $(this).addClass("active");
});

$(".fav-button").click(function () {
    $(this).toggleClass("added");
});
