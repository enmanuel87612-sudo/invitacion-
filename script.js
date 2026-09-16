document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const body = document.body;

    const envelopeScreen =
        document.getElementById("envelopeScreen");

    const envelope =
        document.getElementById("envelope");

    const openButton =
        document.getElementById("openInvitation");


    /* =====================================================
       MÚSICA
    ====================================================== */

    const bgMusic =
        document.getElementById("bgMusic");

    const musicButton =
        document.getElementById("musicButton");

    const musicIcon =
        document.getElementById("musicIcon");

    const musicText =
        document.getElementById("musicText");


    /* =====================================================
       CONFIRMACIÓN
    ====================================================== */

    const confirmButton =
        document.getElementById("confirmButton");

    const rsvpNote =
        document.getElementById("rsvpNote");


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    let invitationOpened = false;

    let musicPlaying = false;


    /* =====================================================
       BLOQUEAR SCROLL AL INICIO
    ====================================================== */

    body.style.overflowY = "hidden";


    /* =====================================================
       PARTÍCULAS DORADAS
    ====================================================== */

    const particlesContainer =
        document.getElementById("particles");


    if (particlesContainer) {

        const particleCount =
            reducedMotion ? 25 : 75;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("span");


            particle.className =
                "particle";


            particle.style.left =
                `${Math.random() * 100}%`;


            particle.style.top =
                `${Math.random() * 100}%`;


            particle.style.animationDelay =
                `${Math.random() * 5}s`;


            particle.style.animationDuration =
                `${4 + Math.random() * 5}s`;


            const size =
                1 + Math.random() * 2;


            particle.style.width =
                `${size}px`;


            particle.style.height =
                `${size}px`;


            particlesContainer.appendChild(
                particle
            );

        }

    }


    /* =====================================================
       PARALLAX DE LAS FLORES
    ====================================================== */

    const floralClusters =
        document.querySelectorAll(
            ".floral-cluster"
        );


    if (
        !reducedMotion &&
        floralClusters.length > 0
    ) {

        window.addEventListener(
            "pointermove",
            (event) => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    ) * 2;


                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) * 2;


                floralClusters.forEach(
                    (cluster, index) => {

                        const direction =
                            index % 2 === 0
                                ? 1
                                : -1;


                        cluster.style.marginLeft =
                            `${x * 3 * direction}px`;


                        cluster.style.marginTop =
                            `${y * 2}px`;

                    }
                );

            }
        );

    }


    /* =====================================================
       FUNCIONES DE MÚSICA
    ====================================================== */

    function updateMusicButton() {

        if (!musicButton) {
            return;
        }


        if (musicPlaying) {

            if (musicIcon) {
                musicIcon.textContent = "🔊";
            }

            if (musicText) {
                musicText.textContent = "Música";
            }

            musicButton.classList.add("playing");

            musicButton.setAttribute(
                "aria-label",
                "Pausar música"
            );

        } else {

            if (musicIcon) {
                musicIcon.textContent = "🔇";
            }

            if (musicText) {
                musicText.textContent = "Música";
            }

            musicButton.classList.remove("playing");

            musicButton.setAttribute(
                "aria-label",
                "Reproducir música"
            );

        }

    }


    /* =====================================================
       REPRODUCIR MÚSICA
    ====================================================== */

    async function playMusic() {

        if (!bgMusic) {

            console.warn(
                "No se encontró el elemento bgMusic en index.html."
            );

            return;

        }


        try {

            bgMusic.volume = 0.55;

            await bgMusic.play();

            musicPlaying = true;

            updateMusicButton();

            console.log(
                "🎵 Música reproduciéndose correctamente."
            );

        } catch (error) {

            musicPlaying = false;

            updateMusicButton();

            console.warn(
                "No se pudo reproducir la música.",
                error
            );

        }

    }


    /* =====================================================
       PAUSAR MÚSICA
    ====================================================== */

    function pauseMusic() {

        if (!bgMusic) {
            return;
        }


        bgMusic.pause();

        musicPlaying = false;

        updateMusicButton();

    }


    /* =====================================================
       DETECTAR ERROR DEL MP3
    ====================================================== */

    if (bgMusic) {

        bgMusic.addEventListener(
            "error",
            () => {

                console.error(
                    "❌ ERROR: No se pudo cargar el archivo MP3."
                );

                console.error(
                    "Comprueba que el MP3 esté en la misma carpeta que index.html."
                );

            }
        );


        bgMusic.addEventListener(
            "play",
            () => {

                musicPlaying = true;

                updateMusicButton();

            }
        );


        bgMusic.addEventListener(
            "pause",
            () => {

                musicPlaying = false;

                updateMusicButton();

            }
        );

    }


    /* =====================================================
       BOTÓN DE MÚSICA
    ====================================================== */

    if (musicButton) {

        musicButton.addEventListener(
            "click",
            () => {

                if (musicPlaying) {

                    pauseMusic();

                } else {

                    playMusic();

                }

            }
        );

    }


    /* =====================================================
       ABRIR INVITACIÓN
    ====================================================== */

    function openInvitation() {

        if (invitationOpened) {
            return;
        }


        invitationOpened = true;


        if (openButton) {

            openButton.disabled = true;

            openButton.setAttribute(
                "aria-disabled",
                "true"
            );

        }


        if (envelopeScreen) {

            envelopeScreen.classList.add(
                "opening"
            );

        }


        /* ===============================================
           INICIAR MÚSICA

           Esta función se ejecuta directamente después
           del clic del usuario, por lo que el navegador
           permite iniciar el audio.
        =============================================== */

        playMusic();


        /* ===============================================
           TIEMPOS DE ANIMACIÓN
        =============================================== */

        const invitationRevealTime =
            reducedMotion
                ? 150
                : 1450;


        const revealCompleteTime =
            reducedMotion
                ? 300
                : 1850;


        const screenHideTime =
            reducedMotion
                ? 400
                : 2850;


        /* ===============================================
           MOSTRAR INVITACIÓN
        =============================================== */

        window.setTimeout(
            () => {

                body.classList.add(
                    "invitation-visible"
                );

            },
            invitationRevealTime
        );


        /* ===============================================
           MOSTRAR TEXTOS
        =============================================== */

        window.setTimeout(
            () => {

                body.classList.add(
                    "reveal-complete"
                );

            },
            revealCompleteTime
        );


        /* ===============================================
           OCULTAR SOBRE
        =============================================== */

        window.setTimeout(
            () => {

                if (envelopeScreen) {

                    envelopeScreen.classList.add(
                        "hide"
                    );

                }


                body.style.overflowY =
                    "auto";

            },
            screenHideTime
        );


        if (envelope) {

            envelope.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }


    /* =====================================================
       BOTÓN ABRIR INVITACIÓN
    ====================================================== */

    if (openButton) {

        openButton.addEventListener(
            "click",
            openInvitation
        );

    }


    /* =====================================================
       CONFIRMACIÓN POR WHATSAPP
    ====================================================== */

    /*
       Número principal para el botón de confirmación.

       829-288-3437
       Código internacional de República Dominicana: +1

       Por eso usamos:
       18292883437
    */

    const WHATSAPP_NUMBER =
        "18292883437";


    if (confirmButton) {

        confirmButton.addEventListener(
            "click",
            () => {

                const message =
                    "Hola, quiero confirmar mi asistencia a los 18 años de Alejandria Hernández, el 13 de julio de 2027.";


                const url =
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );


                if (rsvpNote) {

                    rsvpNote.textContent =
                        "Se abrirá WhatsApp para confirmar tu asistencia.";

                }

            }
        );

    }


    /* =====================================================
       ESTADO INICIAL
    ====================================================== */

    updateMusicButton();

});