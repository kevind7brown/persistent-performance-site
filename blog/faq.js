// Smooth open/close for <details class="faq">. Without JS they still work as plain dropdowns.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ease = 'cubic-bezier(.4,0,.2,1)';

  document.querySelectorAll('details.faq').forEach(function (el) {
    var summary = el.querySelector('summary');
    var anim = null;

    summary.addEventListener('click', function (e) {
      if (reduce) return;
      e.preventDefault();
      el.style.overflow = 'hidden';
      if (!el.open || el.classList.contains('is-closing')) expand(); else collapse();
    });

    function run(from, to, opening) {
      if (anim) anim.cancel();
      anim = el.animate({ height: [from + 'px', to + 'px'] }, { duration: 350, easing: ease });
      anim.onfinish = function () {
        anim = null;
        el.open = opening;
        el.classList.remove('is-closing');
        el.style.height = el.style.overflow = '';
      };
      anim.oncancel = function () { anim = null; };
    }

    function expand() {
      var start = el.offsetHeight;
      el.classList.remove('is-closing');
      el.style.height = start + 'px';
      el.open = true;
      requestAnimationFrame(function () {
        el.style.height = '';
        var end = el.offsetHeight;
        el.style.height = start + 'px';
        run(start, end, true);
      });
    }

    function collapse() {
      el.classList.add('is-closing');
      run(el.offsetHeight, summary.offsetHeight + el.offsetHeight - el.clientHeight, false);
    }
  });
})();
