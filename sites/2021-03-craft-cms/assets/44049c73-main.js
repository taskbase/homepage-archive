/*
      Intersection observer for lazyloading and animations
  */

setTimeout(() => {
  // animation observer
  const stack = [];
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (typeof entry.isVisible === "undefined") {
          stack.push(entry.target);
        }
        if (entry.isIntersecting) {
          stack.push(entry.target);
        }
      }
    },
    {
      threshold: [0],
      trackVisibility: true,
      delay: 100,
    }
  );

  document.querySelectorAll(".will-appear").forEach((elem) => {
    observer.observe(elem);
  });

  setInterval(() => {
    if (stack.length) {
      stack[0].classList.add("did-appear");

      // if resonsive image
      if (stack[0].querySelectorAll("[data-srcset]").length) {
        stack[0].querySelectorAll("[data-srcset]").forEach((elem) => {
          elem.setAttribute("srcset", elem.getAttribute("data-srcset"));
          elem.removeAttribute("data-srcset");
        });

        stack[0].querySelectorAll("[data-src]").forEach((elem) => {
          elem.setAttribute("src", elem.getAttribute("data-src"));
          elem.removeAttribute("data-src");

          elem.classList.add("did-appear");
        });
      }

      observer.unobserve(stack[0]);
      stack.shift();
    }
  }, 50);

  document.querySelectorAll(".responsive-image").forEach((elem) => {
    observer.observe(elem);
  });
}, 200);

/**
 * Body transition
 */
setTimeout(() => {
  document.body.classList.remove("state--hidden");
}, 100);

/**
 * Viewports
 */

let viewport = null;

const setViewport = () => {
  if (window.innerWidth < 768) {
    viewport = "small";
  } else if (window.innerWidth < 1024) {
    viewport = "medium";
  } else if (window.innerWidth < 1440) {
    viewport = "large";
  } else {
    viewport = "xlarge";
  }
};

window.addEventListener("resize", () => {
  setViewport();
});

setViewport();

/**
 * Set Variables
 */

const setVariables = () => {
  const rootElem = document.documentElement;

  rootElem.style.setProperty("--vh100", window.innerHeight + "px");
  rootElem.style.setProperty(
    "--header-height",
    document.querySelector(".js-header").getBoundingClientRect().height + "px"
  );
  rootElem.style.setProperty(
    "--footer-height",
    document.querySelector(".js-footer").getBoundingClientRect().height + "px"
  );
};

window.addEventListener("resize", () => {
  setVariables();
});

setVariables();

/**
 * Cookie Banner
 */
if(document.querySelector('.js-cookie-banner__reject')) {
  const setCookieConsent = (value) => {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000000*36000;
    now.setTime(expireTime);
    document.cookie = `cookieConsent=${value};expires=${now.toUTCString()}`;
    document.querySelector('.js-cookie-banner').classList.remove('did-appear')
    setTimeout(() => {
      document.querySelector('.js-cookie-banner').remove()
    }, 800)
  }

  const getCookie = (name) => {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
          end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  }

  if(getCookie('cookieConsent')) {
    document.querySelector('.js-cookie-banner').remove()
  } else {

    document.querySelector('.js-cookie-banner__reject').addEventListener('click', () => {
      setCookieConsent(false)
    })
    document.querySelector('.js-cookie-banner__accept').addEventListener('click', () => {
      setCookieConsent(true)
    })
  }
}
/**
 * scrolling
 */
let scrollbar;
let bar;
let barHeight;
let currentTransform;
let lastSection;

