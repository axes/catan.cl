<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catan.cl - Construye tu imperio</title>

    <meta name="description" content="Catan.cl - Construye tu imperio en el mundo de Catan. Explora, comercia y construye tu camino hacia la victoria.">
    <link rel="stylesheet" href="styles.css">
    <!-- Agregar favicons -->
    <link rel="icon" href="favicon/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">

    <link rel="stylesheet" href="assets/css/devir-footer.css">
    <script defer src="assets/js/devir-footer.js"></script>

</head>

<body>

    <div id="loader">
        <div class="loader-spinner"></div>
    </div>

    <!-- HERO -->
    <section class="hero-section">
        <div id="hexagon-container"></div>

        <div class="logo">
            <div class="logo-svg">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 576 361.41">
                    <defs>
                        <style>
                            .cls-1 {
                                fill: url(#linear-gradient-7);
                            }

                            .cls-2 {
                                fill: url(#linear-gradient-5);
                            }

                            .cls-3 {
                                fill: url(#linear-gradient-6);
                            }

                            .cls-4 {
                                fill: url(#linear-gradient-4);
                            }

                            .cls-5 {
                                fill: url(#linear-gradient-3);
                            }

                            .cls-6 {
                                fill: url(#linear-gradient-2);
                            }

                            .cls-7 {
                                fill: url(#linear-gradient);
                            }
                        </style>
                        <linearGradient id="linear-gradient" x1="493.33" y1="251" x2="493.33" y2="110.47" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#faf398"></stop>
                            <stop offset=".9" stop-color="#ffdc54"></stop>
                        </linearGradient>
                        <linearGradient id="linear-gradient-2" x1="371.68" x2="371.68" y2="110.23" xlink:href="#linear-gradient"></linearGradient>
                        <linearGradient id="linear-gradient-3" x1="275.38" y1="250.99" x2="275.38" xlink:href="#linear-gradient"></linearGradient>
                        <linearGradient id="linear-gradient-4" x1="177.67" x2="177.67" y2="110.23" xlink:href="#linear-gradient"></linearGradient>
                        <linearGradient id="linear-gradient-5" x1="62.78" y1="251.79" x2="62.78" y2="107.79" xlink:href="#linear-gradient"></linearGradient>
                        <linearGradient id="linear-gradient-6" x1="556.8" y1="248.74" x2="556.8" y2="242.84" xlink:href="#linear-gradient"></linearGradient>
                        <linearGradient id="linear-gradient-7" x1="556.74" y1="251.33" x2="556.74" y2="240.21" xlink:href="#linear-gradient"></linearGradient>
                    </defs>
                    <path class="cls-7"
                        d="M551.81,110.47h-40.36v5.2c6.41.47,10.6,2.04,12.56,4.68,1.96,2.65,2.94,8.01,2.94,16.07v60.24l-53.45-86.19h-33.04v5.2c1.79.13,3.57,1.2,5.34,3.2.18.2,1.23,1.81,2.94,4.48v101.75c0,8.12-.88,13.48-2.63,16.09-1.75,2.6-5.51,4.14-11.28,4.61v5.2h41.72v-5.2c-6.42-.47-10.6-2.03-12.56-4.67-1.96-2.64-2.94-7.98-2.94-16.04v-82.27c21.1,33.56,57.71,92.24,67.63,108.15h10.58v-114.56c0-8.14.8-13.53,2.4-16.18,1.6-2.64,4.98-4.17,10.14-4.57v-5.2Z">
                    </path>
                    <path class="cls-6"
                        d="M420.13,242.35c-1.71-2.03-3.6-6.19-5.64-12.49l-37.79-119.63h-11.48l-36.44,119.63c-1.95,6.3-3.77,10.46-5.46,12.49-1.74,2.03-4.37,3.18-7.91,3.45v5.2h39.21v-5.2c-7.53-.14-11.95-1.78-13.3-4.94-1.32-3.15-.43-9.75,2.7-19.79l3.16-11.19h35.01l6.17,19.95c2.04,6.31,2.32,10.48.81,12.51-1.51,2.04-5.73,3.19-12.64,3.46v5.2h51.41v-5.2c-3.48-.27-6.09-1.42-7.8-3.45ZM351.23,196.55l13.19-44.16.05.17.05-.17,13.61,44.16h-26.9Z">
                    </path>
                    <path class="cls-5"
                        d="M323.04,152.27l-.46-20.95v-20.84h-94.4v20.94l-.45,20.85h5.01c1.18-12.66,4-18.09,8.48-23.5,4.48-5.42,11.4-6.32,20.77-6.32h.63v107.43c0,6.02-.98,10.04-2.93,12.07-1.96,2.03-6.15,3.32-12.58,3.85v5.2h56.55v-5.2c-6.43-.53-10.62-1.83-12.57-3.85-1.95-2.03-2.93-6.05-2.93-12.07v-107.43h.63c9.36,0,16.28.9,20.75,6.32,4.47,5.42,7.31,10.84,8.49,23.5h5.02Z">
                    </path>
                    <path class="cls-4"
                        d="M226.13,242.35c-1.71-2.03-3.6-6.19-5.64-12.49l-37.79-119.63h-11.47l-36.45,119.63c-1.95,6.3-3.77,10.46-5.46,12.49-1.74,2.03-4.37,3.18-7.91,3.45v5.2h39.21v-5.2c-7.53-.14-11.96-1.78-13.3-4.94-1.32-3.15-.43-9.75,2.7-19.79l3.17-11.19h35.01l6.17,19.95c2.04,6.31,2.31,10.48.8,12.51-1.51,2.04-5.73,3.19-12.64,3.46v5.2h51.41v-5.2c-3.48-.27-6.09-1.42-7.81-3.45ZM157.23,196.55l13.19-44.16,13.61,44.16h-26.8Z">
                    </path>
                    <path class="cls-2"
                        d="M76.35,240.55c-18.32,0-33.17-27.6-33.17-61.66s14.85-61.65,33.17-61.65c12.85,0,24,13.59,29.5,33.46h5.99c0-11.14,0-23.14-.02-34.29,0-.33-.24-.72-.54-.87-1.44-.73-2.89-1.46-4.4-2.04-7-2.71-14.35-4.18-21.81-5.11-3.12-.39-6.24-.6-9.37-.6-2.76,0-5.52.16-8.28.52-4.73.61-9.33,1.65-13.76,3.31-11.28,4.23-20.06,11.36-26.7,20.92-6.04,8.69-9.54,18.33-11.51,28.49-.92,4.75-1.43,9.54-1.64,14.37-.43,9.88.27,19.65,2.73,29.28,1.47,5.76,3.53,11.31,6.39,16.58,4.38,8.1,10.27,14.99,18.08,20.34,5.63,3.86,11.82,6.58,18.54,8.24,3.71.92,7.48,1.44,11.31,1.75,4.99.4,9.97.18,14.89-.49,4.61-.63,9.19-1.55,13.73-2.53,3.68-.8,7.25-2.08,10.6-3.81,1.74-.9,1.74-.93,1.74-2.87,0-10.63,0-21.35.02-31.98h-6.84c-5.75,18.34-16.44,30.66-28.67,30.66Z">
                    </path>
                    <path class="cls-3"
                        d="M558.23,246.83c-.17-.22-.3-.37-.4-.45-.1-.08-.23-.15-.41-.22.5-.07.89-.26,1.17-.56.28-.3.42-.67.42-1.09,0-.31-.07-.59-.22-.85-.15-.25-.33-.44-.55-.57-.22-.12-.53-.2-.93-.24-.14,0-.76-.02-1.89-.02h-1.2v5.9h1.2v-2.42h.31c.33,0,.61.08.83.25.22.17.49.57.83,1.22l.49.96h1.48l-.7-1.19c-.25-.42-.39-.66-.44-.72ZM557.2,245.31c-.17.05-.6.08-1.29.08h-.49v-1.61h.49c.68,0,1.11.03,1.28.08.17.06.31.15.4.28.09.13.14.28.14.44s-.05.32-.15.45c-.1.13-.23.23-.4.28Z">
                    </path>
                    <path class="cls-1"
                        d="M561.55,242.97c-.5-.89-1.19-1.57-2.07-2.05-.88-.48-1.79-.71-2.74-.71s-1.87.24-2.74.71c-.88.48-1.56,1.16-2.07,2.05-.5.89-.75,1.82-.75,2.8s.25,1.89.74,2.77c.49.88,1.18,1.56,2.05,2.05s1.8.74,2.77.74,1.89-.25,2.77-.74c.88-.49,1.56-1.18,2.05-2.05.49-.88.74-1.8.74-2.77s-.25-1.9-.75-2.8ZM560.62,247.99c-.4.71-.95,1.26-1.65,1.66-.7.4-1.45.59-2.23.59s-1.51-.2-2.22-.59c-.71-.4-1.26-.95-1.65-1.66-.39-.71-.59-1.45-.59-2.23s.2-1.53.61-2.25c.4-.72.96-1.27,1.66-1.65s1.44-.57,2.2-.57,1.5.19,2.2.57c.7.38,1.26.93,1.66,1.65.4.72.61,1.47.61,2.25s-.2,1.52-.59,2.23Z">
                    </path>
                </svg>
            </div>
        </div>
    </section>

    <!-- CONTENIDO -->
    <section class="content-section">
        <div class="container">
            <div class="text-center">
                <h2>Bienvenido a Catan</h2>
                <p class="subtitle">Explora, comercia y construye tu camino hacia la victoria.</p>
            </div>

            <div class="cards-grid">
                <div class="card">
                    <div class="card-icon wood"></div>
                    <h3>Recolecta</h3>
                    <p>Obtén recursos desde las losetas para construir tu civilización.</p>
                </div>

                <div class="card">
                    <div class="card-icon wheat"></div>
                    <h3>Comercia</h3>
                    <p>Negocia con otros jugadores para obtener lo que necesitas.</p>
                </div>

                <div class="card">
                    <div class="card-icon brick"></div>
                    <h3>Construye</h3>
                    <p>Levanta ciudades, caminos y desarrolla tu estrategia.</p>
                </div>
            </div>

            <div class="text-center">
                <button class="cta-button">Comenzar a Jugar</button>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <?php include 'components/devir-footer.php'; ?>

    <script src="script.js"></script>
</body>

</html>