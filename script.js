window.addEventListener("load", function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var img = new Image();
    var images = [];
    var enemies = [];
    var mouseX, mouseY;
    
    var woosh = new Audio();
    var laser = new Audio();

    var cursor = new Image();
    var sources = ["blossom.png", "buttercup.png", "bubbles.png"];

    function preloadImages() {
        for (i = 0; i < sources.length; i++) {
            images[i] = new Image();
            images[i].src = "media/image/" + sources[i];
        }
    }

    preloadImages();

    setInterval(animate, 10);

    function randomImage() {
        return Math.floor(Math.random() * 3)
    };

    laser.src = "media/sound/" + "laser.wav";
    woosh.src = "media/sound/" + "woosh.wav";

    cursor.src = "media/image/" + "crosshair.png";


    addEventListener("mousemove", function (evt) {
        mouseX = evt.clientX - canvas.offsetLeft;
        mouseY = evt.clientY - canvas.offsetTop;
    })

    addEventListener("mousedown", function (evt) {
        laser.play();
        for (i = 0; i < enemies.length; i++) {
            if (mouseX >= enemies[i].x && mouseY >= enemies[i].y && mouseX <= enemies[i].x + enemies[i].w && mouseY <= enemies[i].y + enemies[i].w) {
                enemies.splice(i, 1);
                woosh.play();
            }
        }

    })

    function animate() {
        if (Math.random() < 0.03) {
            var a = Object.create(Enemy);
            a.y = -100;
            a.x = Math.random() * 800;
            a.yspeed = 1 + Math.random() * 3;
            a.w *= a.yspeed * 4;
            a.h *= a.yspeed * 4;
            a.img = Math.floor(Math.random() * 3);
            enemies.push(a);
        }
        context.clearRect(0, 0, 800, 800);

        for (i = 0; i < enemies.length; i++) {

            enemies[i].update();
            enemies[i].draw(context, images[enemies[i].img]);
            if (enemies[i].y > 800) {
                enemies.splice(i, 1);
            }
        }
        context.drawImage(cursor, mouseX - 25, mouseY - 25)
    }
})