window.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.services .item-cover');
  let resizeTimer;

  const handleScrollAndResize = () => {
    const viewportCenterY = window.innerHeight / 2;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      if (window.innerWidth <= 575.98 && Math.abs(centerY - viewportCenterY) < rect.height / 2) {
        item.classList.add('toggled');
      } else {
        item.classList.remove('toggled');
      }
    });
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedScrollAndResize = debounce(handleScrollAndResize, 50);

  window.addEventListener('scroll', debouncedScrollAndResize);
  window.addEventListener('resize', debouncedScrollAndResize);

  handleScrollAndResize(); // Call once to initialize state
});

$(document).ready(function() {
  if ($(window).width() > 1200) {
    $('.navbar .dropdown ul').mouseenter(function() {
      $(this).css('transition-delay', '0s');
    }).mouseleave(function() {
      var $ul = $(this);
      $ul.css('transition-delay', '300ms');
      setTimeout(function() {
        $ul.css('transition-delay', '0s');
      }, 300);
    });
  }
});

$(document).ready(function () {
  var lineHidden = true; // Initially, the line is hidden
  var originalGradientColors = [];

  $(window).scroll(function () {
    // Store the original colors of the gradients
    $("#GradientColor stop").each(function () {
      originalGradientColors.push($(this).attr("stop-color"));
    });

    var scrollDistance = $(window).scrollTop(); // Add 1 to the scroll distance
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();
    var scrollPercentage =
      (scrollDistance / (documentHeight - windowHeight)) * 100;

    if (scrollPercentage >= 25 && lineHidden) {
      $(".back-to-top")
        .css("opacity", "1")
        .css("transition", "opacity 0.3s ease");
      lineHidden = false; 
    } else if (scrollPercentage < 25 && !lineHidden) {
      $(".back-to-top")
        .css("opacity", "0")
        .css("transition", "opacity 0.3s ease");
      lineHidden = true;
    }

    var offset = 440 - scrollPercentage * 1.4;
    $(".scroll-line").css("stroke-dashoffset", offset);

    if (offset <= 302) {

      $(".back-to-top .outer")
        .css("background-color", "#0095CD")
        .css("border-color", "#0095CD")
        .css("transition", "background-color 2s ease, border-color 2s ease");
      $(".back-to-top span svg").css(
        "fill",
        "#fff",
        "transition",
        "fill 0.3s ease"
      );
      $("#GradientColor stop").css({
        "stop-color": "#0095CD",
        transition: "stop-color 0.3s ease",
      });
    } else {
      $(".back-to-top .outer")
        .css("background-color", "#fff")
        .css("border-color", "#D0ECFC");
      $(".back-to-top span svg").css("fill", "#0095CD");

      // Store the original colors of the gradients
      $("#GradientColor stop").each(function () {
        originalGradientColors.push($(this).attr("stop-color"));
      });
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var cookieBanner = document.querySelector(".cookie-banner");
  var acceptCookieBtn = document.querySelector(".accept-cookie-btn");
  var closeErrorBtn = document.querySelector(".close-error-btn");
  var startMassage = document.querySelector(".start-message");
  var errorMessage = document.querySelector(".error-message");

  if (cookieBanner && getCookie("cookieAccepted")) {
    cookieBanner.style.display = "none";
  }

  if (acceptCookieBtn) {
    acceptCookieBtn.addEventListener("click", function () {
      setCookie("cookieAccepted", "true", 30);

      if (cookieBanner) {
        cookieBanner.style.transform = "translateX(10%)";
        setTimeout(function () {
          cookieBanner.style.transform = "translateX(-100%)";

          setTimeout(function () {
            if (getCookie("cookieAccepted")) {
              cookieBanner.style.display = "none";
            } else {
              if (cookieBanner) {
                cookieBanner.classList.add("error");
                startMassage.style.display = "none";
                errorMessage.style.display = "flex";
                document
                  .querySelector(".cookie img")
                  .setAttribute(
                    "src",
                    "./assets/img/main/icon_cookie_error.png"
                  );
                cookieBanner.style.transform = "translateX(0%)";
              }
            }
          }, 300);
        }, 300);
      }
    });
  }

  if (closeErrorBtn) {
    closeErrorBtn.addEventListener("click", function () {
      cookieBanner.style.transform = "translateX(10%)";
      setTimeout(function () {
        cookieBanner.style.transform = "translateX(-100%)";
        setTimeout(function () {
          cookieBanner.style.display = "none";
        }, 300);
      }, 300);
    });
  }

  function setCookie(name, value, days) {
    return new Promise(function (resolve, reject) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
      resolve();
    });
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }


 
});



document.addEventListener("DOMContentLoaded", function () {
  const prevButton = document.querySelector(".clients .swiper-button-prev");
  const nextButton = document.querySelector(".clients .swiper-button-next");
  const hexagon = document.querySelector(".clients .hexagon");

  // Function to change background color of hexagon
  function changeHexagonColor(color) {
    hexagon.style.transition = "background-color 0.3s"; //
    hexagon.style.backgroundColor = "#e3eef9"; //
    setTimeout(() => {
      hexagon.style.backgroundColor = color; // Change color to the specified color after a delay
      setTimeout(revertHexagonColor, 500); // Revert the color after 500 milliseconds
    }, 500); // Delay in milliseconds (same as transition duration)
  }

  // Event listener for prev and next button click
  function handleButtonClick() {
    changeHexagonColor("#0095CD"); // Change color to blue on button click
  }

  // Add event listener for hexagon click if hexagon exists
  if (hexagon) {
    hexagon.addEventListener("click", () => {
      changeHexagonColor("#0095CD"); // Change color to white on hexagon click
    });
  }

  // Add event listeners for prev and next buttons if they exist
  if (prevButton) {
    prevButton.addEventListener("click", handleButtonClick);
  }
  if (nextButton) {
    nextButton.addEventListener("click", handleButtonClick);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      this.classList.toggle("rotate");
    });
  });
});


