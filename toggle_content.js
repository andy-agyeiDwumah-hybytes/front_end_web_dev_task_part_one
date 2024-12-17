$(function () {
    const $button = $("#button-container > button");
    $button.click(function() {
        $("#heading-container").slideToggle(900, function () {
            $button.text() === "Show"
              ? $button.text("Hide")
              : $button.text("Show");
        });
    })
})

