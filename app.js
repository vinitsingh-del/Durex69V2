(() => {
  const byLabel = (root, text) => root?.querySelector(`[aria-label="${text}"]`);

  const setupHero = () => {
    const hero = document.querySelector('.hero');
    const slides = [...document.querySelectorAll('.hero-photo')];
    if (!hero || slides.length < 2) return;

    const heldProduct = document.createElement('span');
    heldProduct.className = 'hero-held-product';
    heldProduct.setAttribute('aria-hidden', 'true');
    heldProduct.innerHTML = '<img src="/Durex69V2/assets/live-range/extra-time-ultra-thin-10-stable.webp" alt="">';
    hero.querySelector('.hero-slides')?.append(heldProduct);

    let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      heldProduct.classList.toggle('is-visible', index === 1);
    };

    show(index);

    byLabel(hero, 'Previous banner')?.addEventListener('click', () => show(index - 1));
    byLabel(hero, 'Next banner')?.addEventListener('click', () => show(index + 1));
  };

  const setupSaleRail = () => {
    const rail = document.querySelector('.hero-product-rail');
    if (!rail) return;
    const move = (direction) => rail.scrollBy({ left: direction * rail.clientWidth * 0.78, behavior: 'smooth' });
    byLabel(document, 'Scroll sale picks left')?.addEventListener('click', () => move(-1));
    byLabel(document, 'Scroll sale picks right')?.addEventListener('click', () => move(1));
  };

  const setupFeaturedMassagers = () => {
    const feature = document.querySelector('.massager-feature');
    const copy = feature?.querySelector('.feature-copy');
    const visual = feature?.querySelector('.feature-visual img');
    const controls = feature?.querySelector('.feature-slider-controls');
    if (!feature || !copy || !visual || !controls) return;

    const products = [
      { name: 'Play A-Game', benefit: 'Compact vibrations for playful exploration', price: '₹2,599', oldPrice: '₹2,999', save: 'Save ₹400', rating: '5.0', reviews: 14, image: '/Durex69V2/assets/live-range/play-a-game-stable.webp', url: 'https://www.durexindia.com/products/durex-massagers-play-a-game' },
      { name: 'Play Wild Wand', benefit: 'Stimulate sweet spots with a flexible wand', price: '₹2,699', oldPrice: '₹4,686', save: 'Save ₹1,987', rating: '4.6', reviews: 15, image: '/Durex69V2/assets/live-range/FR1_71cbea39-e04c-4d52-aba7-1f993ca5e4db.jpg', url: 'https://www.durexindia.com/products/durex-play-wild-wand' },
      { name: 'Play Buzzy Rabbit', benefit: 'Dual stimulation in a playful silhouette', price: '₹3,999', oldPrice: '₹5,624', save: 'Save ₹1,625', rating: '4.7', reviews: 13, image: '/Durex69V2/assets/live-range/1_0a2a99f8-37be-47b8-bda9-7123592357b2.webp', url: 'https://www.durexindia.com/products/durex-play-buzzy-rabbit' },
      { name: 'Ride & Vibe for Men', benefit: 'Pleasure rollercoaster', price: '₹4,199', oldPrice: '₹5,499', save: 'Save ₹1,300', rating: '4.8', reviews: 15, image: '/Durex69V2/assets/live-range/ride-vibe-men-stable.webp', url: 'https://www.durexindia.com/products/durex-massagers-play-ride-vibe-for-men' }
    ];

    const eyebrow = copy.querySelector(':scope > p');
    const title = copy.querySelector('h2');
    const description = copy.querySelector(':scope > span');
    const price = copy.querySelector(':scope > div b');
    const oldPrice = copy.querySelector(':scope > div del');
    const save = copy.querySelector(':scope > div em');
    const rating = copy.querySelector('.feature-rating');
    const buy = copy.querySelector('.feature-actions a');
    const proofTitle = feature.querySelector('.feature-proof b');
    let index = 3;

    controls.classList.add('is-manual');
    controls.querySelector(':scope > div')?.remove();
    controls.querySelector('[aria-label*="Pause"]')?.remove();

    const render = (next) => {
      index = (next + products.length) % products.length;
      const product = products[index];
      feature.classList.add('is-changing');
      window.setTimeout(() => {
        if (eyebrow) eyebrow.textContent = `FEATURED MASSAGER · ${index + 1} OF ${products.length}`;
        if (title) title.textContent = product.name;
        if (description) description.textContent = `${product.benefit}. Compare a focused edit of original Durex massagers before you choose.`;
        if (price) price.textContent = product.price;
        if (oldPrice) oldPrice.textContent = product.oldPrice;
        if (save) save.textContent = product.save;
        if (rating) rating.innerHTML = `★ ${product.rating} <span>${product.reviews} customer reviews</span>`;
        if (buy) buy.href = product.url;
        visual.src = product.image;
        visual.alt = `${product.name} massager`;
        if (proofTitle) proofTitle.textContent = product.name;
        feature.setAttribute('aria-label', `Featured massager: ${product.name}`);
        feature.classList.remove('is-changing');
      }, 110);
    };

    byLabel(controls, 'Previous featured massager')?.addEventListener('click', () => render(index - 1));
    byLabel(controls, 'Next featured massager')?.addEventListener('click', () => render(index + 1));
  };

  setupHero();
  setupSaleRail();
  setupFeaturedMassagers();
})();
