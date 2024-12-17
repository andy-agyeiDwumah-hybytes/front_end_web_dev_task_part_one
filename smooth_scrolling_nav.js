$(function() {
    $("a[href^='#']").click(function (e) {
      // Get target element
      let targetElement = $(this.getAttribute("href"));

      // Check if element exists
      // Use '.length' because target will still exist as an empty jQuery object
      if (targetElement.length) {
        $("html, body").animate(
          {
            scrollTop: targetElement.offset().top, // Get target position and scroll to it
          },
          1000
        );
      }
    })
})