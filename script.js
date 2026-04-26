
// SCROLL REVEAL ANIMATION
// We use the IntersectionObserver API to detect when elements enter the viewport
const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Stop observing once revealed
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Select all elements with the 'reveal' class
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => observer.observe(el));

// Smooth Scroll for Anchor Links (Backup if CSS scroll-behavior fails in older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
/* ====== STARFIELD + SHOOTING STARS (VIDEO VERSION) ====== */
(function () {
    const canvas = document.getElementById("space-bg");
    const ctx = canvas.getContext("2d");
    let w, h, dpr;

    function resize() {
        dpr = window.devicePixelRatio || 1;
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    // küçük yıldızlar
    const stars = [];
    const STAR_COUNT = 200;

    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.3 + 0.3,
            alpha: Math.random() * 0.6 + 0.4,
        });
    }

    // kayan yıldızlar
    const meteors = [];

    function spawnMeteor() {
        const y = Math.random() * h * 0.5;
        const speed = 6 + Math.random() * 5;
        const length = 120 + Math.random() * 80;

        meteors.push({
            x: Math.random() * w,
            y,
            vx: speed,
            vy: speed * 0.2,
            length,
            life: 0,
            maxLife: 120,
        });
    }

    // ⭐ ÖNEMLİ KISIM:
    // Meteor sayısını 2–5 aralığında tutar
    function spawnMultipleMeteors() {
        const count = meteors.length;

        if (count >= 5) return;               // 5 üzeri olmasın
        if (count < 2) {                      // 2’nin altına düştüyse tamamla
            spawnMeteor();
            spawnMeteor();
            return;
        }

        // Normalde 1 tane ekle
        spawnMeteor();
    }

    // 1200–1800ms arası meteor üret
    setInterval(spawnMultipleMeteors, 1200 + Math.random() * 900);

    // küçük yıldızları çiz
    function drawStars() {
        stars.forEach((s) => {
            ctx.globalAlpha = s.alpha;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    // kayan yıldızları çiz
    function drawMeteors() {
        for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            m.x += m.vx;
            m.y += m.vy;
            m.life++;

            ctx.save();
            ctx.globalCompositeOperation = "lighter";

            const grad = ctx.createLinearGradient(
                m.x - m.length,
                m.y - m.length * 0.2,
                m.x,
                m.y
            );
            grad.addColorStop(0, "rgba(255,255,255,0)");
            grad.addColorStop(1, "rgba(255,255,255,0.9)");

            ctx.strokeStyle = grad;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(m.x - m.length, m.y - m.length * 0.2);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();

            ctx.fillStyle = "rgba(255,255,255,1)";
            ctx.beginPath();
            ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            if (m.life > m.maxLife) meteors.splice(i, 1);
        }
    }

    // animasyon döngüsü
    function animate() {
        ctx.clearRect(0, 0, w, h);
        drawStars();
        drawMeteors();
        requestAnimationFrame(animate);
    }

    animate();
})();



// TYPEWRITER EFFECT
document.addEventListener("DOMContentLoaded", () => {

    const words = [
        "software developer",
        "full-stack developer",
        "programmer"
    ];

    const el = document.getElementById("typewriter");

    if (!el) {
        console.error("typewriter elementi bulunamadı!");
        return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const current = words[wordIndex];

        if (!deleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 1300);
                return;
            }
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(type, deleting ? 40 : 80);
    }

    type();


});
lucide.createIcons();
// NAVBAR ACTIVE LINK SYSTEM
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function activateMenu() {
    let current = "";

    sections.forEach(section => {
        const top = window.scrollY;
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;

        if (top >= offset && top < offset + height) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", activateMenu);


//experince kısmı
const expItems = document.querySelectorAll('.reveal-exp');

function revealExp() {
    expItems.forEach((el, index) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 120) {
            setTimeout(() => {
                el.classList.add("active");
            }, index * 220); // 250ms arayla sırayla gelsin
        }
    });
}

window.addEventListener('scroll', revealExp);


// NAVBAR SCROLL EFFECT
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add(
            "backdrop-blur-md",
            "bg-black/40",
            "border-b",
            "border-cyan-400/10",
            "shadow-lg"
        );
    } else {
        navbar.classList.remove(
            "backdrop-blur-md",
            "bg-black/40",
            "border-b",
            "border-cyan-400/10",
            "shadow-lg"
        );
    }
});

// Sayfa yenilendiğinde en üste git
history.scrollRestoration = "manual";
window.scrollTo(0, 0);

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
});

// Menüden bir linke tıklayınca kapansın
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
    });
});


//more projects toggle
const toggleBtn = document.getElementById("toggle-projects");
const moreProjects = document.getElementById("more-projects");

toggleBtn.addEventListener("click", () => {
    const isHidden = moreProjects.classList.contains("hidden");

    if (isHidden) {
        moreProjects.classList.remove("hidden");
        moreProjects.classList.add("animate-fade-in");
        toggleBtn.textContent = "Show Less";
    } else {
        moreProjects.classList.add("hidden");
        toggleBtn.textContent = "More Projects";
    }

});

// LOGO CLICK SCROLL TO TOP
const logo = document.getElementById("logo");

if (logo) {
    logo.style.cursor = "pointer"; // sadece imleç değişir

    logo.addEventListener("click", () => {
        document.querySelector("#home").scrollIntoView({
            behavior: "smooth"
        });
    });
}


//Smooth Scroll Down Animation from Home to Skills
let homeLocked = true;

window.addEventListener("wheel", (e) => {
    const home = document.getElementById("home");
    const skills = document.getElementById("skills");

    const homeBottom = home.getBoundingClientRect().bottom;

    // SADECE home görünürken çalışsın
    if (homeLocked && homeBottom > window.innerHeight - 50) {
        e.preventDefault();

        skills.scrollIntoView({
            behavior: "smooth"
        });

        // sadece 1 kere çalışsın
        homeLocked = false;
    }
}, { passive: false });


