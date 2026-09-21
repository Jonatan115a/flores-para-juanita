const boton = document.getElementById("boton");
const inicio = document.getElementById("inicio");
const segundaPantalla = document.getElementById("segundaPantalla");

const canvas = document.getElementById("galaxia");
const ctx = canvas.getContext("2d");

const cartaBtn = document.getElementById("cartaBtn");
const cartaOverlay = document.getElementById("cartaOverlay");
const cerrarCarta = document.getElementById("cerrarCarta");

const musicaBtn = document.getElementById("musicaBtn");
const musica = document.getElementById("musica");


// ======================================================
// CAMBIO DE PANTALLA
// ======================================================

boton.addEventListener("click", () => {

    inicio.classList.add("ocultar");

    setTimeout(() => {

        segundaPantalla.classList.add("mostrar");

        iniciarGalaxia();

    }, 500);

});


// ======================================================
// CARTA
// ======================================================

cartaBtn.addEventListener("click", () => {

    cartaOverlay.classList.add("activa");

});


cerrarCarta.addEventListener("click", () => {

    cartaOverlay.classList.remove("activa");

});


// ======================================================
// MÚSICA
// ======================================================

let musicaActiva = false;

musicaBtn.addEventListener("click", async () => {

    if (!musicaActiva) {

        try {

            await musica.play();

            musicaActiva = true;

            musicaBtn.textContent = "🔊";

            musicaBtn.classList.add("sonando");

        } catch (error) {

            console.log(
                "No se pudo reproducir la música."
            );

        }

    } else {

        musica.pause();

        musicaActiva = false;

        musicaBtn.textContent = "🎵";

        musicaBtn.classList.remove("sonando");

    }

});


// ======================================================
// CANVAS
// ======================================================

let ancho;
let alto;


function ajustarCanvas() {

    ancho = canvas.width = window.innerWidth;
    alto = canvas.height = window.innerHeight;

}


window.addEventListener("resize", ajustarCanvas);


// ======================================================
// CÁMARA / MOVIMIENTO
// ======================================================

let camX = 0;
let camY = 0;

let objetivoX = 0;
let objetivoY = 0;

let velocidadX = 0;
let velocidadY = 0;


// ======================================================
// PARTÍCULAS
// ======================================================

let particulas = [];


function crearParticulas() {

    particulas = [];

    const cantidad =
        window.innerWidth < 600
            ? 1800
            : 3000;


    for (let i = 0; i < cantidad; i++) {

        const angulo =
            Math.random() *
            Math.PI *
            2;


        const radio =
            Math.pow(
                Math.random(),
                0.65
            ) *
            Math.min(
                ancho,
                alto
            ) *
            1.15;


        const z =
            Math.random() * 2 - 1;


        particulas.push({

            angulo: angulo,

            radio: radio,

            z: z,

            velocidad:
                0.00025 +
                Math.random() *
                0.0012,

            tamaño:
                Math.random() *
                2.4 +
                0.4,

            brillo:
                Math.random(),

            offset:
                Math.random() *
                1000

        });

    }

}


// ======================================================
// FLORES
// ======================================================

let flores = [];


function crearFlores() {

    flores = [];

    const cantidad =
        window.innerWidth < 600
            ? 32
            : 45;


    for (let i = 0; i < cantidad; i++) {

        flores.push({

            angulo:
                Math.random() *
                Math.PI *
                2,

            radio:
                130 +
                Math.random() *
                Math.min(
                    ancho,
                    alto
                ) *
                0.85,

            z:
                Math.random() *
                2 -
                1,

            tamaño:
                10 +
                Math.random() *
                22,

            velocidad:
                0.00015 +
                Math.random() *
                0.0007

        });

    }

}


// ======================================================
// PALABRAS
// ======================================================

let palabras = [];


function crearPalabras() {

    palabras = [

        "Flores",
        "vivo por ti",
        "Amor",
        "Siempre",
        "Mi paraíso",
        "Alegría",
        "Destino",
        "Magia",
        "Girasoles",
        "Mole",
        "Amistad",
        "Felicidad",
        "Esperanza",
        "Mi bida"
    

    ];

}


