$(document).ready(function () {
    console.log($(".topics__wrapper").prop("scrollWidth"));
    console.log($(".topics__wrapper").width());

    function autoScroll() {
        if ($(".topics__wrapper").hasClass("ended")) {
            $(".topics__wrapper").animate(
                { scrollLeft: 0 },
                {
                    duration: 10000,
                    easing: "easeInOutBack",
                    complete: function () {
                        $(".topics__wrapper").removeClass("ended");
                        setTimeout(autoScroll, 2000);
                    },
                }
            );
        } else {
            $(".topics__wrapper").animate(
                {
                    scrollLeft:
                        $(".topics__wrapper").prop("scrollWidth") -
                        $(".topics__wrapper").width(),
                },
                {
                    duration: 10000,
                    easing: "easeInOutQuad",
                    complete: function () {
                        $(".topics__wrapper").addClass("ended");
                        setTimeout(autoScroll, 2000);
                    },
                }
            );
        }
    }

    setTimeout(autoScroll, 5000);

    $(".topics__wrapper").on("mouseover", function () {
        $(".topics__wrapper").stop();
    });
    $(".topics__wrapper").on("mouseleave", function () {
        setTimeout(autoScroll, 5000);
    });
});
