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
        return clamp(scrolled / total, 0, 1);
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

    // ============================================================
    // LOOP DE ANIMACIÓN
    // ============================================================
    function update() {
        const p = sectionProgress(sectionEl);
        const { phase, t, rotX, rotY } = computeRotation(p, BOX_ANIM.phases);

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
                rotateX(${rotX}deg)
                rotateY(${rotY}deg)
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