// ======================================================
// FLOR
// ======================================================

function dibujarFlor(
    x,
    y,
    tamaño,
    rotacion,
    alpha
) {

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(rotacion);

    ctx.globalAlpha = alpha;


    // PÉTALOS

    for (let i = 0; i < 10; i++) {

        const angulo =
            (Math.PI * 2 / 10) *
            i;


        ctx.save();

        ctx.rotate(angulo);


        ctx.beginPath();

        ctx.ellipse(

            0,

            -tamaño * 0.75,

            tamaño * 0.38,

            tamaño * 0.75,

            0,

            0,

            Math.PI * 2

        );


        ctx.fillStyle =
            "#ffd21f";

        ctx.fill();

        ctx.restore();

    }


    // CENTRO

    ctx.beginPath();

    ctx.arc(

        0,

        0,

        tamaño * 0.38,

        0,

        Math.PI * 2

    );


    ctx.fillStyle =
        "#704000";

    ctx.fill();


    ctx.restore();

}


// ======================================================
// CORAZÓN DE PARTÍCULAS
// ======================================================

function dibujarCorazon(
    cx,
    cy,
    escala
) {

    for (let i = 0; i < 650; i++) {

        const t =
            (Math.PI * 2 * i) /
            650;


        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            13 *
            Math.cos(t)
            - 5 *
            Math.cos(2 * t)
            - 2 *
            Math.cos(3 * t)
            - Math.cos(4 * t);


        const ruido =
            (Math.random() - 0.5) *
            2;


        const px =
            cx +
            (x + ruido) *
            escala;


        const py =
            cy -
            (y + ruido) *
            escala;


        ctx.beginPath();

        ctx.arc(

            px,

            py,

            Math.random() *
            1.7 +
            0.35,

            0,

            Math.PI * 2

        );


        ctx.fillStyle =
            `rgba(
                255,
                210,
                35,
                ${
                    0.4 +
                    Math.random() *
                    0.6
                }
            )`;


        ctx.fill();

    }

}


// ======================================================
// BRILLO DEL NÚCLEO
// ======================================================

function dibujarNucleo(
    cx,
    cy
) {

    const gradiente =
        ctx.createRadialGradient(

            cx,
            cy,
            0,

            cx,
            cy,
            170

        );


    gradiente.addColorStop(

        0,

        "rgba(255,245,130,0.8)"

    );


    gradiente.addColorStop(

        0.2,

        "rgba(255,205,40,0.45)"

    );


    gradiente.addColorStop(

        0.45,

        "rgba(255,170,20,0.18)"

    );


    gradiente.addColorStop(

        1,

        "rgba(255,150,0,0)"

    );


    ctx.beginPath();

    ctx.arc(

        cx,

        cy,

        170,

        0,

        Math.PI * 2

    );


    ctx.fillStyle =
        gradiente;

    ctx.fill();

}


// ======================================================
// ESFERA NEGRA
// ======================================================

function dibujarEsfera(
    x,
    y,
    radio
) {

    const gradiente =
        ctx.createRadialGradient(

            x - radio * 0.35,

            y - radio * 0.35,

            0,

            x,

            y,

            radio

        );


    gradiente.addColorStop(

        0,

        "#020202"

    );


    gradiente.addColorStop(

        0.70,

        "#0c0a06"

    );


    gradiente.addColorStop(

        0.92,

        "#171208"

    );


    gradiente.addColorStop(

        1,

        "#000000"

    );


    ctx.beginPath();

    ctx.arc(

        x,

        y,

        radio,

        0,

        Math.PI * 2

    );


    ctx.fillStyle =
        gradiente;

    ctx.fill();

}


// ======================================================
// TIEMPO
// ======================================================

let tiempo = 0;


// ======================================================
// ANIMACIÓN
// ======================================================