function addSmallerClass() {

  // Check if screen width is below the threshold
  if ( window.innerWidth < 767.98) {
    // Add the smaller class to all elements with class .play-btn
      $('.play-btn').addClass('smaller');
  } else {
      // Remove the smaller class from all elements with class .play-btn
      $('.play-btn').removeClass('smaller');

      // Check if isBigScreen is true and elements are inside div with class col-6 or col-md-6
      if ( window.innerWidth > 576) {
          $('.col-6 .play-btn, .col-md-6 .play-btn').addClass('smaller');
      }
  }
}


window.onload = window.onresize = function () {
  //nav
  var screenWidth = window.innerWidth;
  var navBar = document.querySelector(".navbar");
  var navList = navBar.querySelector("ul");
  


  function changeTextOnSmallDevices() {
    var screenWidth = window.innerWidth;
    var textElement = document.querySelector(".last-row-text");

    if (textElement != null) {
      if (screenWidth < 768) {
        textElement.innerText = "©️ 2023 «ProgramWeb».";
      } else {
        textElement.innerHTML =
          '<a href="">Пользователькое соглашение</a> ' +
          '<span> | </span>' +
          '<a href="">Политика в области обработки и защиты персональных данных</a>';
      }
    }
  }

  // Call the function on window resize
  changeTextOnSmallDevices();

  var hexagonLines = document.querySelectorAll(
    ".timeline .hexagon-container img"
  );

  for (var i = 0; i < hexagonLines.length; i++) {
    if (window.innerWidth < 767.98) {
      hexagonLines[i].style.display = "none";
    } else {
      hexagonLines[i].style.display = "unset";
    }
  }

  /* design-details */




  addSmallerClass();


  const form = document.querySelector('#FormContact.bg-white');

  // Function to create and append left column
  function createLeftColumn() {
      const leftCol = document.createElement('div');
      leftCol.classList.add('left-col-md');

      // Move input elements, form notice, and button to left column
      const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
      const formNotice = form.querySelector('.form-notice');
      const button = form.querySelector('button[type="submit"]');
      inputs.forEach(input => leftCol.appendChild(input));
      leftCol.appendChild(formNotice);
      leftCol.appendChild(button);

      // Append left column before the form check
      form.insertBefore(leftCol, form.querySelector('.form-check'));
  }

  // Function to create and append right column
  function createRightColumn() {
      const rightCol = document.createElement('div');
      rightCol.classList.add('right-col-md');

      // Move textarea and file container to right column
      const textarea = form.querySelector('textarea');
      const fileContainer = form.querySelector('.file-container');
      rightCol.appendChild(textarea);
      rightCol.appendChild(fileContainer);

      // Append right column after the left column
      form.insertBefore(rightCol, form.querySelector('.form-check'));
  }
  if (form) {
  if (window.innerWidth >= 576 && window.innerWidth <= 991.98) {
      // If left and right columns don't exist, create them
      if (!form.querySelector('.left-col-md') && !form.querySelector('.right-col-md')) {
          createLeftColumn();
          createRightColumn();
      }
  } else {
      // If screen width is outside the range, restore the original form structure
     
        const leftCol = form.querySelector('.left-col-md');
        const rightCol = form.querySelector('.right-col-md');
        if (leftCol && rightCol) {
          // Move elements back to their original positions
          const formCheck = form.querySelector(".form-check");
          const inputs = leftCol.querySelectorAll('input');
          const formNotice = leftCol.querySelector('.form-notice');
          const button = leftCol.querySelector('button');
          inputs.forEach(input => form.insertBefore(input, leftCol));
          form.insertBefore(formNotice, leftCol);
          form.insertBefore(button, rightCol);
          form.insertBefore(button, formCheck);

          const textarea = rightCol.querySelector('textarea');
          const fileContainer = rightCol.querySelector('.file-container');
          form.insertBefore(textarea, rightCol);
          form.insertBefore(fileContainer, rightCol);

          
          // Remove the left and right columns
          leftCol.remove();
          rightCol.remove();
      }
    }
  }

  const maxLength = 140;
  const paragraphMain = document.querySelectorAll(".slider.news-cards p");

  paragraphMain.forEach(paragraph => {
    if (!paragraph.hasAttribute('data-original-text')) {
      paragraph.setAttribute('data-original-text', paragraph.innerText);
    }

    const originalText = paragraph.getAttribute('data-original-text');
    paragraph.innerText = originalText;
      if (originalText.length > 155) {
        const truncatedText = originalText.substring(0, 155) + "...";
        paragraph.innerText = truncatedText;
      } else {
        paragraph.innerText = originalText;
      }
  });

  const sliderParagrphsPics = document.querySelectorAll(".slider.news-cards p");
  sliderParagrphsPics.forEach(paragraph => {
    if (!paragraph.dataset.truncated) {
      if (paragraph.textContent.length > 155) {
        paragraph.textContent = paragraph.textContent.slice(0, 155) + '...';
        paragraph.dataset.truncated = 'true';
      }
    }
  });
  
};

