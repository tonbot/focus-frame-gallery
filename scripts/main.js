$(document).ready(function () {
  function animateHeading() {
    var $heading = $(".hero-headline h2");
    var text = $heading.text();
    $heading.empty();

    // Split the text into individual letters
    var letters = text.split("");

    // Append each letter with a span element and animate them one by one
    for (var i = 0; i < letters.length; i++) {
      // Create a span element for each letter
      var span = $("<span>").text(letters[i]).css({ opacity: 0 });
      // Append the span to the heading
      $heading.append(span);

      // Animate the opacity of each letter
      span.delay(100 * i).animate({ opacity: 1 }, 200);
    }
  }

  // Call the function to animate the heading on page load
  animateHeading();

  function animateImage() {
    $(".hero-headline-wrapper img")
      .css({ opacity: 0, marginRight: "-100px" })
      .animate({ opacity: 1, marginRight: 0 }, 800);
  }

  // Call the function to animate the image on page load
  animateImage();
  // Function to toggle the 'scrolled' class and animate background color change
  function toggleScrolledClass() {
    var scrollPosition = $(window).scrollTop();
    var heroHeadlineWrapperOffset = $(".hero-headline-wrapper").offset().top;
    var heroWrapperOffset = $(".hero-wrapper").offset().top;

    if (scrollPosition > heroHeadlineWrapperOffset) {
      $(".hero-nav").addClass("scrolled").stop();
    } else {
      $(".hero-nav").removeClass("scrolled").stop();
      animateHeading();
      animateImage();
    }
  }

  // Call the function on page load and scroll
  toggleScrolledClass(); // Call on page load

  var controller = new ScrollMagic.Controller();

  // Create a scene to trigger the animation when the user scrolls to the about container
  var scene = new ScrollMagic.Scene({
    triggerElement: ".about-container",
    triggerHook: 0.8, // Trigger animation when the bottom of the container reaches 80% from the top
    reverse: false, // Don't reverse the animation on scroll up
  })
    .addTo(controller) // Add the scene to the controller
    .on("enter", function () {
      // Animate the about container when it enters the viewport
      gsap.to(".about-container", {
        opacity: 1,
        marginTop: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });

  $(window).scroll(function () {
    toggleScrolledClass(); // Call on scroll
  });

  $(".fa-bars").click(function () {
    gsap.to(".hero-nav nav ul", {
      opacity: 1,
      duration: 0.5,
      onComplete: function () {
        $(".hero-nav nav ul").css("display", "block");
        $(".fa-close").css("display", "inline-block");
        $(".fa-bars").css("display", "none");
      },
    });
  });

  $(".fa-close").click(function () {
    gsap.to(".hero-nav nav ul", {
      opacity: 0,
      duration: 0.5,
      onComplete: function () {
        $(".hero-nav nav ul").css("display", "none");
        $(".fa-bars").css("display", "inline-block");
        $(".fa-close").css("display", "none");
      },
    });
  });
});
