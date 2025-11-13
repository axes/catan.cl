// Centro para animación
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

// Tamaños base usados en todas las filas
const HEX_W = 500;
const HEX_H = 500;
const SPACING = HEX_W * 0.87;

// ------------ FILAS -------------

function createFirstRow() {
    const container = document.getElementById("hexagon-container");
    const screenWidth = window.innerWidth;

    const totalWidth = HEX_W + SPACING * 4;
    const startX = (screenWidth - totalWidth) / 2;

    const row = document.createElement("div");
    row.className = "first-row";
    container.appendChild(row);

    for (let i = 0; i < 5; i++) {
        const hex = createHex();
        hex.style.left = `${startX + i * SPACING}px`;
        hex.style.top = `0px`;
        row.appendChild(hex);
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

    for (let i = 0; i < 4; i++) {
        const hex = createHex();
        hex.style.left = `${start1 + offsetX + i * SPACING}px`;
        hex.style.top = `${offsetY}px`;
        row.appendChild(hex);
    }
}


function createThirdRow() {
    const container = document.getElementById("hexagon-container");
    const screenWidth = window.innerWidth;

    const hexW = HEX_W;      // 500
    const spacing = SPACING; // 500 * 0.87

    // offset vertical ya definido
    const offsetY = 1260; // igual que tu CSS actual

    // ANCHO DE LA FILA DE 3
    const totalWidth = hexW + spacing * 2;

    // CENTRAR EXACTO EN EJE X
    const startX = (screenWidth - totalWidth) / 2;

    const row = document.createElement("div");
    row.className = "third-row";
    container.appendChild(row);

    for (let i = 0; i < 3; i++) {
        const hex = createHex();
        hex.style.left = `${startX + i * spacing}px`;
        hex.style.top = `${offsetY}px`;

        row.appendChild(hex);
    }
}


// --------- CREAR HEXÁGONO ----------
function createHex() {
    const hex = document.createElement("div");
    hex.className = "hexagon color-stone";  // aquí asignaremos texturas después
    hex.style.width = HEX_W + "px";
    hex.style.height = HEX_H + "px";
    return hex;
}


// -------- ANIMACIÓN SCROLL ---------

function animateOnScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const progress = Math.min(scrollY / (windowHeight * 0.4), 1);

    document.querySelectorAll('.hexagon').forEach(hex => {
        const rect = hex.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const dx = x - centerX;
        const dy = y - centerY;

        hex.style.opacity = 1 - progress;
        hex.style.transform =
            `translate(${dx * progress * 0.4}px, ${dy * progress * 0.4}px)
             scale(${1 - progress * 0.3})
             rotate(${progress * 20}deg)`;
    });
}


// ----------- INICIO -------------

document.addEventListener('DOMContentLoaded', () => {
    createFirstRow();
    createSecondRow();
    createThirdRow();
    animateOnScroll();
});

window.addEventListener('scroll', () => {
    requestAnimationFrame(animateOnScroll);
});

window.addEventListener('resize', () => {
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
});