function animar() {

    requestAnimationFrame(animar);


    if (
        !segundaPantalla.classList.contains(
            "mostrar"
        )
    ) {

        return;

    }


    tiempo++;


    // ==================================================
    // SUAVIZADO
    // ==================================================

    camX +=
        (objetivoX - camX) *
        0.25;


    camY +=
        (objetivoY - camY) *
        0.25;


    // ==================================================
    // FONDO
    // ==================================================

    ctx.clearRect(

        0,
        0,
        ancho,
        alto

    );


    ctx.fillStyle =
        "#020201";


    ctx.fillRect(

        0,
        0,
        ancho,
        alto

    );


    // ==================================================
    // CENTRO FIJO
    // ==================================================

    const centroX =
        ancho / 2;


    const centroY =
        alto / 2;


    // ==================================================
    // NÚCLEO Y ESFERA
    //
    // IMPORTANTE:
    //
    // SE DIBUJAN PRIMERO.
    //
    // TODO LO DEMÁS PUEDE PASAR
    // POR ENCIMA DE ELLOS.
    // ==================================================

    dibujarNucleo(

        centroX,
        centroY

    );


    dibujarEsfera(

        centroX,
        centroY,
        52

    );


    // ==================================================
    // PARTÍCULAS
    // ==================================================

    particulas.forEach(p => {

        p.angulo +=
            p.velocidad;


        const profundidad =
            p.z +
            camX * 0.7;


        const escala =
            1 +
            profundidad *
            0.65;


        const desplazamientoX =
            camX *
            p.radio *
            0.35 *
            (1 + p.z);


        const desplazamientoY =
            camY *
            p.radio *
            0.20 *
            (1 + p.z);


        const x =
            centroX +

            Math.cos(
                p.angulo
            ) *

            p.radio *

            0.95 +

            desplazamientoX;


        const y =
            centroY +

            Math.sin(
                p.angulo
            ) *

            p.radio *

            0.52 +

            desplazamientoY;


        const tamaño =
            Math.max(

                0.3,

                p.tamaño *
                escala

            );


        const brillo =
            0.2 +

            Math.sin(

                tiempo *
                0.035 +
                p.offset

            ) *
            0.25;


        ctx.beginPath();

        ctx.arc(

            x,

            y,

            tamaño,

            0,

            Math.PI * 2

        );


        ctx.fillStyle =
            `rgba(
                255,
                210,
                45,
                ${
                    Math.max(
                        0.06,
                        brillo
                    )
                }
            )`;


        ctx.fill();

    });


    // ==================================================
    // CORAZÓN
    // ==================================================

    dibujarCorazon(

        centroX +
        camX * 10,

        centroY +
        camY * 10,

        Math.min(
            ancho,
            alto
        ) *
        0.008

    );


    // ==================================================
    // FLORES
    // ==================================================

    flores.forEach(f => {

        f.angulo +=
            f.velocidad;


        const profundidad =
            f.z +
            camX * 0.5;


        const escala =
            1 +
            profundidad *
            0.55;


        const x =
            centroX +

            Math.cos(
                f.angulo
            ) *

            f.radio +

            camX *
            f.radio *
            0.45 *
            (1 + f.z);


        const y =
            centroY +

            Math.sin(
                f.angulo
            ) *

            f.radio *
            0.58 +

            camY *
            f.radio *
            0.30 *
            (1 + f.z);


        const tamaño =
            Math.max(

                4,

                f.tamaño *
                escala

            );


        const alpha =
            0.35 +
            escala *
            0.3;


        dibujarFlor(

            x,

            y,

            tamaño,

            f.angulo,

            Math.min(
                1,
                alpha
            )

        );

    });


    // ==================================================
    // PALABRAS
    // ==================================================

    ctx.textAlign =
        "center";


    palabras.forEach(
        (palabra, i) => {

            const angulo =

                (
                    Math.PI * 2 /
                    palabras.length
                ) *
                i +

                tiempo *
                0.0007;


            const radio =

                Math.min(
                    ancho,
                    alto
                ) *
                0.43;


            const profundidad =

                Math.sin(
                    angulo
                );


            const x =

                centroX +

                Math.cos(
                    angulo
                ) *
                radio +

                camX *
                100 *
                profundidad;


            const y =

                centroY +

                Math.sin(
                    angulo
                ) *
                radio *
                0.60 +

                camY *
                70 *
                profundidad;


            const tamaño =

                12 +
                profundidad *
                4;


            ctx.font =

                `${Math.max(
                    9,
                    tamaño
                )}px Georgia`;


            ctx.fillStyle =

                `rgba(
                    255,
                    225,
                    130,
                    ${
                        0.3 +
                        Math.max(
                            0,
                            profundidad
                        ) *
                        0.5
                    }
                )`;


            ctx.fillText(

                palabra,

                x,

                y

            );

        }

    );

}