function initBar() {
  scrollbar = window.Scrollbar;
  bar = Scrollbar.init(
    document.querySelector(".scrolling-container", {
      alwaysShowTracks: false,
    })
  );

  bar.addListener((s) => {
    // header
    document.querySelector(
      ".js-header"
    ).style.transform = `translate3d(0,${s.offset.y}px,0)`;

    // inpage nav footer position
    if (document.querySelector(".js-inpage-nav")) {
      const footerBox = document
        .querySelector(".js-footer")
        .getBoundingClientRect();
      const offset =
        footerBox.top - window.innerHeight < 0
          ? footerBox.top - window.innerHeight
          : 0;
      document.querySelector(
        ".js-inpage-nav"
      ).style.transform = `translate3d(0,${offset}px,0)`;
    }

    // inpage nav active
    document.querySelectorAll("[data-section-title]").forEach((elem) => {
      const box = elem.getBoundingClientRect();
      const pageHeight =
        window.innerHeight -
        document.querySelector(".js-header").getBoundingClientRect().height;
      if (
        box.top + pageHeight > pageHeight / 2 &&
        box.top - pageHeight < pageHeight / -2
      ) {
        if (lastSection !== elem.dataset.sectionTitle) {
          lastSection = elem.dataset.sectionTitle;
          changeActiveSection(elem.dataset.sectionTitle);
        }
      }
    });

    // phones
    if (document.querySelector(".js-testimonial-slider__images")) {
      const wrapperRect = document
        .querySelector(".js-testimonial-slider__images")
        .getBoundingClientRect();
      const movementLeft = {
        small: 200,
        medium: 300,
        large: 450,
        xlarge: 450,
      };
      const movementRight = {
        small: 100,
        medium: 200,
        large: 300,
        xlarge: 300,
      };

      if (
        wrapperRect.top + window.innerHeight > 0 &&
        wrapperRect.top - window.innerHeight < 0
      ) {
        const onePercent = (window.innerHeight + wrapperRect.height) / 100;
        const progress =
          ((wrapperRect.top - window.innerHeight) * -1) / onePercent / 100;

        document.querySelector(
          ".js-testimonial-slider__image-left"
        ).style.transform = `translate3d(0,${
          progress * (movementLeft[viewport] * -1) + movementLeft[viewport] / 2
        }px,0)`;
        document.querySelector(
          ".js-testimonial-slider__image-right"
        ).style.transform = `translate3d(0,${
          progress * (movementRight[viewport] * -1) +
          movementRight[viewport] / 2
        }px,0)`;
      }
    }
  });
}

function destroyBar() {
  if (bar) {
    bar.destroy();
  }
}

if (window.Scrollbar) {
  initBar();
}

/**
 * Navigation
 */
if (document.querySelector(".js-header__nav-link")) {
  document
    .querySelector(".js-header__nav-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      if (e.currentTarget.classList.contains("state--active")) {
        e.currentTarget.classList.remove("state--active");
        document
          .querySelector(".js-inpage-nav")
          .classList.remove("state--active");
      } else {
        e.currentTarget.classList.add("state--active");
        document.querySelector(".js-inpage-nav").classList.add("state--active");
      }
    });
}

/**
 * Hotspots Home
 */

const length = document.querySelectorAll(".js-hero .js-hotspot").length;
let currentIndex = 0;
let interval
if (length > 0) {
  interval = setInterval(loop, 2000);

  function loop() {
    if (currentIndex < length) {
      document.querySelectorAll(".js-hero .js-hotspot")[currentIndex].click();
      currentIndex++;
    } else {
      document.querySelectorAll(".js-hero .js-hotspot")[length - 1].click();
      stopInterval();
    }
  }

  function stopInterval() {
    clearInterval(interval);
  }
}

/**
 * Hotspots
 */

document.querySelectorAll(".js-hotspot").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget.classList.contains("state--active")) {
      e.currentTarget.classList.remove("state--active");
      e.currentTarget.style.width = `32px`;
    } else {
      const textWidth = e.currentTarget
        .querySelector(".js-hotspot__text")
        .getBoundingClientRect().width;
      const currentActive = document.querySelector(".js-hotspot.state--active");
      // close all
      if (currentActive) {
        currentActive.classList.remove("state--active");
        currentActive.style.width = `32px`;
      }
      // open current
      e.currentTarget.classList.add("state--active");
      e.currentTarget.style.width = `${textWidth + 32}px`;
    }
  });
});

