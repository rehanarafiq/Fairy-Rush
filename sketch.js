var bg, bgImg;
var dragon, dragonImg, dragonGroup;
var fairy, fairyImg;
var dust, dustImg;
var dust2, dust2Img;
var dustGroup;
var dustGroup2;
var gem, gemImg;
var gemGroup;
var score = 0;
var gameState = "PLAY";


function preload() {
    bgImg = loadImage("Bg2.jpg");
    dragonImg = loadImage("Dragon.png");
    fairyImg = loadImage("Fairy.png");
    dustImg = loadImage("Magic dust.png");
    dust2Img = loadImage("Magic dust 2.png");
    gemImg = loadImage("Gem1.png");

    dragonGroup = new Group();
    dustGroup = new Group();
    dustGroup2 = new Group();
    gemGroup = new Group();

}

function setup() {
    createCanvas(700, 400);

    bg = createSprite(350, 200);
    bg.addImage("bg", bgImg);
    bg.scale = 5
    bg.velocityX = -3;

    fairy = createSprite(60, 200);
    fairy.addImage("fairy", fairyImg);
    fairy.scale = 0.25;

}

function draw() {
    background("pink");
    drawSprites();
    textSize(17);
    fill(0);
    text("Score : " + score, 600, 20);
    if (gameState === "PLAY") {

        if (bg.x < 300) {
            bg.x = 400;
        }

        if (keyDown("up")) {
            fairy.y = fairy.y - 5;
        }

        if (keyDown("down")) {
            fairy.y = fairy.y + 5
        }

        if (gemGroup.isTouching(fairy)) {
            gemGroup.destroyEach();
            score = score + 2;
        }

        if (dustGroup.isTouching(fairy)) {
            dustGroup.destroyEach();
            score = score + 1;
        }

        if (dustGroup2.isTouching(fairy)) {
            dustGroup2.destroyEach();
            score = score + 1;
        }

        if (dragonGroup.isTouching(fairy)) {
            fairy.visible = false;
            gameState = "END";
        }

        spawnDragons();

        spawnDust();
        spawnBlueDust();

        spawnGems();
    }
    if (gameState === "END") {
        stroke("Purple");
        fill("Purple");

        textSize(50);
        text("Game over", 230, 200);
        text("Press r to restart", 180, 250);
        dragon.visible = false;
        dust.visible = false;
        dust2.visible = false;
        gem.visible = false;
        bg.velocityX = 0;
        if (keyDown("r")) {
            reset();
        }
    }

}




function spawnDragons() {
    if (frameCount % 70 === 0) {
        dragon = createSprite(600, -25);
        dragon.addImage("dragon", dragonImg);
        dragon.scale = 0.1;

        dragon.y = Math.round(random(50, 300));

        dragon.velocityX = -7;

        dragon.lifetime = 800;

        dragon.depth = fairy.depth;
        fairy.depth = fairy.depth + 1;
        dragonGroup.add(dragon);
    }
}

function spawnDust() {
    if (frameCount % 60 === 0) {
        dust = createSprite(600, -25)
        dust.addImage("dust", dustImg);
        dust.scale = 0.15;

        dust.y = Math.round(random(10, 133));

        dust.velocityX = -8;

        dust.lifetime = 800;

        dust.depth = fairy.depth;
        fairy.depth = fairy.depth + 1;
        dustGroup.add(dust);
    }
}

function spawnBlueDust() {
    if (frameCount % 80 === 0) {
        dust2 = createSprite(600, -25);
        dust2.addImage("dust2", dust2Img);
        dust2.scale = 0.1;

        dust2.y = Math.round(random(200, 266));

        dust2.velocityX = -8;

        dust2.lifetime = 800;

        dust2.depth = fairy.depth;
        fairy.depth = fairy.depth + 1;

        dustGroup2.add(dust2);
    }
}

function spawnGems() {
    if (frameCount % 100 === 0) {
        gem = createSprite(600, -25);
        gem.addImage("gem", gemImg);
        gem.scale = 0.15;

        gem.y = Math.round(random(270, 380));

        gem.velocityX = -8;

        gem.lifetime = 800;

        gem.depth = fairy.depth;
        fairy.depth = fairy.depth + 1;

        gemGroup.add(gem);
    }
}

function reset() {
    gameState = "PLAY";
    fairy.visible = true;
    fairy.x = 60;
    fairy.y = 200;
    dragonGroup.destroyEach();
    dustGroup.destroyEach();
    dustGroup2.destroyEach();
    gemGroup.destroyEach();
    bg.velocityX = -3;
    score = 0;
}