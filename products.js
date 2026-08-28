// EcoFert Products page — interactive behaviour
document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle ---------------------------------------- */
  const menuBtn = document.querySelector('.menu-btn');
  const navbar = document.querySelector('.navbar');

  if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
      navbar.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navbar.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  /* Product details modal ------------------------------------ */
  const overlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const detailButtons = document.querySelectorAll('.btn-details');

  const openModal = (templateId) => {
    const template = document.getElementById(templateId);
    if (!template) return;
    modalContent.innerHTML = '';
    modalContent.appendChild(template.content.cloneNode(true));
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      openModal(targetId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* Footer year ------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});