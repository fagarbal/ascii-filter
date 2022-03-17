const main = async () => {
    const WIDTH = 56 * 2;
    const HEIGHT = (42 * 2) - (42 * 2 * 0.3);

    const render = document.createElement('div');

    const size = document.body.clientWidth / WIDTH;

    document.body.style.fontSize = `${size}pt`;
    document.body.style.lineHeight = `${size - (size * 0.2)}pt`;

    render.className = 'render';

    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');

    video.autoplay = true;
    video.playsinline = true;

    video.srcObject = mediaStream;
    const canvas = document.createElement('canvas');
    document.body.append(render);

    const ctx = canvas.getContext('2d');

    const density = "Ñ@#W$9876543210?!abc;:+=-,._ ".split('').reverse().join('');

    function mapRange(value, a, b, c, d) {
        value = (value - a) / (b - a);
        return c + value * (d - c);
    }

    const elements = [];

    for (let j = 0; j < HEIGHT; j++) {
        const div = document.createElement('div');

        const y = [];
        for (let i = 0; i < WIDTH; i++) {
            const span = document.createElement('span');
            span.className = 'char';
            y.push(span);
            div.append(span);
        }

        render.append(div);

        elements.push(y);
    }

    requestAnimationFrame(function loop() {
        ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);

        const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);

        for (let j = 0; j < imageData.height; j++) {
            for (let i = 0; i < imageData.width; i++) {
                const pixelIndex = (i + j * imageData.width) * 4;
                const r = imageData.data[pixelIndex + 0];
                const g = imageData.data[pixelIndex + 1];
                const b = imageData.data[pixelIndex + 2];

                const avg = (r + g + b) / 3;
                const len = density.length;

                const charIndex = Math.floor(mapRange(avg, 0, 255, 0, len));

                const c = density.charAt(charIndex);

                elements[j][i].innerHTML = c === ' ' ? '&nbsp;' : c;

                elements[j][i].style.color = `rgb(${r},${g},${b})`;

            }
        }

        requestAnimationFrame(loop);
    });
};


main();