(function () {
  "use strict";

 

  // Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  // Easy event listener function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  // Easy on scroll event listener
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select(".navbar", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Header fixed top on scroll
   */
  const selectHeader = document.querySelector("header");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("sticked");
        if (nextElement) nextElement.classList.add("sticked-header-offset");
      } else {
        selectHeader.classList.remove("sticked");
        if (nextElement) nextElement.classList.remove("sticked-header-offset");
      }
    };
    window.addEventListener("load", headerFixed);
    document.addEventListener("scroll", headerFixed);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
  }
  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector(".mobile-nav-show");
  const mobileNavHide = document.querySelector(".mobile-nav-hide");
  let navbar = select(".navbar");

  document.querySelectorAll(".mobile-nav-toggle").forEach((el) => {
    el.addEventListener("click", function (event) {
      navbar.classList.toggle("navbar-mobile");

      event.preventDefault();
      mobileNavToogle();
    });
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }


  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  new PureCounter();
})();

document.body.addEventListener("click", function (event) {
  const target = event.target;
  const dropdownTrigger = target.closest(".dropdown > a");
  let newElement = document.createElement("span");

  if (
    dropdownTrigger &&
    (target || target.tagName.toLowerCase() === "span")
  ) {
    if (document.querySelector(".mobile-nav-active")) {
      event.preventDefault();
      dropdownTrigger.classList.toggle("active");
      dropdownTrigger.nextElementSibling.classList.toggle("dropdown-active");
    }
  }

  // Check if navbar parent lost its 'active' class
  const parentNavLink = document.querySelector(".nav-link.active");
  if (!parentNavLink) {
    // Remove 'active' class from all links with class 'active' inside dropdowns
    const linksWithActiveClass = document.querySelectorAll("a.active");
    linksWithActiveClass.forEach((link) => {
      link.classList.remove("active");
    });

    // Remove 'dropdown-active' class from ul.deep-dropdown
    const deepDropdown = document.querySelector(".deep-dropdown");
    if (deepDropdown && deepDropdown.classList.contains("dropdown-active")) {
      deepDropdown.classList.remove("dropdown-active");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  var tariffsSwiper = new Swiper(".tariffs .swiper-container", {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    watchSlidesProgress: true,
    initialSlide: 1,
    a11y: false,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 768px
      0: {
        slidesPerView: 1,
      },
      768: {
          slidesPerView: 2,
  
          centeredSlides: true,
 


      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
  tariffsSwiper.autoplay.stop();


  var mySwiper = new Swiper(".clients-slider", {
    speed: 600,
    pause: true,
    watchSlidesProgress: true,

    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });

  var articlePic = new Swiper(".news-cards .swiper", {
    watchSlidesProgress: true,
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        spaceBetween: 0,
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      }
    },
  });

  articlePic.autoplay.stop();
});



document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  var tariffsSwiper = new Swiper(".pages-swiper .swiper-container", {
    // Optional parameters
    spaceBetween: 30,

    loop: true,
    watchSlidesProgress: true,


    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      // when window width is >= 768px
      0: {
        slidesPerView: 2,

        centeredSlides: true,

      },
      768: {
        slidesPerView: 4,
        centeredSlides: false,

      },
      992: {
        slidesPerView: 4,
      },
    },

    
  });

  tariffsSwiper.autoplay.stop();
});

