import logo from '../Media/jr-logo.png';

let canvasWidth, canvasHeight, x, y, xSpeed, ySpeed;
const canvasId = 'bouncing-logo-canvas';
const logoId = 'bouncing-logo';

function init() {
    x = 0;
    y = 0;
    xSpeed = 1;
    ySpeed = 1;

    window.requestAnimationFrame(step);
}

function step() {
    drawImage();
    
    x = x + xSpeed;
    y = y + ySpeed;

    if (x + 200 >= canvasWidth || x == -35) {
        xSpeed = -xSpeed;
    }
    if (y + 155 >= canvasHeight || y == -65) {
        ySpeed = -ySpeed;
    }

    window.requestAnimationFrame(step);
}

function drawImage() {
    let canvas = document.getElementById(canvasId);
    let context = canvas.getContext('2d');
    let image = document.getElementById(logoId);

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    console.log(x + ', ' + y);
    context.drawImage(image, x, y);
}

export default function BouncingLogo(props) {
    canvasWidth = props.width;
    canvasHeight = props.height;
    window.onload = init;

    return (
        <canvas id={canvasId} width={canvasWidth} height={canvasHeight}>
            <img src={logo} id={logoId} alt='img'/>
        </canvas>
    );
}