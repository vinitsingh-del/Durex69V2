(() => {
  const byLabel = (root, text) => root?.querySelector(`[aria-label="${text}"]`);

  const setupHero = () => {
    const hero = document.querySelector('.hero');
    const slides = [...document.querySelectorAll('.hero-photo')];
    if (!hero || slides.length < 2) return;

    let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
    };

    show(index);

    byLabel(hero, 'Previous banner')?.addEventListener('click', () => show(index - 1));
    byLabel(hero, 'Next banner')?.addEventListener('click', () => show(index + 1));
  };

  const setupPreloader = () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    window.setTimeout(() => preloader.classList.add('is-complete'), 900);
  };

  const setupParisContest = () => {
    const modal = document.createElement('div');
    modal.className = 'paris-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'paris-title');
    modal.innerHTML = `
      <button class="paris-backdrop" aria-label="Close Paris contest"></button>
      <section class="paris-card">
        <button class="paris-close" aria-label="Close Paris contest">×</button>
        <span class="paris-kicker">69 STORE PRESENTS</span>
        <i aria-hidden="true">✦</i>
        <h2 id="paris-title">Paris<br>after dark</h2>
        <p>Shop the 69 Store and enter for a chance to make your next romantic escape unforgettable.</p>
        <a href="#bestsellers">Enter the Paris contest <b>→</b></a>
        <small>Terms and eligibility apply.</small>
      </section>`;
    document.body.append(modal);
    const close = () => modal.classList.remove('is-open');
    modal.querySelectorAll('[aria-label="Close Paris contest"]').forEach((button) => button.addEventListener('click', close));
    modal.querySelector('a')?.addEventListener('click', close);
    document.addEventListener('keydown', (event) => event.key === 'Escape' && close());
    window.setTimeout(() => modal.classList.add('is-open'), 1450);
  };

  const setupStickyCategories = () => {
    const nav = document.querySelector('.category-nav');
    if (!nav || nav.querySelector('a[href="#bestsellers"]')) return;
    const bestsellers = document.createElement('a');
    bestsellers.href = '#bestsellers';
    bestsellers.innerHTML = '<img src="/Durex69V2/assets/live-range/extra-time-ultra-thin-10-stable.webp" alt=""><span><b>Bestsellers</b><small>Top-rated sale picks.</small></span><i>→</i>';
    nav.prepend(bestsellers);
  };

  const setupBagMaker = () => {
    const products = [
      { name: 'Extra Time Ultra Thin', price: 349, image: '/Durex69V2/assets/live-range/extra-time-ultra-thin-10-stable.webp' },
      { name: 'Real Feel Lube', price: 349, image: '/Durex69V2/assets/live-range/Real_Feel_62de3020-dba5-4359-999e-05ccaad591c9.webp' },
      { name: 'Ride & Vibe', price: 4199, image: '/Durex69V2/assets/live-range/ride-vibe-men-stable.webp' }
    ];
    const items = [];
    const maker = document.createElement('aside');
    maker.className = 'bag-maker';
    maker.innerHTML = `
      <button class="bag-maker-trigger" aria-expanded="false"><span>＋</span> Make Your Bag <b>0</b></button>
      <section class="bag-maker-tray" aria-label="Quick bag builder">
        <header><span><small>QUICK PICKS</small><strong>Make your bag</strong></span><button aria-label="Close quick bag builder">×</button></header>
        <div>${products.map((product, index) => `<article><img src="${product.image}" alt=""><span><b>${product.name}</b><small>₹${product.price.toLocaleString('en-IN')}</small></span><button data-product="${index}">Add ＋</button></article>`).join('')}</div>
      </section>`;
    document.body.append(maker);

    const trigger = maker.querySelector('.bag-maker-trigger');
    const tray = maker.querySelector('.bag-maker-tray');
    const setOpen = (open) => {
      maker.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    };
    trigger.addEventListener('click', () => setOpen(!maker.classList.contains('is-open')));
    maker.querySelector('[aria-label="Close quick bag builder"]')?.addEventListener('click', () => setOpen(false));

    const renderBag = () => {
      const total = items.reduce((sum, item) => sum + item.price, 0);
      document.querySelectorAll('.bag b, .bag-maker-trigger b').forEach((count) => count.textContent = String(items.length));
      const drawer = document.querySelector('.cart-drawer');
      const cartItems = drawer?.querySelector('.cart-items');
      const title = drawer?.querySelector('#bag-title');
      if (title) title.textContent = items.length ? `${items.length} item${items.length === 1 ? '' : 's'} in your bag` : 'Your bag is empty';
      if (cartItems && items.length) cartItems.innerHTML = `${items.map((item) => `<article class="made-bag-item"><img src="${item.image}" alt=""><span><b>${item.name}</b><small>₹${item.price.toLocaleString('en-IN')}</small></span></article>`).join('')}<div class="made-bag-total"><span>Total</span><b>₹${total.toLocaleString('en-IN')}</b></div>`;
    };
    const add = (product) => {
      items.push(product);
      renderBag();
      trigger.classList.remove('is-pulsing');
      void trigger.offsetWidth;
      trigger.classList.add('is-pulsing');
    };
    maker.querySelectorAll('[data-product]').forEach((button) => button.addEventListener('click', () => add(products[Number(button.dataset.product)])));
    document.querySelectorAll('.product-card .quick-add').forEach((button) => button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const name = card?.querySelector('h3')?.textContent.trim() || 'Durex product';
      const priceText = card?.querySelector('.price b')?.textContent.replace(/[^0-9]/g, '') || '0';
      const image = card?.querySelector('.product-media-main')?.src || products[0].image;
      add({ name, price: Number(priceText), image });
    }));

    const drawer = document.querySelector('.cart-drawer');
    const backdrop = document.querySelector('.cart-backdrop');
    const openDrawer = () => { drawer?.classList.add('is-open'); backdrop?.classList.add('is-open'); drawer?.setAttribute('aria-hidden', 'false'); };
    const closeDrawer = () => { drawer?.classList.remove('is-open'); backdrop?.classList.remove('is-open'); drawer?.setAttribute('aria-hidden', 'true'); };
    document.querySelector('.bag')?.addEventListener('click', openDrawer);
    drawer?.querySelector('[aria-label="Close bag"]')?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);
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

  setupPreloader();
  setupHero();
  setupSaleRail();
  setupFeaturedMassagers();
  setupStickyCategories();
  setupParisContest();
  setupBagMaker();
})();