$(document).ready(function () {
  // Apply input mask
  $(".tel").inputmask({
    mask: "+7 (999) 999-99-99",
    placeholder: "+7 (___) ___-__-__",
    showMaskOnHover: false,
    showMaskOnFocus: true,
    onBeforePaste: function (pastedValue, opts) {
      // Format pasted value to match mask
      return pastedValue.replace(/^7|\D/g, "");
    },
  });

  $(".name").on("input", function() {
    const text = $(this).val().trim(); // Get the trimmed value
    let formattedText = "";
  
    if (text.length) {
      // Loop through characters and check for allowed ones (letters and spaces)
      for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        const charCode = char.charCodeAt(0);
  
        // Check if character is a letter (a-z or A-Z) or a space
        if (
          (charCode >= 65 && charCode <= 90) ||        // English uppercase letters
          (charCode >= 97 && charCode <= 122) ||       // English lowercase letters
          (charCode >= 1040 && charCode <= 1103) ||    // Russian letters (uppercase and lowercase)
          char === " "                                 // Space
      ) {
          formattedText += char;
      }
      }
  
      // Capitalize the first letter and characters after spaces
      formattedText = formattedText.replace(/(^|\s)\S/g, function(match) {
        return match.toUpperCase();
    });
    }
  
    // Only update the input value if necessary
    if (text !== formattedText) {
      $(this).val(formattedText);
    }
  });


});

const timelines = document.querySelectorAll(".timeline");
const hexagons = document.querySelectorAll(".timeline .hexagon");
const descriptions = document.querySelectorAll(".description");
const animationDuration = 1500;
const initialWait = 1500;

async function animateTimeline() {
  await new Promise((resolve) => setTimeout(resolve, initialWait));

  for (let index = 0; index < timelines.length; index++) {
    const currentHexagon = hexagons[index];
    const currentTimeline = timelines[index];
    const currentDescription = descriptions[index];

    currentHexagon.classList.add("current");

    currentTimeline.querySelector(".description").style.color = "#0095cd";
    currentDescription.style.fontSize =
      window.innerWidth < 991.98 ? "14px" : "18px";

    await new Promise((resolve) => setTimeout(resolve, animationDuration));
  }

  resetColors();
  animateTimeline();
}

function resetColors() {
  hexagons.forEach((hexagon) => {
    hexagon.classList.remove("current");
  });
  descriptions.forEach((description) => {
    description.style.color = "#474C51";
    description.style.fontSize = window.innerWidth < 991.98 ? "12px" : "15px";
  });
  timelines.forEach((timeline) => {
    timeline.querySelector(".description").style.color = "#474C51";
  });
}

// Start the animation
animateTimeline(0);



