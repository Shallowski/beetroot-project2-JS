
$(document).ready(function () {
  // Slider
  $(".slider").slick({
    autoplay: true,
    dots: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  });

  // Navigation
  let $navLinks = $(".menu-link");
  $navLinks.first().addClass("active");
  let sectionOffsets = {};

  $navLinks.each(function () {
    let sectionID = $(this).data("section");
    sectionOffsets[sectionID] = $(sectionID).offset().top;
  });

  $(window).scroll(function () {
    let currentScroll = $(this).scrollTop() + 1;
    let $currentSection;

    for (let section in sectionOffsets) {
      if (sectionOffsets[section] <= currentScroll) {
        $currentSection = $(section);
      }
    }

    let $currentLink = $(
      'a.menu-link[data-section="#' + $currentSection.attr("id") + '"]'
    );
    $navLinks.removeClass("active");
    $currentLink.addClass("active");
  });

  // News Slider
  $(".news__slider").slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow:
      '<button type="button" class="slick-next"><img src="assets/image/right-arrow.svg" alt="arrow"></button>',
    prevArrow:
      '<button type="button" class="slick-prev"><img src="assets/image/left-arrow.svg" alt="arrow"></button>',
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Grid Items
  $(".grid-item").on("click contextmenu", function (event) {
    event.preventDefault();

    if (
      event.type === "click" &&
      event.target.tagName.toLowerCase() === "img"
    ) {
      $(this).find("img").toggleClass("fullscreen");
    } else {
      $(".grid-item img").removeClass("fullscreen");
    }

    $(".overlay").css(
      "display",
      $(".grid-item img.fullscreen").length > 0 ? "block" : "none"
    );
  });

  $(document).keyup(function (event) {
    if (event.keyCode === 27) {
      $(".grid-item img").removeClass("fullscreen");
      $(".overlay").css("display", "none");
    }
  });

  // Show More Button
  let showMoreBtn = $("#show-more-btn");
  let gridItems = $(".grid-item");

  showMoreBtn.click(function () {
    gridItems.each(function (index) {
      if (index >= 5) {
        $(this).toggleClass("hidden");
      }
    });

    showMoreBtn.text(
      showMoreBtn.text() === "SEE MORE" ? "SEE LESS" : "SEE MORE"
    );
  });
});
