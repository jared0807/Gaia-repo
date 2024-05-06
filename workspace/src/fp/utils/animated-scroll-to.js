import easeInOutCubic from "./ease-in-out-cubic";

// export default function animatedScrollTo(scrollTo, duration, callback) {
//   const scrollFrom = window.scrollY || window.pageYOffset || 0;
//   const scrollDiff = scrollTo - scrollFrom;
//   let currentTime = 0;
//   const increment = 20;

//   (function animateScroll() {
//     currentTime += increment;
//     const newScrollPos = easeInOutCubic(currentTime, scrollFrom, scrollDiff, duration);

//     window.scrollTo(0, newScrollPos);
//     if (currentTime > duration) {
//       callback();
//       return;
//     }

//     setTimeout(animateScroll, increment);
//   }());
// }

function endScroll(scrollTo, increment, callback) {
  window.scrollTo(0, scrollTo);

  setTimeout(() => {
    console.log("true inner");
    callback();
  }, increment);
}

export default function animatedScrollTo(scrollTo, duration, callback) {
  const scrollFrom = window.scrollY || window.pageYOffset || 0;
  const scrollDiff = scrollTo - scrollFrom;
  let currentTime = 0;
  const increment = 20;

  function animateScroll() {
    currentTime += increment;
    const newScrollPos = easeInOutCubic(
      currentTime,
      scrollFrom,
      scrollDiff,
      duration
    );

    window.scrollTo(0, newScrollPos);

    if (currentTime > duration) {
      // if (window.pageYOffset.toFixed() === scrollTo.toFixed()) {
      if (window.pageYOffset === scrollTo) {
        // console.log("true");
        callback();

        return;
      } else {
        endScroll(scrollTo, increment, callback);
      }

      return;
    }

    setTimeout(animateScroll, increment);
  }

  animateScroll();
}
