// Intersection observer for reveal-on-scroll
(() => {
  const onIntersect = (entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    })
  }

  const observer = new IntersectionObserver(onIntersect, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Hero parallax effect
  const hero = document.querySelector('.hero');
  const heroTitle = document.querySelector('.hero-title');
  let latestScroll = 0;
  const onScroll = () => {
    latestScroll = window.scrollY;
    requestAnimationFrame(() => {
      const s = latestScroll * 0.12;
      if (heroTitle) heroTitle.style.transform = `translateY(${s}px)`;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  // Simple 3D tilt for photo cards on mouse move
  function bindTilt(card){
    const rect = card.getBoundingClientRect();
    const inner = card.querySelector('.photo-placeholder');
    function onMove(e){
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = (-y) * 6; const ry = x * 6;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      inner.style.filter = `brightness(1.02)`;
    }
    function onLeave(){
      card.style.transform = '';
      inner.style.filter = '';
    }
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('touchstart', onLeave);
  }
  document.querySelectorAll('.photo-card').forEach(c => bindTilt(c));

  // Image insertion is handled by editing the project pages and placing <img> tags.
})();
