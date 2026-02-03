// script.js

/* ---------- Slides / sections ---------- */
const intro = document.getElementById("intro");
const introBtn = document.getElementById("introBtn");

const intro2 = document.getElementById("intro2");
const intro2Btn = document.getElementById("intro2Btn");

const intro3 = document.getElementById("intro3");
const intro3Btn = document.getElementById("intro3Btn");

const card = document.getElementById("card");

/* ---------- Card elements ---------- */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const success = document.getElementById("success");
const dateIdeaEl = document.getElementById("dateIdea");
const finalGif = document.getElementById("finalGif");

/* ---------- After-Yes extras ---------- */
const roseBtn = document.getElementById("roseBtn");
const roseArea = document.getElementById("roseArea");
const roseCountEl = document.getElementById("roseCount");

/* ---------- Slideshow elements (now outside the card) ---------- */
const slideshowBtn = document.getElementById("slideshowBtn");
const slideshowModal = document.getElementById("slideshowModal");
const slideshowImg = document.getElementById("slideshowImg");
const slideshowPrev = document.getElementById("slideshowPrev");
const slideshowNext = document.getElementById("slideshowNext");
const slideshowClose = document.getElementById("slideshowClose");

let noCount = 0;

const dateIdeas = [
    "a cozy movie night + snacks",
    "ice cream and a sunset walk",
    "a cute dinner date (your pick!)",
    "a picnic with your favorite treats",
    "coffee + a bookstore adventure",
];

const noAttemptMessages = [
    "Why did you try to click that?",
    "AGAIN???",
    "You keep trying to click the wrong one.",
    "That's not an option.",
    "Okay this is getting out of hand",
    "Do you even love me?",
    "Yo...",
    "JUST CLICK YES",
    "PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE",
    "I'll let you peg me if you say yes",
    "That was a lie",
    "PLEASE JUST HIT YES ALREADY",
    "I'm patiently waiting",
    "THAT WAS A LIE TOO IM NOT PATIENT PLEASE CLICK YES",
    "Soon enough this button is going to cover me and I'm going to suffocate",
    "You don't want me to suffocate, right?",
    "RIGHT???",
    "PLEASE STOP HITTING NO I CAN'T SEE CAUSE OF THE BUTTON",
    "AAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
];

/**
 * Slideshow images (Option 1):
 * Your folder contains: Image01.jpg ... Image26.jpg
 */
const slideshowImages = Array.from({ length: 26 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `Image${n}.jpg`;
});

let slideshowIndex = 0;
let flowersGiven = 0;

function pickDateIdea() {
    return dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
}

function showNoAttemptMessage() {
    const msg = noAttemptMessages[(noCount - 1) % noAttemptMessages.length];
    subtitle.textContent = msg;
}

function moveNoButton() {
    // Keep it within the card bounds
    const cardEl = document.querySelector(".card");
    const cardRect = cardEl.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 18;
    const maxX = cardRect.width - btnRect.width - padding * 2;
    const maxY = cardRect.height - btnRect.height - padding * 2;

    const x = padding + Math.random() * Math.max(0, maxX);
    const y = padding + Math.random() * Math.max(0, maxY);

    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

/* ---------- Flowers ---------- */
function updateFlowerCount() {
    if (roseCountEl) roseCountEl.textContent = `Flowers: ${flowersGiven}`;
}

function giveFlower() {
    flowersGiven += 1;
    updateFlowerCount();

    if (!roseArea || !card) return;

    const rect = card.getBoundingClientRect();

    const size = 90;
    const marginFromCard = 18; // keep flowers off the card
    const marginFromEdge = 8;  // keep flowers on-screen

    function intersectsCard(x, y) {
        const flowerRect = {
            left: x,
            top: y,
            right: x + size,
            bottom: y + size,
        };

        const cardRect = {
            left: rect.left - marginFromCard,
            top: rect.top - marginFromCard,
            right: rect.right + marginFromCard,
            bottom: rect.bottom + marginFromCard,
        };

        const noOverlap =
            flowerRect.right < cardRect.left ||
            flowerRect.left > cardRect.right ||
            flowerRect.bottom < cardRect.top ||
            flowerRect.top > cardRect.bottom;

        return !noOverlap;
    }

    let x = marginFromEdge;
    let y = marginFromEdge;

    // Try a bunch of random spots until we find one not overlapping the card
    for (let i = 0; i < 80; i++) {
        const candidateX = marginFromEdge + Math.random() * (window.innerWidth - size - marginFromEdge * 2);
        const candidateY = marginFromEdge + Math.random() * (window.innerHeight - size - marginFromEdge * 2);

        if (!intersectsCard(candidateX, candidateY)) {
            x = candidateX;
            y = candidateY;
            break;
        }
    }

    const img = document.createElement("img");
    img.src = "flower.jpg";
    img.alt = "";
    img.loading = "lazy";
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = `rotate(${Math.floor(Math.random() * 50) - 25}deg)`;

    roseArea.appendChild(img);
}

/* ---------- Slideshow ---------- */
function setSlideshowImage() {
    if (!slideshowImg) return;

    const src = slideshowImages[slideshowIndex];
    slideshowImg.src = src;
    slideshowImg.onerror = () => console.error(`Slideshow image failed to load: ${src}`);
}

function openSlideshow() {
    if (!slideshowModal) return;
    slideshowModal.classList.remove("is-hidden");
    setSlideshowImage();
}

function closeSlideshow() {
    if (!slideshowModal) return;
    slideshowModal.classList.add("is-hidden");
}

function nextSlide() {
    slideshowIndex = (slideshowIndex + 1) % slideshowImages.length;
    setSlideshowImage();
}

function prevSlide() {
    slideshowIndex = (slideshowIndex - 1 + slideshowImages.length) % slideshowImages.length;
    setSlideshowImage();
}

function setAcceptedUI() {
    title.textContent = "YIPPEEEEE!";
    subtitle.textContent = "I LOVE YOU SO MUCH <3 <3 <3";

    if (dateIdeaEl) dateIdeaEl.textContent = pickDateIdea();

    // Remove images in the main card once "Yes" is clicked,
    // BUT keep anything inside the success area (final gif, etc.)
    if (card) {
        const imgsInCard = card.querySelectorAll("img");
        imgsInCard.forEach((img) => {
            if (success && success.contains(img)) return;
            img.remove();
        });
    }

    if (success) success.removeAttribute("hidden");

    const buttonsWrap = document.querySelector(".buttons");
    if (buttonsWrap) buttonsWrap.style.display = "none";

    if (yesBtn && yesBtn.isConnected) yesBtn.remove();
    if (noBtn && noBtn.isConnected) noBtn.remove();

    if (finalGif) {
        finalGif.addEventListener(
            "error",
            () => console.error("GIF failed to load. Check filename/path: photo2.gif"),
            { once: true }
        );
        finalGif.src = "photo2.gif";
    }

    // Reset extras
    flowersGiven = 0;
    updateFlowerCount();
    if (roseArea) roseArea.innerHTML = "";
    slideshowIndex = 0;

    fireConfetti(1200);
}

/* ---------- Intro transitions: intro -> intro2 -> intro3 -> card ---------- */
function showIntro2() {
    intro.classList.add("fade-out");

    window.setTimeout(() => {
        intro.classList.add("is-hidden");
        intro2.classList.remove("is-hidden");
        intro2.classList.add("fade-in");
    }, 450);
}

function showIntro3() {
    intro2.classList.add("fade-out");

    window.setTimeout(() => {
        intro2.classList.add("is-hidden");
        intro3.classList.remove("is-hidden");
        intro3.classList.add("fade-in");
    }, 450);
}

function showCard() {
    intro3.classList.add("fade-out");

    window.setTimeout(() => {
        intro3.classList.add("is-hidden");
        card.classList.remove("is-hidden");
        card.classList.add("fade-in");
    }, 450);
}

if (introBtn) introBtn.addEventListener("click", showIntro2);
if (intro2Btn) intro2Btn.addEventListener("click", showIntro3);
if (intro3Btn) intro3Btn.addEventListener("click", showCard);

/* ---------- Yes/No logic ---------- */
if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        setAcceptedUI();
    });
}