// ======================================================
// MOUSE
// ======================================================

document.addEventListener(
    "mousemove",
    e => {

        objetivoX =

            (
                e.clientX /
                window.innerWidth -
                0.5
            ) *
            1.5;


        objetivoY =

            (
                e.clientY /
                window.innerHeight -
                0.5
            ) *
            1.5;


        objetivoX =
            Math.max(
                -1,
                Math.min(
                    1,
                    objetivoX
                )
            );


        objetivoY =
            Math.max(
                -1,
                Math.min(
                    1,
                    objetivoY
                )
            );

            // Pequeño efecto de inercia espacial

        velocidadX += objetivoX * 0.002;
        velocidadY += objetivoY * 0.002;

        velocidadX *= 0.92;
        velocidadY *= 0.92;
        

    }
);






// ======================================================
// 📱 TOUCH / CELULAR
// ======================================================

let tocando = false;


document.addEventListener(
    "touchstart",
    e => {

        if (!e.touches.length) return;

        tocando = true;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchmove",
    e => {

        if (
            !tocando ||
            !e.touches.length
        ) return;


        const x =
            e.touches[0].clientX;

        const y =
            e.touches[0].clientY;


        // =========================================
        // CONTROL DIRECTO CON EL DEDO
        // =========================================

        objetivoX =
            (
                x /
                window.innerWidth -
                0.5
            ) *
            2;


        objetivoY =
            (
                y /
                window.innerHeight -
                0.5
            ) *
            2;


        objetivoX =
            Math.max(
                -1,
                Math.min(
                    1,
                    objetivoX
                )
            );


        objetivoY =
            Math.max(
                -1,
                Math.min(
                    1,
                    objetivoY
                )
            );

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    () => {

        tocando = false;

    }
);


// ======================================================
// INICIAR GALAXIA
// ======================================================

function iniciarGalaxia() {

    ajustarCanvas();

    crearParticulas();

    crearFlores();

    crearPalabras();

}


ajustarCanvas();

animar();

// ======================================================
// 🌻 PÉTALOS CAYENDO
// ======================================================

const petalosCaida = document.getElementById("petalosCaida");

function crearPetalo() {

    if (!petalosCaida) return;

    const petalo = document.createElement("span");

    petalo.classList.add("petalo-caido");

    // Posición horizontal aleatoria
    petalo.style.left =
        Math.random() * 100 + "%";

    // Tamaño aleatorio
    const tamaño =
        5 + Math.random() * 13;

    petalo.style.width =
        tamaño + "px";

    petalo.style.height =
        tamaño * 1.4 + "px";

    // Duración aleatoria
    const duracion =
        5 + Math.random() * 7;

    petalo.style.animationDuration =
        duracion + "s, " +
        (2 + Math.random() * 3) + "s";

    // Retraso aleatorio
    petalo.style.animationDelay =
        Math.random() * 5 + "s";

    petalosCaida.appendChild(petalo);

    // Eliminarlo cuando termine
    setTimeout(() => {

        petalo.remove();

    }, (duracion + 5) * 1000);

}


// Crear pétalos constantemente

setInterval(() => {

    if (
        segundaPantalla.classList.contains(
            "mostrar"
        )
    ) {

        crearPetalo();

    }

}, 350);

// ======================================================
// ✨ SORPRESA FINAL
// ======================================================

const sorpresa =
    document.getElementById("sorpresa");


setTimeout(() => {

    if (
        segundaPantalla.classList.contains(
            "mostrar"
        )
    ) {

        sorpresa.classList.add("mostrar");

        // Desaparece después de 7 segundos
        setTimeout(() => {

            sorpresa.classList.remove(
                "mostrar"
            );

        }, 7000);

    }

}, 25000);