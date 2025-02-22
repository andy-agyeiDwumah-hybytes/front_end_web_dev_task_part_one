$(function () {
    $("button[data-filter]").click(function () {
        // Get data filter type
        const filter = $(this).data("filter");

        // Loop through all image posters
        $("#grid-container > div").each(function () {
            // Get category
            const category = $(this).data("category");

            // Show all image posters when user clicks 'all'
            // OR show matching category
            if (filter === "all" || category === filter) {
                $(this).fadeIn(2000);
            } else {
                $(this).fadeOut();
            }
        })

        // Enable other buttons
        $(`button[data-filter]:not(${filter})`).attr("disabled", false).removeClass("active");
        // Disable clicked on button
        $(this).attr("disabled", true).addClass("active");
    })
})