if (noBtn) {
    noBtn.addEventListener("mouseenter", () => {
        noCount += 1;
        showNoAttemptMessage();
        moveNoButton();

        const scale = 1.0 + noCount * 0.07; // infinite growth
        if (yesBtn) yesBtn.style.transform = `scale(${scale})`;
    });

    noBtn.addEventListener("click", () => {
        noCount += 1;
        showNoAttemptMessage();
        moveNoButton();
    });
}

/* ---------- After-Yes buttons ---------- */
if (roseBtn) roseBtn.addEventListener("click", giveFlower);

if (slideshowBtn) slideshowBtn.addEventListener("click", openSlideshow);
if (slideshowClose) slideshowClose.addEventListener("click", closeSlideshow);
if (slideshowNext) slideshowNext.addEventListener("click", nextSlide);
if (slideshowPrev) slideshowPrev.addEventListener("click", prevSlide);

// Close slideshow by clicking the dark backdrop
if (slideshowModal) {
    slideshowModal.addEventListener("click", (e) => {
        if (e.target === slideshowModal) closeSlideshow();
    });
}

// Keyboard controls when slideshow is open
document.addEventListener("keydown", (e) => {
    if (!slideshowModal || slideshowModal.classList.contains("is-hidden")) return;

    if (e.key === "Escape") closeSlideshow();
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
});

/* ---------------- Confetti (tiny, dependency-free) ---------------- */
const canvas = document.getElementById("confetti");
const ctx = canvas ? canvas.getContext("2d") : null;

function resizeCanvas() {
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function fireConfetti(durationMs = 1000) {
    if (!canvas || !ctx) return;

    const pieces = [];
    const colors = ["#ff4d6d", "#ffb3c1", "#ffd6e0", "#7bdff2", "#b2f7ef", "#fff"];

    const start = performance.now();
    const end = start + durationMs;

    for (let i = 0; i < 140; i++) {
        pieces.push({
            x: Math.random() * window.innerWidth,
            y: -20 - Math.random() * 200,
            r: 3 + Math.random() * 5,
            c: colors[Math.floor(Math.random() * colors.length)],
            vx: -2 + Math.random() * 4,
            vy: 2 + Math.random() * 5,
            rot: Math.random() * Math.PI,
            vr: -0.2 + Math.random() * 0.4,
        });
    }

    function frame(t) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (const p of pieces) {
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vr;
            p.vy += 0.03; // gravity

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.c;
            ctx.fillRect(-p.r, -p.r, p.r * 2.2, p.r * 1.6);
            ctx.restore();
        }

        const stillVisible = pieces.some((p) => p.y < window.innerHeight + 40);
        if (t < end || stillVisible) requestAnimationFrame(frame);
        else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    requestAnimationFrame(frame);
}