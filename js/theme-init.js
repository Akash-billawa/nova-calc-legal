/**
 * NovaCalc - Theme Initialization
 * Sets the saved theme and copyright year before the page renders
 * to prevent flash of unstyled/wrong-themed content (FOUC).
 * This script must NOT use defer or async.
 */
(function () {
  var savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    var icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
})();

var yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
