const products = {
  riddle: { title: 'Riddle Me This', image: 'assets/riddle-cover.png', description: '', checkout: '' },
  mad: { title: "We're All Mad Here", image: 'assets/mad-cover.jpg', description: '', checkout: '' },
  sonder: { title: 'Sonder & Solip [pre-order]', image: 'assets/sonder-cover.png', description: 'Shaking reveals the shaken\nand the shaker', checkout: '' }
};
const dialog = document.querySelector('#product-dialog');
const film = document.querySelector('#hero-film');
const motion = document.querySelector('#motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const syncMotion = () => { motion.textContent = film.paused ? 'Play video' : 'Pause video'; motion.setAttribute('aria-pressed', String(!film.paused)); };
motion.addEventListener('click', () => { if (film.paused) film.play().catch(syncMotion); else film.pause(); });
film.addEventListener('play', syncMotion); film.addEventListener('pause', syncMotion);
film.addEventListener('error', () => { film.hidden = true; motion.hidden = true; });
if (!reducedMotion.matches) film.play().catch(syncMotion);
reducedMotion.addEventListener('change', event => { if (event.matches) film.pause(); });
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  const product = products[button.dataset.product];
  document.querySelector('#detail-title').textContent = product.title;
  const image = document.querySelector('#detail-cover');
  image.src = product.image; image.alt = product.title;
  document.querySelector('#detail-description').textContent = product.description;
  const checkout = document.querySelector('#checkout');
  checkout.hidden = !product.checkout;
  checkout.removeAttribute('href');
  if (product.checkout) checkout.href = product.checkout;
  document.querySelector('#checkout-status').hidden = !!product.checkout;
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
