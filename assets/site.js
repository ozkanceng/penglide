// Optional enhancements. The page is fully readable without this file.
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var track = document.querySelector('.track');
  if (!track) return;
  var step = function (dir) {
    var first = track.querySelector('li');
    var width = first ? first.getBoundingClientRect().width + 24 : 320;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var start = track.scrollLeft;
    track.scrollBy({ left: dir * width, behavior: reduce ? 'auto' : 'smooth' });
    // Some environments ignore smooth scrolling; jump instead of doing nothing.
    window.setTimeout(function () {
      if (track.scrollLeft === start) track.scrollBy({ left: dir * width, behavior: 'auto' });
    }, 500);
  };
  document.querySelectorAll('[data-gallery]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      step(btn.getAttribute('data-gallery') === 'next' ? 1 : -1);
    });
  });
})();
