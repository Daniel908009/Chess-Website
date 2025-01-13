
const canvas = document.getElementById('chessboard');
const ctx = canvas.getContext('2d');
function setup() {
    canvas.width = 800;
    canvas.height = 800;
}
function draw() {
    // drawing a test circle
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.stroke();
}