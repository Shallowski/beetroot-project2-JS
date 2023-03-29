$(document).ready(function () {
  let $header = $("header");
  let $nav = $("nav");
  let $navLinks = $(".menu-link");
  let $gridItems = $(".grid-item");
  let $showMoreBtn = $("#show-more-btn");
  let sectionOffsets = {};

  // Hamburger menu
  $(".burger-menu").click(function () {
    $("#menu")
      .stop()
      .slideToggle(300, function () {
        if ($(this).is(":hidden")) {
          $(this).css("display", "");
        } else {
          $(this).css("display", "flex");
        }
      });
    $(this).toggleClass("active");
  });

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
  $navLinks.first().addClass("active");

  $navLinks.each(function () {
    let sectionID = $(this).data("section");
    sectionOffsets[sectionID] = $(sectionID).offset().top;
  });

  $(window).scroll(function () {
    let currentScroll = $(this).scrollTop() + 10;
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
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow:
      '<button type="button" class="slick-next"><img src="assets/image/right-arrow.svg" alt="arrow"></button>',
    prevArrow:
      '<button type="button" class="slick-prev"><img src="assets/image/left-arrow.svg" alt="arrow"></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Show More Button
  $showMoreBtn.click(function () {
    $gridItems.slice(5).toggleClass("hidden");
    $showMoreBtn.prop("text", function (i, text) {
      return text === "SEE MORE" ? "SEE LESS" : "SEE MORE";
    });
  });

  // Navigation scroll
  $(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    let headerHeight = $header.outerHeight();

    $nav.toggleClass("active", scrollTop > --headerHeight);
  });
});
