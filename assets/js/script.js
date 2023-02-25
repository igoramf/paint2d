let currentColor = `black`;
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

document.querySelectorAll(`.color`).forEach((item) => {
    item.addEventListener('click', setColor);
})

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

function setColor(e){
    let color = e.target.getAttribute(`data-color`);
    currentColor = color;
    
    document.querySelector('.color.active').classList.remove(`active`);

    e.target.classList.add('active');
};

screen.addEventListener('mousedown', downEvent);
screen.addEventListener('mouseup', upEvent);
screen.addEventListener('mousemove', moveEvent);

function downEvent(e){
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
};

function moveEvent(e){

    if(canDraw){
        draw(e.pageX, e.pageY);
    };
};

function upEvent(){
    canDraw = false;
};


function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = `round`;
    ctx.moveTo(mouseX,mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}


document.querySelector('.clear').addEventListener('click',()=> {
   ctx.setTransform(1, 0, 0, 1, 0, 0);
   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
});