//Form Popup
document.addEventListener("DOMContentLoaded", function () {
  const formPopup = document.querySelector(".form-popup");
  var formHeaderContainer = formPopup.querySelector(".form-header-container > div");
  var contactParagraph = formHeaderContainer.querySelector(".contact-p");


  const overlay = document.getElementById("overlay");
  const getCallElements = document.querySelectorAll(".js-open-form");
  const closeBtn = document.querySelector(".close");

  getCallElements.forEach(function (btnGetStarted) {
    btnGetStarted.addEventListener("click", function () {
      const existingTitle = document.querySelector(".form-popup h5");
      if (existingTitle) {
        existingTitle.remove();
      }

      const formTitle = document.createElement("h5");
      formTitle.classList.add("text-start");
      formHeaderContainer.insertBefore(formTitle, formHeaderContainer.firstChild);
      const contantParagraph = formPopup.querySelector("#contantParagraph");

      formTitle.textContent = btnGetStarted.getAttribute("data-title");

      const swiperSlide = btnGetStarted.closest(".swiper-slide");
      const isInsideTariffsSection = btnGetStarted.closest(".tariffs") !== null;

      if (isInsideTariffsSection && swiperSlide) {
        const h5Element = swiperSlide.querySelector("h5[data-tarif]");
        if (h5Element) {
          formTitle.textContent = h5Element.getAttribute("data-tarif");
          contantParagraph.textContent = "Тариф выбран, заполните форму и с вами свяжется менеджер";
        }
      } else {
        contantParagraph.textContent = "Заполните форму и с вами свяжется менеджер";
      }   
      formPopup.style.display = "block";
      overlay.style.display = "block";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      formPopup.classList.add("animate-fade-in");
    });
  });

  // Function to close the modal
  function closeFormPopup() {
    formPopup.classList.remove("animate-fade-in");
    formPopup.classList.add("animate-fade-out");
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";

    setTimeout(function () {
      formPopup.style.display = "none";
      overlay.style.display = "none";
      formPopup.classList.remove("animate-fade-out");
    }, 300);
  }

  // Event listener for close button click
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closeFormPopup();
    });
  }

  // Event listener to close modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target == overlay) {
      closeFormPopup();
    }
  };
});

//form


// rows limit
function isScrollable(el) {
  return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
}
const MAX_ROW = 3;
const textarea = document.getElementById("my-textarea");
if (textarea != null) {
  textarea.addEventListener("input", (e) => {
    const el = e.target;
    if (isScrollable(el) && MAX_ROW > el.rows) {
      el.rows = el.rows + 1;
    }
    if (!el.value) {
      el.rows = 1;
    }
  });
}

/* slide button */
function addClass(element) {
  element.classList.add("btn-normal");
}

function removeClass(element) {
  element.classList.remove("btn-normal");
}

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          // Add shake animation to invalid input fields
          const invalidInputs = form.querySelectorAll(":invalid");
          invalidInputs.forEach((input) => {
            input.classList.add("shake");
            input.addEventListener("animationend", () => {
              input.classList.remove("shake");
            });
          });
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();


$(document).on('click', '.warning-message svg', function () {
  $(this).closest('.warning-message').remove();
});

$(document).on('click', '.success-message svg', function () {
  $(this).closest('.success-message').remove();
});

