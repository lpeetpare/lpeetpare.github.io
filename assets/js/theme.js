/* Theme toggle.
 *
 * The stored choice is applied by a tiny inline snippet in <head> so the page never
 * paints the wrong theme first. This file only wires up the button.
 *
 * data-theme absent  -> follow the operating system (prefers-color-scheme)
 * data-theme="dark"  -> forced dark
 * data-theme="light" -> forced light
 */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function effective() {
    var set = root.getAttribute('data-theme');
    if (set === 'dark' || set === 'light') return set;
    return mq.matches ? 'dark' : 'light';
  }

  function relabel() {
    var next = effective() === 'dark' ? 'light' : 'dark';
    var text = 'Switch to ' + next + ' theme';
    btn.setAttribute('aria-label', text);
    btn.setAttribute('title', text);
  }

  btn.addEventListener('click', function () {
    var next = effective() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* private browsing, blocked storage: the choice just will not persist */
    }
    relabel();
  });

  // Follow the OS if the visitor has never chosen, or changes it mid-visit.
  if (mq.addEventListener) mq.addEventListener('change', relabel);

  relabel();
})();