/**
 * Inpage nav
 */
// add event listeners
const changeActiveSection = (sectionTitle) => {
  const target = document.querySelector(
    `.js-inpage-nav__link[href="${sectionTitle}"]`
  );

  // set active
  document
    .querySelector(".js-inpage-nav__link.state--active")
    .classList.remove("state--active");
  target.classList.add("state--active");

  // set bubble position
  document.querySelector(".js-inpage-nav__bubble").style.top = `${
    target.dataset.index * 21 + 8
  }px`;
};

if (document.querySelector(".js-inpage-nav")) {
  let markup = "";

  document.querySelectorAll("[data-section-title]").forEach((elem, index) => {
    const title = elem.dataset.sectionTitle;
    if (title) {
      markup += `
      <li class="inpage-nav__item">
        <a href="${title}" data-index="${index}" class="inpage-nav__link js-inpage-nav__link ${
        index === 0 && `state--active`
      }">${title}</a>
      </li>
      `;
    }
  });

  document
    .querySelector(".js-inpage-nav__list")
    .insertAdjacentHTML("beforeend", markup);

  // add event listeners
  const changeActiveSection = (sectionTitle) => {
    const target = document.querySelector(
      `.js-inpage-nav__link[href="${sectionTitle}"]`
    );

    // set active
    document
      .querySelector(".js-inpage-nav__link.state--active")
      .classList.remove("state--active");
    target.classList.add("state--active");

    // set bubble position
    document.querySelector(".js-inpage-nav__bubble").style.top = `${
      target.dataset.index * 21 + 8
    }px`;
  };

  document.querySelectorAll(".js-inpage-nav__link").forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();

      // set transition
      document.querySelector(".js-inpage-nav").classList.add("state--linear");

      // update active slide
      changeActiveSection(e.currentTarget.textContent);

      // close nav on mobile
      document
        .querySelector(".js-header__nav-link")
        .classList.remove("state--active");
      document
        .querySelector(".js-inpage-nav")
        .classList.remove("state--active");

      // scroll to elem
      bar.scrollIntoView(
        document.querySelector(
          `[data-section-title="${e.currentTarget.textContent}"]`
        ),
        {
          offsetTop: document
            .querySelector(".js-header")
            .getBoundingClientRect().height,
        }
      );

      // reset transition
      setTimeout(() => {
        // set transition
        document
          .querySelector(".js-inpage-nav")
          .classList.remove("state--linear");
      }, 500);
    });
  });
}

/**
 * Testimonial Slider
 */
if (document.querySelector(".swiper-container")) {
  const sliderSpeed = 500;
  const autoplaySpeed = 7000;
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    speed: 500,

    touchStartPreventDefault: true,
    preventClicks: false,
    preventClicksPropagation: false,

    autoplay: {
      delay: autoplaySpeed,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".js-testimonial-slider__pagination-next",
      prevEl: ".js-testimonial-slider__pagination-prev",
    },
  });

  let time = Date.now();

  swiper.on("slideChange", () => {
    resetLoop();
  });

  const resetLoop = () => {
    time = Date.now();
    document.querySelector(
      ".swiper-slide-active .js-testimonial-slider__testimonial-progress span"
    ).style.width = `0%`;
    checkLoop();
  };

  const checkLoop = () => {
    const frame = requestAnimationFrame(checkLoop);
    if (Date.now() - time < sliderSpeed + autoplaySpeed) {
      // console.log((Date.now() - time) / (sliderSpeed / 100));
      document.querySelector(
        ".swiper-slide-active .js-testimonial-slider__testimonial-progress span"
      ).style.width = `${
        (Date.now() - time) / ((sliderSpeed + autoplaySpeed) / 100)
      }%`;
    } else {
      cancelAnimationFrame(frame);
    }
  };

  checkLoop();
}
