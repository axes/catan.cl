document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("devir-toggle");
    const panel = document.getElementById("devir-panel");
    const closeBtn = document.getElementById("devir-close");

    let expanded = false;

    const updatePanelWidth = () => {
        if (!expanded) return;
        const width = Math.max(0, document.documentElement.clientWidth - 64 - 10);
        panel.style.width = width + "px";
    };

    // --- Función para abrir ---
    const openPanel = () => {
        expanded = true;

        // Fase 1: crecer hacia arriba
        toggle.style.height = "300px";

        // Fase 2: expandir horizontalmente
        setTimeout(() => {
            updatePanelWidth();
        }, 300);
    };

    // --- Función para cerrar ---
    const closePanel = () => {
        expanded = false;

        // Contraer horizontal
        panel.style.width = "0";

        // Contraer vertical luego
        setTimeout(() => {
            toggle.style.height = "64px";
        }, 300);
    };

    // --- Click en el toggle ---
    toggle.addEventListener("click", () => {
        if (!expanded) openPanel();
        else closePanel();
    });

    // --- Click en la X (siempre cierra) ---
    closeBtn.addEventListener("click", closePanel);

    // --- Responsive ---
    window.addEventListener("resize", updatePanelWidth);
});
