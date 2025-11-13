const HEX_W = 500;
const HEX_H = 500;
const SPACING = HEX_W * 0.87;

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

// --------- CREAR HEXÁGONO ----------
function createHex(type = "stone") {
    const wrap = document.createElement("div");
    wrap.className = "hex-wrap";

    const hex = document.createElement("div");
    hex.className = `hexagon hex-${type}`;
    hex.style.width = HEX_W + "px";
    hex.style.height = HEX_H + "px";

    wrap.appendChild(hex);
    return wrap;
}

function getHexSector(dx, dy) {
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    if (angle >= -30 && angle < 30) return "right";               // 0°
    if (angle >= 30 && angle < 90) return "bottom-right";         // 60°
    if (angle >= 90 && angle < 150) return "bottom-left";         // 120°
    if (angle >= -150 && angle < -90) return "top-left";          // 240°
    if (angle >= -90 && angle < -30) return "top-right";          // 300°
    return "left";                                                // 180° o resto
}

function applyHexSectorEffects(sector, hex, wrap) {
    let tiltX = 0, tiltY = 0;     // rotaciones
    let shadowX = 0, shadowY = 0; // sombra proyectada
    let lightX = "50%", lightY = "40%"; // luz

    switch (sector) {
        case "right":
            tiltY = -15;
            shadowX = -25;
            lightX = "80%";
            break;

        case "bottom-right":
            tiltX = 12;
            tiltY = -12;
            shadowX = -20;
            shadowY = -20;
            lightX = "75%";
            lightY = "75%";
            break;

        case "bottom-left":
            tiltX = 12;
            tiltY = 12;
            shadowX = 20;
            shadowY = -20;
            lightX = "25%";
            lightY = "75%";
            break;

        case "left":
            tiltY = 15;
            shadowX = 25;
            lightX = "20%";
            break;

        case "top-left":
            tiltX = -12;
            tiltY = 12;
            shadowX = 20;
            shadowY = 20;
            lightX = "25%";
            lightY = "25%";
            break;

        case "top-right":
            tiltX = -12;
            tiltY = -12;
            shadowX = -20;
            shadowY = 20;
            lightX = "75%";
            lightY = "25%";
            break;
    }

    // aplicar transform
    hex.style.transform =
        `rotateX(${tiltX}deg)
         rotateY(${tiltY}deg)
         scale(1.05)`;

    // sombra
    wrap.style.filter =
        `drop-shadow(${shadowX}px ${shadowY}px 35px rgba(0,0,0,0.45))`;

    // luz
    hex.style.setProperty("--light-x", lightX);
    hex.style.setProperty("--light-y", lightY);
}


// ------------ FILAS -------------

function createFirstRow() {
    const container = document.getElementById("hexagon-container");
    const screenWidth = window.innerWidth;

    const totalWidth = HEX_W + SPACING * 4;
    const startX = (screenWidth - totalWidth) / 2;

    const row = document.createElement("div");
    row.className = "first-row";
    container.appendChild(row);

    const res1 = ["wood", "wheat", "brick", "sheep", "stone"];

    for (let i = 0; i < 5; i++) {
        const wrap = createHex(res1[i]);
        wrap.style.left = `${startX + i * SPACING}px`;
        wrap.style.top = `0px`;
        row.appendChild(wrap);
    }
}


function createSecondRow() {
    const container = document.getElementById("hexagon-container");
    const screenWidth = window.innerWidth;

    const offsetX = SPACING / 2;
    const offsetY = 630;

    const totalWidth = HEX_W + SPACING * 4;
    const start1 = (screenWidth - totalWidth) / 2;

    const row = document.createElement("div");
    row.className = "second-row";
    container.appendChild(row);

    const res2 = ["brick", "stone", "wheat", "wood"];

    for (let i = 0; i < 4; i++) {
        const wrap = createHex(res2[i]);
        wrap.style.left = `${start1 + offsetX + i * SPACING}px`;
        wrap.style.top = `${offsetY}px`;
        row.appendChild(wrap);
    }
}


function createThirdRow() {
    const container = document.getElementById("hexagon-container");
    const screenWidth = window.innerWidth;

    const hexW = HEX_W;
    const spacing = SPACING;

    const offsetY = 1260;

    const totalWidth = hexW + spacing * 2;
    const startX = (screenWidth - totalWidth) / 2;

    const row = document.createElement("div");
    row.className = "third-row";
    container.appendChild(row);

    const res3 = ["desert", "stone", "brick"];

    for (let i = 0; i < 3; i++) {
        const wrap = createHex(res3[i]);
        wrap.style.left = `${startX + i * spacing}px`;
        wrap.style.top = `${offsetY}px`;
        row.appendChild(wrap);
    }
}


// -------- ANIMACIÓN SCROLL ---------

function animateOnScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const progress = Math.min(scrollY / (windowHeight * 0.4), 1);

    document.querySelectorAll('.hex-wrap').forEach(wrap => {
        const rect = wrap.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const dx = x - centerX;
        const dy = y - centerY;

        const opacity = 1 - progress;

        wrap.style.opacity = opacity;
        wrap.style.transform =
            `translate(${dx * progress * 0.4}px, ${dy * progress * 0.4}px)
             scale(${1 - progress * 0.3})
             rotate(${progress * 20}deg)`;
    });
}




// -------------------------------------
//    HOVER TILT INDIVIDUAL
// -------------------------------------
// --------------------------------------
//     TILT + SOMBRA DINÁMICA
//  Solo para dispositivos con mouse
// --------------------------------------

function setupHoverTilt() {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) {
        console.log("⚠️ Tilt deshabilitado en dispositivos sin mouse.");
        return;
    }

    const container = document.getElementById("hexagon-container");
    let activeHex = null;
    let activeWrap = null;

    container.addEventListener("mouseover", (e) => {
        const hex = e.target.closest(".hexagon");
        if (!hex) return;

        activeHex = hex;
        activeWrap = hex.parentElement;

        activeWrap.style.filter = "drop-shadow(0px 20px 30px rgba(0,0,0,0.9))";
        activeWrap.style.zIndex = 20;
    });

    container.addEventListener("mousemove", (e) => {
        if (!activeHex) return;

        const rect = activeHex.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const dx = mouseX - rect.width / 2;
        const dy = mouseY - rect.height / 2;

        const sector = getHexSector(dx, dy);
        applyHexSectorEffects(sector, activeHex, activeWrap);
    })

    container.addEventListener("mouseout", (e) => {
        const hex = e.target.closest(".hexagon");
        if (!hex) return;

        if (activeHex) {
            activeHex.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
            activeHex.style.setProperty("--light-x", "50%");
            activeHex.style.setProperty("--light-y", "30%");
        }

        if (activeWrap) {
            activeWrap.style.filter = "none";
            activeWrap.style.zIndex = 1;
        }

        activeHex = null;
        activeWrap = null;
    });
}



// ----------- INICIO -------------

document.addEventListener('DOMContentLoaded', () => {
    createFirstRow();
    createSecondRow();
    createThirdRow();
    animateOnScroll();
    setupHoverTilt();

});

window.addEventListener('scroll', () => {
    requestAnimationFrame(animateOnScroll);
});

window.addEventListener('resize', () => {
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
});


console.log("script.js loaded 54");

