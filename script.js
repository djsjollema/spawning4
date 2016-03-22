window.addEventListener("load", function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var img = new Image();
    var images = [];
    var enemies = [];
    var mouseX, mouseY;

    // de woosh zou ik ook in de Enemy.js meenemen
    var woosh = new Audio();
    var laser = new Audio();

    var cursor = new Image();
    var sources = ["media/image/blossom.png", "media/image/buttercup.png", "media/image/bubbles.png"];

    setInterval(animate, 10);

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
            createRandomEnemy();
        }
        render();
    }

    function createRandomEnemy(){
        var newEnemy = Object.create(Enemy),
            imageID = Math.floor(Math.random() * sources.length);

        newEnemy.setImage(sources[imageID]);
        newEnemy.y = -100;
        newEnemy.x = Math.random() * 800;
        newEnemy.yspeed = 1 + Math.random() * 3;
        newEnemy.w *= newEnemy.yspeed * 4;
        newEnemy.h *= newEnemy.yspeed * 4;
        enemies.push(newEnemy);
    }

    function render(){
        // specifieke render functie
        // zou ook in een render object mogen (CanvasRenderer)
        var l = enemies.length,
            currentEnemy;

        context.clearRect(0, 0, 800, 800);

        for (var i = l-1; i >= 0; i--) {
            // netter om met een referentie te werken (leesbaarder)
            currentEnemy = enemies[i];
            currentEnemy.update();

            // ik heb het 'tekenen' van de plaatjes hier naar toe gehaald
            // zo heb je niet een harde afhankelijkheid in je Enemy.js op de canvas
            context.drawImage(currentEnemy.img,currentEnemy.x,currentEnemy.y,currentEnemy.w,currentEnemy.h);

            if (enemies[i].y > 800) {
                enemies.splice(i, 1);
            }
        }
        context.drawImage(cursor, mouseX - 25, mouseY - 25);
    }
});