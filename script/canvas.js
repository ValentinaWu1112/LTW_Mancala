const tela = document.getElementById('mancala');
gc = tela.getContext('2d'),
    dashLen = 350,
    dashOffset = dashLen,
    speed = 5,
    txt = "Mancala",
    x = 5,
    i = 0;
gc.globalAlpha = 2 / 3;
gc.strokeStyle = "dark grey";
gc.fillStyle = "#c78e47";
gc.font = 'bold 50px Aclonica';

/*
inspired from this:
https://stackoverflow.com/questions/29911143/how-can-i-animate-the-drawing-of-text-on-a-web-page 
*/
(function draw() {
    //setTimeout(gc.clearRect(0, 0, 300, 100), 7000);
    gc.setLineDash([dashLen - dashOffset, dashOffset - speed]);
    dashOffset -= speed;
    gc.strokeText(txt[i], x, 50);

    if (dashOffset > 0) {
        requestAnimationFrame(draw);
    } else {
        gc.fillText(txt[i], x, 50);
        dashOffset = dashLen;
        x += gc.measureText(txt[i++]).width;
        if (i < txt.length) requestAnimationFrame(draw);
    }
})();