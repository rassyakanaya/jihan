const main = document.querySelector("main");
const container = document.querySelector("#bola-container");

const jumlahBola = 5;
const size = 50;

const bolas = [];


// Random angka antara min sampai max
function random(min, max) {
    return Math.random() * (max - min) + min;
}


// Random antara -1 atau 1
function randomDirection() {
    return Math.random() < 0.5 ? -1 : 1;
}


// Collision animation
function hit(impact, direction) {
    impact.classList.remove(
        "hit-left",
        "hit-right",
        "hit-top",
        "hit-bottom"
    );

    // restart animation
    void impact.offsetWidth;

    impact.classList.add(`hit-${direction}`);
}


// Buat bola
function createBola() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("bola-wrapper");

    const impact = document.createElement("div");
    impact.classList.add("impact");

    const image = document.createElement("img");
    image.src = "Assets/bola-bola-ubi.png";
    image.classList.add("bola-bola-ubi");

    impact.appendChild(image);
    wrapper.appendChild(impact);
    container.appendChild(wrapper);


    // ukuran area main
    const maxX = main.clientWidth - size;
    const maxY = main.clientHeight - size;


    // random spawn position
    const x = random(0, maxX);
    const y = random(0, maxY);


    // random speed + direction
    const speedX = random(1.5, 3.5) * randomDirection();
    const speedY = random(1.5, 3.5) * randomDirection();


    bolas.push({
        wrapper,
        impact,

        x,
        y,

        speedX,
        speedY
    });
}


// Generate 5 bola
for (let i = 0; i < jumlahBola; i++) {
    createBola();
}


// Animation loop
function animate() {
    const mainWidth = main.clientWidth;
    const mainHeight = main.clientHeight;


    bolas.forEach((bola) => {

        bola.x += bola.speedX;
        bola.y += bola.speedY;


        // KANAN
        if (bola.x + size >= mainWidth) {
            bola.x = mainWidth - size;
            bola.speedX *= -1;

            hit(bola.impact, "right");
        }


        // KIRI
        if (bola.x <= 0) {
            bola.x = 0;
            bola.speedX *= -1;

            hit(bola.impact, "left");
        }


        // BAWAH
        if (bola.y + size >= mainHeight) {
            bola.y = mainHeight - size;
            bola.speedY *= -1;

            hit(bola.impact, "bottom");
        }


        // ATAS
        if (bola.y <= 0) {
            bola.y = 0;
            bola.speedY *= -1;

            hit(bola.impact, "top");
        }


        bola.wrapper.style.transform =
            `translate(${bola.x}px, ${bola.y}px)`;
    });


    requestAnimationFrame(animate);
}


animate();





const jihan = document.querySelector(".jihan");

const hoverSound = new Audio("Assets/sound-effect.mp3");

jihan.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
});