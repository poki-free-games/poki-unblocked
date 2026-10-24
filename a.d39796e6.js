// The only script of every portal: start a game in place, full screen, the mobile menu. No trackers, no outside calls.
document.addEventListener('click', (e) => {
  const play = e.target.closest('[data-play]');
  if (play) {
    const box = play.closest('[data-game]');
    if (!box || box.querySelector('iframe')) return;
    const f = document.createElement('iframe');
    f.src = box.dataset.game;
    f.title = box.dataset.title || 'Game';
    f.allow = 'autoplay; fullscreen; gamepad; accelerometer; gyroscope';
    f.setAttribute('allowfullscreen', '');
    f.loading = 'eager';
    box.classList.add('is-playing');
    box.appendChild(f);
    f.focus();
    return;
  }
  const fs = e.target.closest('[data-fs]');
  if (fs) {
    const box = document.querySelector('[data-game]');
    if (!box) return;
    if (!box.querySelector('iframe')) box.querySelector('[data-play]')?.click();
    const go = box.requestFullscreen || box.webkitRequestFullscreen;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (go) go.call(box);
    else box.classList.toggle('is-max');
    return;
  }
  const menu = e.target.closest('[data-menu]');
  if (menu) {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('menu-open', open);
  }
});
