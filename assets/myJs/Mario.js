class Mario extends DynamicEntity {
    constructor(src, sx, sy, sWidth, sHeight, posX, posY, width, height) {
        super(src, sx, sy, sWidth, sHeight, posX, posY, width, height);

        /*переменные для расчёта прыжка*/
        this.posYAfterJump = 0;
        this.speedLeft = 3;
        this.speedRight = 3;
        this.readyToJump = true;
        this.jumpCount = 0;
        this.jumpLength = 50;
        this.jumpHeight = 0;
    }

    moveLeft(jump) {
        let stop;
        myArr.forEach(function(item) {
            if (item.posY + item.height > mario.posY &&
                item.posY < mario.posY + mario.height &&
                mario.posX <= item.posX + item.width + 4 &&
                mario.posX >= item.posX + item.width + 1) {
                stop = true;
            }
        })
        if (this.posX > 0 && !stop) {
            this.posX -= this.speedLeft;
        }
        if (!jump) {
            this.movementSpriteSheet([95, 125, 155, 185], 0.01);
        }
    }

    moveRight(jump) {
        let stop;
        myArr.forEach(function(item) {
            if (item.posY + item.height > mario.posY &&
                item.posY < mario.posY + mario.height &&
                mario.posX + mario.width >= item.posX - 4 &&
                mario.posX + mario.width <= item.posX - 1) {
                stop = true;
            }
        })
        if (this.posX < 460 && !stop) {
            this.posX += this.speedRight;
        }
        if (!jump) {
            this.movementSpriteSheet([245, 275, 305, 335], 0.01);
        }
    }

    jump(direction) {
        this.readyToJump = false;

        this.jumpCount++;
        this.jumpHeight = 2 * this.jumpLength * Math.sin(Math.PI * this.jumpCount / this.jumpLength);

        this.posY = this.posYAfterJump - this.jumpHeight;

        if (direction === 'left') {
            this.sx = 35;
            this.sy = 80;
        }

        if (direction === 'right') {
            this.sx = 395;
            this.sy = 80;
        }
    }

    interactionWithItem(item) {
        /*ПОДБИТЬ ВСЕ ПОГРЕШНОСТИ !!!!*/

        /*Остановка прыжка при попадании на объект*/
        if (mario.posX + mario.width >= item.posX &&
            mario.posX <= item.posX + item.width &&
            mario.posY + mario.height >= item.posY - 10 &&
            mario.posY + mario.height <= item.posY &&
            !mario.readyToJump) {

            mario.sx = 216;
            mario.sy = 0;
            mario.jumpCount = 0;
            mario.jumpHeight = 0;
            mario.readyToJump = true;
            keyObj['38'] = false;

        }
    }

    slipBlock() {
        let countX = 0;
        let countY = 0;
        myArr.forEach(function(item, i) {
            if (!(mario.posX + mario.width >= item.posX &&
                    mario.posX <= item.posX + item.width) &&
                mario.readyToJump) {
                countX++;
            }

            if (mario.posY + mario.height >= item.posY - 15 &&
                mario.posY + mario.height <= canvas.height - 2 &&
                mario.readyToJump) {
                countY++;
            }
        })
        if (countX == myArr.length && countY > 0) {
            mario.posY += 4;
        }

    }

    move() {

        // Если нажата <-
        if (keyObj['37']) {
            if (keyObj['38']) {
                this.moveLeft(1);
            }
            else {
                this.moveLeft(0);
            }
        }

        // Если нажата -> 
        if (keyObj['39']) {
            if (keyObj['38']) {
                this.moveRight(1);
            }
            else {
                this.moveRight(0);
            }
        }

        // Если нажата клавиша вверх ^
        if (keyObj['38']) {
            if (keyObj['39']) {
                this.jump('right');
            }
            else if (keyObj['37']) {
                this.jump('left');
            }
            else {
                this.jump();
            }
        }
    }

    addLife() {

    }

    removeLife() {

    }
}
