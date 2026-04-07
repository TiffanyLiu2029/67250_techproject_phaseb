const TICKET_PRICE = 18;

function addYear() {
  const yearElement = document.getElementById('copyYear');
  if (yearElement) {
    yearElement.innerHTML = `&copy; ${new Date().getFullYear()} MonoMuse. All rights reserved.`;
  }
}

function greeting() {
  const greetingElement = document.getElementById('greeting');
  if (!greetingElement) return;

  const hour = new Date().getHours();
  let message = 'Welcome to the MonoMuse Museum';

  if (hour < 12) {
    message = 'Good morning and welcome to the MonoMuse Museum';
  } else if (hour < 18) {
    message = 'Good afternoon and welcome to the MonoMuse Museum';
  } else {
    message = 'Good evening and welcome to the MonoMuse Museum';
  }

  greetingElement.textContent = message;
}

function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const pageName = href.split('/').pop();
    if (pageName === currentPage) {
      link.classList.add('active');
    }
  });
}

function setupMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function setupReadMore() {
  if (!window.jQuery) return;
  if (!document.getElementById('readMore')) return;

  window.jQuery('#readMore').on('click', function () {
    window.jQuery('#longIntro').slideDown();
    window.jQuery('#readMore').hide();
    window.jQuery('#readLess').show();
  });

  window.jQuery('#readLess').on('click', function () {
    window.jQuery('#longIntro').slideUp();
    window.jQuery('#readLess').hide();
    window.jQuery('#readMore').show();
  });
}

function setupSlideshow() {
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  if (!slides.length || !prevButton || !nextButton) return;

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active-slide', slideIndex === index);
    });
  }

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });
}

function updateTotal() {
  const quantityInput = document.getElementById('ticketQuantity');
  const totalCost = document.getElementById('totalCost');
  if (!quantityInput || !totalCost) return;

  const quantity = Number(quantityInput.value) || 0;
  totalCost.textContent = `$${quantity * TICKET_PRICE}`;
}

function fillDateFromQuery() {
  const visitDateInput = document.getElementById('visitDate');
  if (!visitDateInput) return;

  const params = new URLSearchParams(window.location.search);
  const date = params.get('date');
  if (date) {
    visitDateInput.value = date;
  }
}

function validateCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  const visitDate = document.getElementById('visitDate');
  const ticketType = document.getElementById('ticketType');
  const ticketQuantity = document.getElementById('ticketQuantity');
  const email = document.getElementById('email');
  const zipCode = document.getElementById('zipCode');
  const mailingList = document.getElementById('mailingList');

  const fields = [
    ['visitDateError', ''],
    ['ticketTypeError', ''],
    ['ticketQuantityError', ''],
    ['emailError', ''],
    ['zipCodeError', '']
  ];

  fields.forEach(([id, message]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = message;
  });

  form.addEventListener('input', updateTotal);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    if (!visitDate.value) {
      document.getElementById('visitDateError').textContent = 'Please choose a visit date.';
      isValid = false;
    }

    if (!ticketType.value) {
      document.getElementById('ticketTypeError').textContent = 'Please select a ticket type.';
      isValid = false;
    }

    const quantity = Number(ticketQuantity.value);
    if (!ticketQuantity.value || quantity < 1 || quantity > 10 || !Number.isInteger(quantity)) {
      document.getElementById('ticketQuantityError').textContent = 'Enter a whole number from 1 to 10.';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailPattern.test(email.value)) {
      document.getElementById('emailError').textContent = 'Enter a valid email address.';
      isValid = false;
    }

    if (zipCode.value && !/^\d{5}$/.test(zipCode.value)) {
      document.getElementById('zipCodeError').textContent = 'Zip code must be exactly 5 digits.';
      isValid = false;
    }

    if (!isValid) return;

    const params = new URLSearchParams({
      date: visitDate.value,
      type: ticketType.value,
      quantity: String(quantity),
      email: email.value,
      total: String(quantity * TICKET_PRICE),
      mailingList: mailingList.checked ? 'Yes' : 'No'
    });

    window.location.href = `confirmation.html?${params.toString()}`;
  });
}

function populateConfirmation() {
  if (!document.getElementById('confirmDate')) return;

  const params = new URLSearchParams(window.location.search);
  const date = params.get('date') || '—';
  const type = params.get('type') || '—';
  const quantity = params.get('quantity') || '—';
  const email = params.get('email') || '—';
  const total = params.get('total') || '—';
  const mailingList = params.get('mailingList') || 'No';

  document.getElementById('confirmDate').textContent = date;
  document.getElementById('confirmType').textContent = type;
  document.getElementById('confirmQuantity').textContent = quantity;
  document.getElementById('confirmEmail').textContent = email;
  document.getElementById('confirmMailingList').textContent = mailingList;
  document.getElementById('confirmTotal').textContent = `$${total}`;
}

function initLeafletMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement || typeof L === 'undefined') return;

  const map = L.map('map').setView([40.4406, -79.9959], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([40.4406, -79.9959]).addTo(map)
    .bindPopup('MonoMuse, 500 Innovation Drive, Pittsburgh, PA')
    .openPopup();
}

document.addEventListener('DOMContentLoaded', () => {
  addYear();
  greeting();
  setActiveNav();
  setupMobileNav();
  setupReadMore();
  setupSlideshow();
  fillDateFromQuery();
  updateTotal();
  validateCheckoutForm();
  populateConfirmation();
  initLeafletMap();
});
