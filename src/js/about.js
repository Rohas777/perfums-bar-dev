$(document).ready(function () {
    //NOTE - Подгонка оригинальных размеров изображений под vw значения

    $(".content img").each(function () {
        let initWidth = $(this).width(),
            viewportWidth = $("body").width(),
            calcWidth = (initWidth / viewportWidth) * 100;

        $(this).css("width", calcWidth + "vw");
    });

    //=include reviews-block.js
});
