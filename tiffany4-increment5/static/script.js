function greeting() {
  const hour = new Date().getHours();
  let greetText = "Welcome to the MonoMuse Museum";

  if (hour < 12) {
    greetText = "Good morning and welcome to the MonoMuse Museum";
  } else if (hour < 18) {
    greetText = "Good afternoon and welcome to the MonoMuse Museum";
  } else {
    greetText = "Good evening and welcome to the MonoMuse Museum";
  }

  const element = document.getElementById("greeting");
  if (element) {
    element.textContent = greetText;
  }
}

function addYear() {
  const year = new Date().getFullYear();
  const element = document.getElementById("copyYear");
  if (element) {
    element.innerHTML = `&copy; ${year} MonoMuse Museum. All rights reserved.`;
  }
}

function ActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav_bar a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

function showPurchaseForm(selectedDate) {
  const form = document.getElementById("ticketForm");
  const dateInput = document.getElementById("selectedDate");
  if (form) {
    form.style.display = "block";
  }
  if (dateInput && selectedDate) {
    dateInput.value = selectedDate;
  }
}

function submitPurchase(event) {
  if (event) {
    event.preventDefault();
  }
  alert("Redirecting to payment system.");
}

function toggleMenu() {
  const nav = document.getElementById("navbar");
  if (nav) {
    nav.classList.toggle("responsive");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  addYear();
  greeting();
  ActiveNav();

  if (window.jQuery) {
    window.jQuery("#readMore").on("click", function () {
      window.jQuery("#longIntro").slideDown();
      window.jQuery("#readMore").hide();
      window.jQuery("#readLess").show();
    });

    window.jQuery("#readLess").on("click", function () {
      window.jQuery("#longIntro").slideUp();
      window.jQuery("#readLess").hide();
      window.jQuery("#readMore").show();
    });
  }

  if (document.getElementById("map") && typeof L !== "undefined") {
    const map = L.map("map").setView([40.4406, -79.9959], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([40.4406, -79.9959]).addTo(map)
      .bindPopup("MonoMuse Location")
      .openPopup();
  }
});