$(document).ready(function () {
  var formData = new FormData();

  var successSpan = $('<span class="success-message"><p>Заявка отправлена успешно!</p>\
  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg></button></span>');

  var fileValid = true; // Initialize fileValid as true



  $("#FormContact:not(.bg-white)").submit(function (e) {
    e.preventDefault();

    var form = $(this);
    var name = form.find("#validationCustom04").val().trim();
    var phone = form.find("#validationCustom05").val().trim();
    var comment = form.find("#my-textarea").val();
    var fileInput = form.find("#exampleFormControlFile1")[0];
    var file = fileInput ? fileInput.files[0] : null;
    var checkbox = form.find("#exampleCheck2").is(":checked");
    var h3 = $("#FormContact:not(.bg-white) h3");
    var basePath = "./forms/";
    var fileName = form.data('response');
    var url = basePath + fileName;

    console.log("Form submitted");
    
    // File validation
    if (fileInput && fileInput.files.length > 0) {
      var filename = fileInput.files[0].name;
      var fileExtension = ['doc', 'docx', 'pdf', 'ppt'];
      var extension = filename.split('.').pop().toLowerCase();

  
      if ($.inArray(extension, fileExtension) == -1) {
          // File format not allowed
          fileValid = false; // Set fileValid to false
          var existingWarningSpan = form.find('.warning-message'); // Check for existing warning span
          if (existingWarningSpan.length === 0) {
              var warningSpan = $('<span class="warning-message mb-2"><p>Произошла ошибка при обработке формата файла.</p>\
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg></button></span>');
              h3.after(warningSpan);

          }
          return; // Stop form submission
      }
      // If file format is valid, remove any existing warning message
      else {
          form.find('.warning-message').remove();
      }
  }
    // Require at least one field filled or checked
    if (name !== "" && phone !== "" && checkbox) {
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("comment", comment);
      formData.append("file", file);
    } else {
      console.log("Form data incomplete");
      return;
    }

    console.log("Sending AJAX request");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
          console.log("AJAX request successful");
          console.log(response);

          if (form.find(".success-message").length === 0) {
              var successSpan = $('<span class="success-message"><p>Заявка отправлена успешно!</p>\
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg></button></span>');
              h3.after(successSpan);

          }
      },
      error: function (xhr, status, error) {
          console.error("AJAX request error:", error);

          if (form.find(".warning-message").length === 0) {
              var errors = [];
              errors.push('{status: false, errors:' + error.length);

              if (xhr.status === 405) {
                  errors.push('Method Not Allowed: The requested method is not allowed for the resource.}');
              } else if (xhr.status === 403) {
                  errors.push('Forbidden: Access to the resource is forbidden.}');
              } else if (xhr.status === 400) {
                  errors.push('Bad Request: The request cannot be fulfilled due to bad syntax or invalid parameters.}');
              } else if (xhr.status === 401) {
                  errors.push('Unauthorized: The request lacks valid authentication credentials for the target resource.}');
              } else if (xhr.status === 404) {
                  errors.push('Not Found: The server cannot find the requested resource.}');
              } else if (xhr.status === 500) {
                  errors.push('Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.}');
              } else {
                  errors.push('Unknown Error: An unknown error occurred.}');
              }

              var warningMessage = errors.join(' ');
              var warningSpan = $('<span class="warning-message"><p>' + warningMessage + '</p>\
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"></path></svg></span>');
              h3.after(warningSpan);

              
          }
      },
      complete: function (response) {
          console.log("Ajax request completed");
      },
  });
  });

  $("#FormContact.bg-white").submit(function (e) {
    e.preventDefault();

    var form = $(this);
    var formData = new FormData();

    var basePath = "./forms/"; // Specify the base path here
    var fileName = form.data('response');
    var url = basePath + fileName;
    
    var name = form.find("#validationCustom04").val().trim();
    var email = form.find("#validationCustom05").val().trim();
    var phone = form.find("#validationCustom06").val().trim();
    var comment = form.find("#my-textarea").val();
    var fileInput = form.find("#exampleFormControlFile1")[0];
    var file = fileInput ? fileInput.files[0] : null;
    var checkbox = form.find("#exampleCheck2").is(":checked");
    
    console.log("Form submitted");
    
    // File validation
    if (fileInput && fileInput.files.length > 0) {
      var filename = fileInput.files[0].name;
      var fileExtension = ['doc', 'docx', 'pdf', 'ppt'];
      var extension = filename.split('.').pop().toLowerCase();
  
      if ($.inArray(extension, fileExtension) == -1) {
          // File format not allowed
          fileValid = false; // Set fileValid to false
          var existingWarningSpan = form.find('.warning-message'); // Check for existing warning span
          if (existingWarningSpan.length === 0) {
              var warningSpan = $('<span class="warning-message mb-2"><p>Произошла ошибка при обработке формата файла.</p>\
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg></button></span>');
              form.prepend(warningSpan);
          }
          return; // Stop form submission
      }
      // If file format is valid, remove any existing warning message
      else {
          form.find('.warning-message').remove();
      }
  }

    // Require at least one field filled or checked and file is valid
    if (name !== "" && email !== "" && phone !== "" && checkbox) {
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("comment", comment);
        if (fileInput && fileInput.files.length > 0) {
            formData.append("file", file);
        }

        console.log("Sending AJAX request");

        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log("AJAX request successful");
                console.log(response);

                if (form.find(".success-message").length === 0) {
                    var successSpan = $('<span class="success-message"><p>Заявка отправлена успешно!</p>\
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg></button></span>');
                    form.prepend(successSpan);
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX request error:", error);

                if (form.find(".warning-message").length === 0) {
                    var errors = [];
                    errors.push('{status: false, errors:' + error.length);

                    if (xhr.status === 405) {
                        errors.push('Method Not Allowed: The requested method is not allowed for the resource.}');
                    } else if (xhr.status === 403) {
                        errors.push('Forbidden: Access to the resource is forbidden.}');
                    } else if (xhr.status === 400) {
                        errors.push('Bad Request: The request cannot be fulfilled due to bad syntax or invalid parameters.}');
                    } else if (xhr.status === 401) {
                        errors.push('Unauthorized: The request lacks valid authentication credentials for the target resource.}');
                    } else if (xhr.status === 404) {
                        errors.push('Not Found: The server cannot find the requested resource.}');
                    } else if (xhr.status === 500) {
                        errors.push('Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.}');
                    } else {
                        errors.push('Unknown Error: An unknown error occurred.}');
                    }

                    var warningMessage = errors.join(' ');
                    var warningSpan = $('<span class="warning-message"><p>' + warningMessage + '</p>\
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg></span>');
                    form.prepend(warningSpan);
                }
            },
            complete: function (response) {
                console.log("Ajax request completed");
            },
        });
    } else {
        console.log("Form data incomplete");
        return;
    }
});

  $(".form-popup form").submit(function (e) {
    e.preventDefault();

    var form = $(this);


    var basePath = "./forms/";
    var fileName = form.data('response');
    var url = basePath + fileName;


    var name = form.find("#validationCustom01").val().trim();
    var email = form.find("#validationCustom02").val().trim();
    var phone = form.find("#validationCustom03").val().trim();
    var checkbox = form.find("#exampleCheck1").is(":checked");


    if (name !== "" && email !== "" && phone !== "" && checkbox) {
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
    } else {
        return;
    }


    $.ajax({
      url: url,
      type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log("AJAX request successful");
            console.log(response);

              
            if (form.find(".success-message").length === 0) {
                 form.prepend(successSpan);
          }
        },
        error: function (xhr, status, error) {
            console.error("AJAX request error:", error);

            if (form.find(".warning-message").length === 0) {
              var errors = [];
              errors.push('{status: false, errors:' + error.length);

              if (xhr.status === 405) {
                  errors.push('Method Not Allowed: The requested method is not allowed for the resource.}');
              } else if (xhr.status === 403) {
                  errors.push('Forbidden: Access to the resource is forbidden.}');
              } else if (xhr.status === 400) {
                  errors.push('Bad Request: The request cannot be fulfilled due to bad syntax or invalid parameters.}');
              } else if (xhr.status === 401) {
                  errors.push('Unauthorized: The request lacks valid authentication credentials for the target resource.}');
              } else if (xhr.status === 404) {
                  errors.push('Not Found: The server cannot find the requested resource.}');
              } else if (xhr.status === 500) {
                  errors.push('Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.}');
              } else {
                  errors.push('Unknown Error: An unknown error occurred.}');
              }

                var warningMessage = errors.join(' ');
                var warningSpan = $('<span class="warning-message"><p>' + warningMessage + '</p>\
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg></span>');
                form.prepend(warningSpan);
            }
        },
        complete: function (response) {
            console.log("Ajax request completed");
        },
    });
});
});

