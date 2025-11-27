document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // CONFIG FASES ANIMACIÓN
    // ============================================================
    const BOX_ANIM = {
        section: "#catan-box-section",
        box: ".catan-box-3d",
        innerBox: ".inner-box-3d",
        debug: "#catan-box-debug",

        phases: [
            {
                name: "F1",
                start: 0.00,
                end: 0.33,
                rotX: [-90, -20],
                rotY: [180, 90]
            },
            {
                name: "F2",
                start: 0.33,
                end: 0.66,
                rotX: [-20, 0],
                rotY: [90, 0]
            },
            {
                name: "F3",
                start: 0.66,
                end: 1.00,
                rotX: [0, 45],
                rotY: [0, 0]
            }
        ]
    };

    // ============================================================
    // HELPERS
    // ============================================================
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    function sectionProgress(sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const vh = window.innerHeight;

        const total = rect.height - vh;
        if (total <= 0) return 0;

        const scrolled = -rect.top;
        const raw = clamp(scrolled / total, 0, 1);

        // La animación usa solo el 80% superior del scroll
        const ANIM_RANGE = 0.8;

        if (raw >= ANIM_RANGE) {
            // Desde el 80% hacia abajo dejamos la animación en su estado final (p = 1)
            return 1;
        }

        // De 0 a 80% mapeamos linealmente 0 → 1
        return raw / ANIM_RANGE;
    }

    function phaseT(p, phase) {
        const len = phase.end - phase.start;
        return clamp((p - phase.start) / len, 0, 1);
    }

    function computeRotation(p, phases) {
        for (const ph of phases) {
            if (p >= ph.start && p <= ph.end) {
                const t = phaseT(p, ph);
                return {
                    phase: ph.name,
                    t,
                    rotX: lerp(ph.rotX[0], ph.rotX[1], t),
                    rotY: lerp(ph.rotY[0], ph.rotY[1], t)
                };
            }
        }

        const last = phases[phases.length - 1];
        return {
            phase: last.name,
            t: 1,
            rotX: last.rotX[1],
            rotY: last.rotY[1]
        };
    }

    // ============================================================
    // ELEMENTOS
    // ============================================================
    const sectionEl = document.querySelector(BOX_ANIM.section);
    const boxEl = document.querySelector(BOX_ANIM.box);
    const innerEl = document.querySelector(BOX_ANIM.innerBox);
    const debugEl = document.querySelector(BOX_ANIM.debug);

    if (!sectionEl || !boxEl) return;

    // ========================================================
    // PARALLAX DEL MOUSE
    // ========================================================
    let parallaxX = 0;
    let parallaxY = 0;

    window.addEventListener("mousemove", (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        // normalizamos a -1 .. 1
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        // intensidad del efecto
        parallaxX = dx * 5;   // rotación leve
        parallaxY = dy * 5;
    });

    // ============================================================
    // LOOP DE ANIMACIÓN
    // ============================================================
    function update() {
        const p = sectionProgress(sectionEl);
        const { phase, t, rotX, rotY } = computeRotation(p, BOX_ANIM.phases);

        // ========================================================
        // TRANSICIÓN DE FONDO (según progreso general p)
        // ========================================================

        // punto donde empieza a cambiar (cuando ya está abierta la caja)
        const BG_START = 0.85;

        let bgT = 0;

        if (p > BG_START) {
            bgT = (p - BG_START) / (1 - BG_START);  // 0 a 1
            bgT = Math.min(1, Math.max(0, bgT));
        }

        // interpolamos entre dos colores
        const lerpColor = (c1, c2, t) => {
            const a = parseInt(c1.slice(1), 16);
            const b = parseInt(c2.slice(1), 16);

            const r1 = (a >> 16) & 255, g1 = (a >> 8) & 255, b1 = a & 255;
            const r2 = (b >> 16) & 255, g2 = (b >> 8) & 255, b2 = b & 255;

            const r = Math.round(r1 + (r2 - r1) * t);
            const g = Math.round(g1 + (g2 - g1) * t);
            const b_ = Math.round(b1 + (b2 - b1) * t);

            return `rgb(${r}, ${g}, ${b_})`;
        };

        // color inicial y final
        const bgFrom = "#ac121e";   // oscuro catan
        const bgTo = "#f6efe8";   // color que estás usando abajo (arena)

        // asignar color al section
        sectionEl.style.background = lerpColor(bgFrom, bgTo, bgT);

        // ========================================================
        // CAJA EXTERIOR (tapa) — SE MANTIENE IGUAL HASTA F3
        // ========================================================

        if (phase !== "F3") {

            // Caja exterior: rota según la fase
            boxEl.style.transform = `
                translate(-50%, -50%)
                rotateX(${rotX}deg)
                rotateY(${rotY}deg)
            `;

            // Caja interior: NO se rota, solo se centra.
            // Hereda la rotación del padre (.catan-box-3d).
            innerEl.style.transform = `
                translate(-50%, -50%)
            `;
        }

        // ========================================================
        //        F3 — APERTURA REALISTA (SEPARACIÓN)
        // ========================================================
        else {

            const t3 = t;          // progreso solo de F3
            const slow = 0.75;     // rotación interior más lenta

            // Movimiento vertical suavizado para realismo
            const openTop = lerp(0, 100, t3);       // caja superior sube
            const openBottom = lerp(0, 350, t3);   // caja inferior baja (más suave)

            // Inclinaciones realistas tipo "caja de pizza"
            const lidRotX = lerp(rotX, -75, t3);   // tapa gira hacia atrás
            const baseRotX = lerp(rotX, -50, t3);   // base gira hacia adelante

            // ---------- Caja exterior ----------
            boxEl.style.transform = `
                translate(-50%, calc(-50% - ${openTop}px))
                rotateX(${rotX + parallaxY}deg)
                rotateY(${rotY + parallaxX}deg)
            `;

            // ---------- Caja interior ----------
            // Más plana, rotX más baja y manteniendo rotY casi frontal
            const innerRotX = lerp(rotX, -5, t3);
            const innerRotY = lerp(rotY, 0, t3);

            innerEl.style.transform = `
                translate(-50%, calc(-40% + ${openBottom}px))
                rotateX(${baseRotX}deg)
                rotateY(${innerRotY}deg)
            `;



            // ========================================================
            //   COMPONENTES SALIENDO DE LA CAJA (al final de F3)
            // ========================================================
            const pieces = document.querySelectorAll(".catan-piece");

            if (t3 > 0.90) {

                let tComp = (t3 - 0.90) / 0.10;
                tComp = Math.max(0, Math.min(1, tComp));

                // ease-out cúbico: rápido al inicio, suave al final
                tComp = 1 - Math.pow(1 - tComp, 3);

                pieces.forEach((p, i) => {

                    // Ángulos separados para cada pieza
                    const angle = (i / pieces.length) * Math.PI * 2;

                    // Distancias
                    const radius = lerp(0, 400, tComp);  // qué tan lejos salen

                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    p.style.opacity = tComp;
                    p.style.transform = `
                        translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                        scale(${tComp})
                        translateZ(${parallaxX * 10}px)
                        rotateX(${parallaxY * 6}deg)
                        rotateY(${parallaxX * 8}deg)
                    `;
                });

            } else {
                // Mantener ocultas antes del 90% de F3
                pieces.forEach((p) => {
                    p.style.opacity = 0;
                    p.style.transform = `translate(-50%, -50%) scale(0)`;
                });
            }

            // Labels de los componentes
            const labels = document.querySelectorAll("#catan-component-labels .comp-label");

            if (t3 > 0.95) {
                const tLabels = (t3 - 0.95) / 0.05;

                labels.forEach((lbl, i) => {
                    const angle = (i / labels.length) * Math.PI * 2;
                    const radius = 420; // ligeramente más lejos que la pieza

                    const lx = Math.cos(angle) * radius;
                    const ly = Math.sin(angle) * radius;

                    lbl.style.left = `${lx}px`;
                    lbl.style.top = `${ly}px`;
                    lbl.style.opacity = tLabels;
                    lbl.style.transform = `translate(-50%, -50%) translateY(0)`;
                });

            } else {
                labels.forEach(lbl => {
                    lbl.style.opacity = 0;
                    lbl.style.transform = `translate(-50%, -50%) translateY(20px)`;
                });
            }


        }


        // Debug
        if (debugEl) {
            debugEl.textContent =
                `p: ${p.toFixed(3)} | rotX: ${rotX.toFixed(1)}° | rotY: ${rotY.toFixed(1)}° | fase=${phase}`;
        }

        requestAnimationFrame(update);
    }

    update();
});
