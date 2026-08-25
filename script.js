// ============================================================
// Mobile navigation toggle
// ============================================================
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ============================================================
// Custom cursor follower
// ============================================================
const follower = document.querySelector(".mouse-follower");

if (follower) {
  let cx = 0, cy = 0;
  let tx = 0, ty = 0;

  document.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
    follower.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    follower.style.opacity = "0";
  });

  // Smooth lerp follow
  function animateCursor() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    follower.style.left = cx + "px";
    follower.style.top  = cy + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale on interactive elements
  document.querySelectorAll("a, button, .project-link, .skill-cell, .process-cell").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      follower.style.transform = "translate(-50%,-50%) scale(4)";
      follower.style.opacity = "0.5";
    });
    el.addEventListener("mouseleave", () => {
      follower.style.transform = "translate(-50%,-50%) scale(1)";
      follower.style.opacity = "1";
    });
  });
}

// ============================================================
// Scroll reveal using Intersection Observer
// ============================================================
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// ============================================================
// Tools marquee — pause on hover
// ============================================================
const track = document.querySelector(".tools-track");
if (track) {
  track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
}