/* pdf loader */
function openPdfPage(pdfUrl) {


  const pdfViewModal =  document.querySelector(".page-view-modal");
  const pdfContainer = pdfViewModal.querySelector(".pdf-container");

  const closeButton = document.querySelector(".page-view-modal .gclose");
  pdfViewModal.style.opacity = "1";
  pdfViewModal.style.height = "100%";
  pdfViewModal.style.width = "100%";

  closeButton.onclick = () => {
    // Get the container element
    
    // Remove all canvas elements
    const canvases = pdfContainer.querySelectorAll('canvas');
    canvases.forEach(canvas => {
      canvas.remove();
    });
  
    // Optionally, reset the modal styles

    pdfViewModal.style.opacity = "0";
    setTimeout(() => {
      pdfViewModal.style.height = "0%";
      pdfViewModal.style.width = "0%";
    }, 300);
  };

  pdfViewModal.appendChild(closeButton);

  



  // Render PDF using PDF.js
  pdfjsLib.getDocument(pdfUrl).promise.then((pdfDoc) => {
    const numPages = pdfDoc.numPages;
  
    // Array to store promises for rendering each page
    const pagePromises = [];
    // Array to store rendered canvases
    const renderedCanvases = [];
  
    // Iterate over each page
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      // Get page
      const pagePromise = pdfDoc.getPage(pageNumber).then((page) => {
        // Get viewport
        const viewport = page.getViewport({ scale: 1 });
  
        // Calculate scale based on viewport dimensions and desired display size
        const maxWidth = window.innerWidth * 0.7; // 70% of window width
        const maxHeight = window.innerHeight * 0.8; // 80% of window height
        const scale = Math.min(maxWidth / viewport.width, maxHeight / viewport.height);
  
        // Create canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width * 1;
        canvas.height = viewport.height * 1;
  
        // Rendering context
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
  
        // Render page to canvas and store in array
        return page.render(renderContext).promise.then(() => {
          // Store rendered canvas
          renderedCanvases[pageNumber - 1] = canvas;
        });
      });
  
      // Push page promise to array
      pagePromises.push(pagePromise);
    }
  
    // Wait for all page rendering promises to resolve
    return Promise.all(pagePromises).then(() => {
      // Append rendered canvases to container in correct order
      renderedCanvases.forEach((canvas) => {
        pdfContainer.appendChild(canvas);
      });
    });
  }).catch((error) => {
    // Handle errors
    console.error("Error rendering PDF:", error);
  });
}
const swiperContainer = document.querySelector(".pages-swiper");
if (swiperContainer) {
swiperContainer.addEventListener("click", (event) => {
  const clickedSlide = event.target.closest(".swiper-slide");
  
  if (clickedSlide) {
    const pdfFileName = clickedSlide.getAttribute("data-pdf");
    const pdfUrl = `./assets/files/${pdfFileName}`; // Construct the PDF file path
    openPdfPage(pdfUrl);
  }
});
}
/* drag and drop */

