function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
// locoScroll();

function cursorAnim() {
  let page1Content = document.querySelector("#page1");
  let cursor = document.querySelector("#cursor");

  page1Content.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
      opacity: 1,
    });
  });

  page1Content.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });

  page1Content.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorAnim();

function playReel() {
  let reelDiv = document.querySelector("#playreel-parent");
  let reelBtn = document.querySelector("#page1");
  let closeReel = document.querySelector("#closeReel");

  let tl = gsap.timeline();

  tl.to(reelDiv, {
    left: 0,
    duration: 0.8,
  });
  tl.from(".play-reel video", {
    opacity: 0,
  });
  tl.from(closeReel, {
    opacity: 0,
  });

  tl.pause();

  reelBtn.addEventListener("click", () => {
    tl.play();
  });

  closeReel.addEventListener("click", () => {
    tl.reverse();
  });
}
playReel();

function firstPageAnim() {
  function bottomHeading(params) {
    var h1 = document.querySelector(".page1-heading");
    var h1text = h1.textContent;

    var splittedText = h1text.split("");
    let clutter = "";

    splittedText.forEach((elem) => {
      clutter += `<span>${elem}</span>`;
    });

    h1.innerHTML = clutter;
  }
  bottomHeading();

  let tl = gsap.timeline();

  tl.from("#page1", {
    opacity: 0,
    duration: 0.3,
  });

  tl.from("#logoHeading span", {
    opacity: 0,
    x: 50,
    duration: 0.2,
    stagger: 0.2,
  });

  tl.from(".page1-heading span", {
    y: 200,
    duration: 0.3,
    ease: Power4,
    stagger: 0.1,
    opacity: 0,
  });
}
firstPageAnim();

function page3Anim() {
  gsap.to("#pag3-text-anim", {
    y: 0,
    opacity: 1,
    ease: Power3,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".page3-top",
      scroller: "body",
      start: "top 40%",
      end: "top 30%",
      scrub: 2,
    },
  });
}
page3Anim();

function cursorAnim2() {
  let page5Content = document.querySelector(".cursor-parent");
  let cursor2 = document.querySelector("#cursor2");

  page5Content.addEventListener("mousemove", (dets) => {
    gsap.to(cursor2, {
      x: dets.x,
      y: dets.y,
      opacity: 1,
    });
  });

  page5Content.addEventListener("mouseenter", () => {
    gsap.to(cursor2, {
      scale: 1,
      opacity: 1,
      zIndex: 1,
    });
  });

  page5Content.addEventListener("mouseleave", () => {
    gsap.to(cursor2, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorAnim2();

function swiperSlider() {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    loop: true,
    slidesPerView: 4,
    speed: 10000,
    centeredSlides: true,
    grabCursor: true,
    freeMode: true,
    autoplay: {
      delay: 0,
    },
  });
}
swiperSlider();

function footerAnim() {
  gsap.from("#page8", {
    opacity: 0.95,
    ease: Power4,
    scrollTrigger: {
      trigger: "#page8",
      scroller: "body",
      start: "top 100%",
      end: "top 10%",
      scrub: 2,
    },
  });

  gsap.from(".inner-content-top", {
    y: -200,
    opacity: 0,
    ease: Power4,
    scrollTrigger: {
      trigger: "#page8",
      scroller: "body",
      start: "top 100%",
      end: "top 10%",
      scrub: 2,
    },
  });

  gsap.from(".inner-content-bottom .page8-middle", {
    y: -250,
    opacity: 0.5,
    ease: Power4,
    scrollTrigger: {
      trigger: "#page8",
      scroller: "body",
      start: "top 80%",
      end: "top 20%",
      markers: false,
      scrub: true,
    },
  });

  gsap.from("#last-heading h1", {
    y: -200,
    opacity: 0,
    ease: Power3,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".inner-content-bottom",
      scroller: "body",
      start: "top 50%",
      end: "top 20%",
      scrub: 2,
    },
  });
}
footerAnim();