function allowDrop(event) {
  event.preventDefault();
}

function dropFile(event) {
  event.preventDefault();
  var fileInput = document.getElementById("exampleFormControlFile1");
  var file = event.dataTransfer.files[0];

  var reader = new FileReader();
  reader.onload = function() {
    fileInput.files = event.dataTransfer.files;
    showFileName(fileInput);
  };
  reader.readAsDataURL(file);
}

function allowDrop(event) {
  event.preventDefault();
}

function dropFile(event) {
  event.preventDefault();
  var fileInput = document.getElementById("exampleFormControlFile1");
  var file = event.dataTransfer.files[0];
  fileInput.files = event.dataTransfer.files;
  showFileName(fileInput);
}

function showFileName(input) {
  const form = document.querySelector("form");
  const fileNameDisplay = form.querySelector(".nonUploaded-text");
  const maxHeight = fileNameDisplay.offsetHeight; // Use offsetHeight to get the actual height of the element

  if (input.files && input.files.length > 0) {
    const fileName = input.files[0].name;
    const extensionIndex = fileName.lastIndexOf(".");
    const fileNameWithoutExtension = fileName.substring(0, extensionIndex);
    const extension = fileName.substring(extensionIndex);

    fileNameDisplay.textContent = fileName; // Set the file name initially
    
    if (fileNameDisplay.offsetHeight > maxHeight) { // Check if the file name exceeds the height
      // If the file name exceeds the height, truncate it
      fileNameDisplay.textContent = fileNameWithoutExtension + "..."; // Set file name without extension and ellipsis
      // Check if the new truncated file name still exceeds the height
      while (fileNameDisplay.offsetHeight > maxHeight && fileNameDisplay.textContent.length > 0) {
        fileNameDisplay.textContent = fileNameDisplay.textContent.slice(0, -4) + "..."; // Truncate by removing characters and adding ellipsis
      }
      fileNameDisplay.textContent += extension; // Add the extension back
    }
  } else {
    fileNameDisplay.textContent = "Файл не выбран";
  }
}