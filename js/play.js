/**
 * Selects the button element with the ID "wooden-button-start".
 * @type {HTMLButtonElement}
 * The header and footer will be hidden when the button is clicked.
 * On over on the header part of the screen, the header and footer will be displayed.
 */

import Player from "./classes/player.js";
import Platform from "./classes/platform.js";
import GenericObject from "./classes/background.js";
import MiTrash from "./classes/mibin.js";
import Particle from "./classes/particle.js";
import PowerUp from "./classes/powerUp.js";
import Weapon from "./classes/weapon.js";
import Garbage from "./classes/garbage.js";
import StopWatch from "./classes/stopwatch.js";
import { loadImage, loadImageAsync } from "./utils/loadImage.js";
import {
  collisionPlatform,
  collisionMinionTop,
  collisionMinionSide,
  collisionPlatformCircle,
  blockCollision,
  blockCollisionSide,
  rectangularCollision,
} from "./utils/collisionDetection.js";
import { level1, level2 } from "./constants/levels.js";

// !---------------DOM ELEMENTS----------------
const canvas = document.querySelector("#game");
const hero = document.querySelector("#play-bg");
const button = document.querySelector("#wooden-button-start");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

// !---------------CANVAS SETUP----------------
const context = canvas.getContext("2d");

//* Adjust canvas size to window size
canvas.width = 1080;
canvas.height = 720;

// !---------------CONSTANTS----------------
const Players = {
  Archer: {
    idle: loadImage("../assets/archer/Idle.png"),
    walk: loadImage("../assets/archer/Walk.png"),
    idleLeft: loadImage("../assets/archer/IdleLeft.png"),
    walkLeft: loadImage("../assets/archer/WalkLeft.png"),
    jumpLeft: loadImage("../assets/archer/JumpLeft.png"),
    jump: loadImage("../assets/archer/JumpRight.png"),
    shoot: loadImage("../assets/archer/Shot.png"),
    Power: {
      idle: loadImage("../assets/archer/PowerUp/IdleRight.png"),
      walk: loadImage("../assets/archer/PowerUp/WalkRight.png"),
      idleLeft: loadImage("../assets/archer/PowerUp/IdleLeft.png"),
      walkLeft: loadImage("../assets/archer/PowerUp/WalkLeft.png"),
      jumpLeft: loadImage("../assets/archer/PowerUp/JumpLeft.png"),
      jump: loadImage("../assets/archer/PowerUp/JumpRight.png"),
    },
  },
  Wizard: {
    idle: loadImage("../assets/wizard/Idle.png"),
    walk: loadImage("../assets/wizard/Walk.png"),
  },
  Swordman: {
    idle: loadImage("../assets/swordman/Idle.png"),
    walk: loadImage("../assets/swordman/Walk.png"),
  },
};

const enemy = loadImage("../assets/SlimeMediumBlue.png");

const blueCrystal = loadImage("../assets/BlueCrystal.png");

// !---------------MAIN FUNCTION----------------
async function main() {
  // !----------------- GAME LOGIC -----------------
  let isPressed = { left: false, right: false };
  let lastKeyPressed = null;
  let isJumping = false;
  let isShooting = false;
  const gravity = 4;
  let distance = 0;

  const playerSpeed = 8;
  // !----------------- OBJECTS -----------------
  // * Platforms

  const heartImage = {
    full: loadImage("../assets/heart/heart.png"),
    empty: loadImage("../assets/heart/background.png"),
  };

  const images = {
    level1: {
      background: await loadImageAsync("../assets/background/Forest.png"),
      smallBlock: await loadImageAsync("../assets/level1/oneBlock.png"),
      largeBlock: await loadImageAsync("../assets/level1/longBlock.png"),
      longPlatform: await loadImageAsync("../assets/level1/lgPlatform.png"),
      smallPlatform: await loadImageAsync("../assets/level1/smPlatform.png"),
      tallPlatform: await loadImageAsync("../assets/level1/tallPlatform.png"),
      garbage: loadImage("../assets/garbage1.png"),
    },
    level2: {
      background: await loadImageAsync("../assets/background/UnderTheSea.png"),
      smallBlock: await loadImageAsync("../assets/level2/oneBlock.png"),
      largeBlock: await loadImageAsync("../assets/level2/longBlock.png"),
      longPlatform: await loadImageAsync("../assets/level2/lgPlatform.png"),
      smallPlatform: await loadImageAsync("../assets/level2/smPlatform.png"),
      tallPlatform: await loadImageAsync("../assets/level2/tallPlatform.png"),
      garbage: loadImage("../assets/garbage1.png"),
    },
  };
  const gapSize = 250;

  const house = await loadImageAsync("../assets/housebrick.png");

  // TODO: Refactors the platforms into an array of objects.
  let platforms = [];
  // * Objects
  let Objects = [];
  // * Player
  let player;
  // * Enemies
  let minions = [];

  let particles = [];

  let powerUps = [];

  let weapons = [];

  let garbages = [];

  let platformsMap = [];

  let hearts = [];

  let timer;

  let sPoints;

  let endPoint;

  let platformDistance;

  let life;

  let game = {
    disableUserInput: false,
  };

  //* Animates the game by clearing the canvas and updating the player.
  async function init() {
    distance = 0;

    sPoints = 0;

    timer = new StopWatch(canvas, context, 900, 100);
    timer.reset();

    life = 3;

    game.disableUserInput = false;
    platforms = [
      new Platform(
        canvas,
        context,
        images.level1.largeBlock,
        1331,
        300,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.largeBlock,
        2947 + gapSize,
        300,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.largeBlock,
        5271 + images.level1.smallPlatform.width + gapSize,
        300,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.smallBlock,
        8178 + images.level1.smallPlatform.width + gapSize,
        300,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.largeBlock,
        8178 + images.level1.smallPlatform.width + gapSize * 2.5,
        400,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.smallBlock,
        8178 + images.level1.smallPlatform.width + gapSize * 4.5,
        400,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.largeBlock,
        11247 + images.level1.smallPlatform.width + gapSize * 1.3,
        500,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.smallBlock,
        13000 - images.level1.smallBlock.width,
        650,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.largeBlock,
        17937 - images.level1.largeBlock.width - images.level1.largeBlock.width,
        300,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.largeBlock,
        17937 - images.level1.largeBlock.width,
        300,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.largeBlock,
        19801,
        200,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.smallBlock,
        19801 + images.level1.largeBlock.width,
        200,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.smallBlock,
        21670 + images.level1.smallPlatform.width + gapSize,
        250,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.smallBlock,
        21670 + images.level1.smallPlatform.width + gapSize * 2.4,
        250,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.largeBlock,
        21670 + images.level1.smallPlatform.width + gapSize * 3.5,
        250,
        true,
        false
      ),
      new Platform(
        canvas,
        context,
        images.level1.smallBlock,
        21670 + images.level1.smallPlatform.width + gapSize * 5.3,
        500,
        true,
        false
      ),
    ];

    hearts = [
      new GenericObject(canvas, context, heartImage.full, 900, 10, 50, 50),
      new GenericObject(canvas, context, heartImage.full, 960, 10, 50, 50),
      new GenericObject(canvas, context, heartImage.full, 1020, 10, 50, 50),
    ];

    platformsMap = level1;

    platformDistance = 0;

    endPoint = new GenericObject(canvas, context, house, 24000, 100, 600, 600);

    platformsMap.forEach((symbol) => {
      switch (symbol) {
        case "lg":
          platforms.push(
            new Platform(
              canvas,
              context,
              images.level1.longPlatform,
              platformDistance - 3,
              canvas.height - 159,
              false,
              true,
              platformDistance
            )
          );
          platformDistance += images.level1.longPlatform.width;
          break;
        case "gap":
          platformDistance += gapSize;
          break;
        case "sm":
          platforms.push(
            new Platform(
              canvas,
              context,
              images.level1.smallPlatform,
              platformDistance - 3,
              canvas.height - 159,
              false,
              true,
              platformDistance
            )
          );
          platformDistance += images.level1.smallPlatform.width - 3;
          break;
        case "tall":
          platforms.push(
            new Platform(
              canvas,
              context,
              images.level1.tallPlatform,
              platformDistance - 3,
              canvas.height - images.level1.tallPlatform.height / 1.5,
              false,
              true,
              platformDistance
            )
          );
          platformDistance += images.level1.tallPlatform.width - 3;
          break;
        case "xtall":
          platforms.push(
            new Platform(
              canvas,
              context,
              images.level1.tallPlatform,
              platformDistance - 3,
              canvas.height - images.level1.tallPlatform.height,
              false,
              true,
              platformDistance
            )
          );
          platformDistance += images.level1.tallPlatform.width - 3;
          break;
      }
    });
    // * Objects
    Objects = [
      new GenericObject(canvas, context, images.level1.background, 0, 0),
      new GenericObject(canvas, context, images.level1.garbage, 25, 10, 50, 50),
    ];

    minions = [
      new MiTrash(
        canvas,
        context,
        gravity,
        1431,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 100, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        1869 + images.level1.smallPlatform.width - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 500, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        2407 + images.level1.smallPlatform.width - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 500, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        4483 + images.level1.smallPlatform.width - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 500, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        5271 + images.level1.smallPlatform.width - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 500, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        6559 + images.level1.longPlatform.width - 150,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 800, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        6559 + images.level1.longPlatform.width - 100,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 800, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        6559 + images.level1.longPlatform.width - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 800, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        11297 + images.level1.smallPlatform.width - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 1000, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        13911 + images.level1.longPlatform.width - 100,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 900, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        13911 + images.level1.longPlatform.width - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 900, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        14992 + images.level1.longPlatform.width - 100,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 900, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        14992 + images.level1.longPlatform.width - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 900, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        17937 - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 300, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        17937 + images.level1.smallPlatform.width - 50,
        535,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 1200, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        17937 + images.level1.smallPlatform.width - 125,
        535,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 1200, traveled: 0 }
      ),
      new MiTrash(
        canvas,
        context,
        gravity,
        19801 + images.level1.largeBlock.width - 50,
        100,
        enemy,
        {
          x: -1,
          y: 0,
        },
        { limit: 200, traveled: 0 }
      ),
    ];

    garbages = [
      new Garbage(canvas, context, gravity, 1400, 100, images.level1.garbage),
      new Garbage(canvas, context, gravity, 2300, 100, images.level1.garbage),
      new Garbage(
        canvas,
        context,
        gravity,
        2947 + gapSize + 100,
        100,
        images.level1.garbage
      ),
      new Garbage(canvas, context, gravity, 4700, 100, images.level1.garbage),
      new Garbage(
        canvas,
        context,
        gravity,
        5271 + images.level1.smallPlatform.width + gapSize,
        100,
        images.level1.garbage
      ),
      new Garbage(canvas, context, gravity, 6800, 100, images.level1.garbage),
      new Garbage(
        canvas,
        context,
        gravity,
        7200 + images.level1.smallPlatform.width + gapSize,
        100,
        images.level1.garbage
      ),
      new Garbage(canvas, context, gravity, 8178, 100, images.level1.garbage),
      new Garbage(
        canvas,
        context,
        gravity,
        8278 + images.level1.smallPlatform.width + gapSize * 2.5,
        100,
        images.level1.garbage
      ),
      new Garbage(
        canvas,
        context,
        gravity,
        11397 + images.level1.smallPlatform.width + gapSize * 1.3,
        100,
        images.level1.garbage
      ),
      new Garbage(canvas, context, gravity, 14992, 100, images.level1.garbage),
      new Garbage(
        canvas,
        context,
        gravity,
        17937 - 800,
        50,
        images.level1.garbage
      ),
      new Garbage(canvas, context, gravity, 17737, 50, images.level1.garbage),
      new Garbage(
        canvas,
        context,
        gravity,
        17937 - images.level1.largeBlock,
        535,
        images.level1.garbage
      ),

      new Garbage(
        canvas,
        context,
        gravity,
        21332 - images.level1.largeBlock,
        100,
        images.level1.garbage
      ),
      new Garbage(
        canvas,
        context,
        gravity,
        21832 - images.level1.largeBlock,
        100,
        images.level1.garbage
      ),
    ];

    player = new Player(gravity, canvas, context, Players.Archer, 100, 100);

    particles = [];

    powerUps = [
      new PowerUp(canvas, context, 0.8, 400, 500, blueCrystal, {
        x: 0,
        y: 0,
      }),
      new PowerUp(canvas, context, 0.8, 3995, 100, blueCrystal, {
        x: 0,
        y: 0,
      }),
      new PowerUp(canvas, context, 0.8, 13573, 100, blueCrystal, {
        x: 0,
        y: 0,
      }),
      new PowerUp(canvas, context, 0.8, 18925, 100, blueCrystal, {
        x: 0,
        y: 0,
      }),
    ];

    weapons = [];
  }

  async function initLevel2() {
    distance = 0;
    player = new Player(gravity, canvas, context, Players.Archer, 100, 100);

    sPoints = 0;

    timer = new StopWatch(canvas, context, 900, 100);
    timer.reset();

    life = 3;

    game.disableUserInput = false;
    platforms = [];

    hearts = [
      new GenericObject(canvas, context, heartImage.full, 900, 10, 50, 50),
      new GenericObject(canvas, context, heartImage.full, 960, 10, 50, 50),
      new GenericObject(canvas, context, heartImage.full, 1020, 10, 50, 50),
    ];

    platformsMap = level2;

    platformDistance = 0;

    endPoint = new GenericObject(canvas, context, house, 24000, 100, 600, 600);

    platformsMap.forEach((symbol) => {
      switch (symbol) {
        case "lg":
          platforms.push(
            new Platform(
              canvas,
              context,
              images.level2.longPlatform,
              platformDistance - 3,
              canvas.height - 159,
              false,
              true,
              platformDistance
            )
          );
          platformDistance += images.level2.longPlatform.width;
          break;
        case "gap":
          platformDistance += gapSize;
          break;
        case "sm":
          platforms.push(
            new Platform(
              canvas,
              context,
              images.level2.smallPlatform,
              platformDistance - 3,
              canvas.height - 159,
              false,
              true,
              platformDistance
            )
          );
          platformDistance += images.level2.smallPlatform.width - 3;
          break;
        case "tall":
          platforms.push(
            new Platform(
              canvas,
              context,
              images.level2.tallPlatform,
              platformDistance - 3,
              canvas.height - images.level2.tallPlatform.height / 1.5,
              false,
              true,
              platformDistance
            )
          );
          platformDistance += images.level2.tallPlatform.width - 3;
          break;
        case "xtall":
          platforms.push(
            new Platform(
              canvas,
              context,
              images.level2.tallPlatform,
              platformDistance - 3,
              canvas.height - images.level2.tallPlatform.height,
              false,
              true,
              platformDistance
            )
          );
          platformDistance += images.level2.tallPlatform.width - 3;
          break;
      }
    });
    // * Objects
    Objects = [
      new GenericObject(canvas, context, images.level2.background, 0, 0),
      new GenericObject(canvas, context, images.level2.garbage, 25, 10, 50, 50),
    ];

    minions = [];

    garbages = [];

    particles = [];

    powerUps = [];

    weapons = [];
  }
  // !----------------- ANIMATION LOOP -----------------
  function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = "beige";

    context.fillRect(0, 0, canvas.width, canvas.height);

    Objects.forEach((object) => {
      object.draw();
    });
    platforms.forEach((platform) => {
      platform.update();
      platform.velocity.x = 0;
    });
    // * EndPoint
    if (endPoint) {
      endPoint.update();
      endPoint.velocityX = 0;

      if (rectangularCollision(player, endPoint) && !game.disableUserInput) {
        game.disableUserInput = true;
      }
    }

    hearts.forEach((heart) => {
      heart.draw();
    });

    context.font = "35px Arial black";
    context.fillStyle = "white";
    context.fillText(`x ${sPoints}`, 85, 50);

    // * Render Garbage and Collision
    garbages.forEach((garbage, index) => {
      if (rectangularCollision(player, garbage)) {
        setTimeout(() => {
          garbages.splice(index, 1);
          sPoints += 10;
        }, 0);
      } else {
        garbage.update();
      }
    });
    powerUps.forEach((powerUp, index) => {
      if (rectangularCollision(player, powerUp)) {
        player.powerUp = true;
        player.invincibilitySpan = 1000;
        setTimeout(() => {
          powerUps.splice(index, 1);
        }, 0);
      } else {
        powerUp.update();
      }
    });
    if (player.powerUp) {
      if (player.invincibilitySpan <= 0) {
        player.powerUp = false;
        player.invincible = false;
      }
    }

    minions.forEach((minion, index) => {
      minion.update();

      // * Collision Between Minion and Player

      if (collisionMinionTop(player, minion)) {
        player.velocity.y = -40;
        setTimeout(() => {
          minions.splice(index, 1);
          // * Particles
          for (let i = 0; i < 50; i++) {
            particles.push(
              new Particle(
                canvas,
                context,
                gravity,
                minion.position.x + minion.width / 2,
                minion.position.y + minion.height / 2,
                {
                  x: Math.random() * 10 - 7,
                  y: Math.random() * 12 - 5,
                },
                Math.random() * 4
              )
            );
          }
        }, 0);
      } else if (collisionMinionSide(player, minion)) {
        if (player.powerUp) {
          player.invincible = true;
          player.powerUp = false;
          setTimeout(() => {
            player.invincible = false;
          }, 500);
        } else if (!player.invincible) {
          for (let index = 0; index < hearts.length; index++) {
            if (hearts[index].image === heartImage.full && life > 1) {
              hearts.splice(index, 1);
              player.invincible = true;

              life--;

              setTimeout(() => {
                player.invincible = false;
              }, 1000);
              break;
            } else {
              timer.stop();
              setTimeout(() => {
                initLevel2();
              }, 0);
            }
          }
        }
      } // * Collision Between Minion and Player While invincible
    });

    // * Collision Between Minion and Arrow
    weapons.forEach((weapon, weaponIndex) => {
      minions.forEach((minion, index) => {
        if (rectangularCollision(weapon, minion)) {
          player.velocity.y = -40;
          setTimeout(() => {
            minions.splice(index, 1);
            weapons.splice(weaponIndex, 1);
            // * Particles
            for (let i = 0; i < 50; i++) {
              particles.push(
                new Particle(
                  canvas,
                  context,
                  gravity,
                  minion.position.x + minion.width / 2,
                  minion.position.y + minion.height / 2,
                  {
                    x: Math.random() * 10 - 7,
                    y: Math.random() * 12 - 5,
                  },
                  Math.random() * 4
                )
              );
            }
          }, 0);
        }
      });
      if (weapon.position.x > canvas.width) {
        weapons.splice(weaponIndex, 1);
      }
    });

    // !----------------- PLAYER MOVEMENT PARALLAX  -----------------
    // TODO: Refactor the parallax effect into a function.
    let hitSide = false;

    if (isPressed.right && player.position.x < 500) {
      player.velocity.x = playerSpeed;
      timer.start();
    } else if (
      (isPressed.left && player.position.x > 55) ||
      (isPressed.left && distance === 0 && player.position.x > 0)
    ) {
      player.velocity.x = -playerSpeed;
    } else {
      player.velocity.x = 0;
      if (isPressed.right) {
        for (let i = 0; i < platforms.length; i++) {
          const platform = platforms[i];
          platform.velocity.x = -playerSpeed;
          if (
            platform.block &&
            blockCollisionSide({ object: player, platform, margin: 1 })
          ) {
            platforms.forEach((platform) => {
              platform.velocity.x = 0;
            });

            hitSide = true;
            break;
          }
          if (
            platform.platformer &&
            blockCollisionSide({ object: player, platform, margin: 1.1 })
          ) {
            platforms.forEach((platform) => {
              platform.velocity.x = 0;
            });

            hitSide = true;
            break;
          }
        }
        if (!hitSide) {
          distance += playerSpeed;

          endPoint.velocityX = -playerSpeed;

          powerUps.forEach((powerUp) => {
            powerUp.position.x -= playerSpeed;
          });

          minions.forEach((minion) => {
            minion.position.x -= playerSpeed;
          });

          garbages.forEach((garbage) => {
            garbage.position.x -= playerSpeed;
          });
          particles.forEach((particle) => {
            particle.position.x -= playerSpeed;
          });
        }
      } else if (isPressed.left && distance > 0) {
        for (let i = 0; i < platforms.length; i++) {
          const platform = platforms[i];
          platform.velocity.x = playerSpeed;

          if (
            platform.block &&
            blockCollisionSide({ object: player, platform })
          ) {
            platforms.forEach((platform) => {
              platform.velocity.x = 0;
            });

            hitSide = true;
            break;
          }
          if (
            platform.platformer &&
            blockCollisionSide({ object: player, platform, margin: 1.1 })
          ) {
            platforms.forEach((platform) => {
              platform.velocity.x = 0;
            });

            hitSide = true;
            break;
          }
        }

        if (!hitSide) {
          distance -= playerSpeed;

          endPoint.velocityX = playerSpeed;

          powerUps.forEach((powerUp) => {
            powerUp.position.x += playerSpeed;
          });

          minions.forEach((minion) => {
            minion.position.x += playerSpeed;
          });
          garbages.forEach((garbage) => {
            garbage.position.x += playerSpeed;
          });
          particles.forEach((particle) => {
            particle.position.x += playerSpeed;
          });
        }
      }
    }
    // !----------------- COLLISION DETECTION -----------------
    platforms.forEach((platform) => {
      if (platform.platformer) {
        if (collisionPlatform(player, platform, 1.1, 50)) {
          player.velocity.y = 0;
          isJumping = false;
        }

        garbages.forEach((garbage) => {
          if (collisionPlatform(garbage, platform, 1.15)) {
            garbage.velocity.y = 0;
          }
        });

        minions.forEach((minion) => {
          if (collisionPlatform(minion, platform, 1.1)) {
            minion.velocity.y = 0;
          }
        });

        powerUps.forEach((powerUp) => {
          if (collisionPlatform(powerUp, platform, 1.1)) {
            powerUp.velocity.y = 0;
          }
        });
      }

      if (platform.block) {
        if (collisionPlatform(player, platform, 1, 20)) {
          player.velocity.y = 0;
          isJumping = false;
        }

        garbages.forEach((garbage) => {
          if (collisionPlatform(garbage, platform, 1.11)) {
            garbage.velocity.y = 0;
          }
        });
        minions.forEach((minion) => {
          if (collisionPlatform(minion, platform, 0.94)) {
            minion.velocity.y = 0;
          }
        });
      }

      if (blockCollision({ object: player, platform, margin: 0.8 })) {
        player.velocity.y = -player.velocity.y * 0.3;
      }

      if (
        platform.platformer &&
        blockCollisionSide({ object: player, platform, margin: 1.1 })
      ) {
        player.velocity.x = 0;
      }

      particles.forEach((particle, index) => {
        if (collisionPlatformCircle(particle, platform)) {
          particle.velocity.y = -particle.velocity.y * 0.9;

          if (particle.radius - 0.4 <= 0) {
            particles.splice(index, 1);
          } else {
            particle.radius -= 0.4;
          }
        }

        if (particle.lifeSpan <= 0) {
          particles.splice(index, 1);
        }
      });
    });

    // * Render Particles
    particles.forEach((particle) => {
      particle.update();
    });

    // * Render Weapons
    weapons.forEach((weapon) => {
      weapon.update();
    });

    player.update();

    // * Win Condition
    if (game.disableUserInput) {
      const particleCount = 300;
      const radians = (Math.PI * 2) / particleCount;
      const powerSpeed = 10;
      let increment = 1;

      const intervalId = setInterval(() => {
        if (particles.length < 299)
          for (let i = 0; i < particleCount; i++) {
            particles.push(
              new Particle(
                canvas,
                context,
                0,
                (canvas.width / 4) * increment,
                canvas.height / 2,
                {
                  x: Math.cos(radians * i) * powerSpeed * Math.random(),
                  y: Math.sin(radians * i) * powerSpeed * Math.random(),
                },
                Math.random() * 4,
                `hsl(${Math.random() * 400}, 50%, 50%)`,
                true
              )
            );
          }
        if (increment === 3) {
          clearInterval(intervalId);
        }
        increment += 1;
      }, 1000);

      // setTimeout(() => {
      //   initLevel2();
      // }, 5000);
    }

    // * Lose Condition
    if (player.position.y > canvas.height) {
      timer.stop();
      initLevel2();
    }

    // !----------------- PLAYER MOVEMENT -----------------
    // TODO: Rework on the jumping sprite of character
    if (!isJumping) {
      if (
        isPressed.left &&
        lastKeyPressed === "Left" &&
        (player.sprite !== player.image.walkLeft ||
          player.sprite !== player.image.Power.walkLeft)
      ) {
        isShooting = false;
        player.state = "walk";
        player.direction = "left";
      } else if (
        isPressed.right &&
        lastKeyPressed === "Right" &&
        (player.sprite !== player.image.walk ||
          player.sprite !== player.image.Power.walk)
      ) {
        isShooting = false;
        player.state = "walk";
        player.direction = "right";
      } else {
        !isShooting ? (player.state = "idle") : (player.state = "shoot");
      }
    }
  }
  initLevel2();
  animate();

  // !----------------- EVENT LISTENERS -----------------
  addEventListener("keydown", ({ key }) => {
    if (game.disableUserInput) return;

    switch (key) {
      case "ArrowUp":
        if (!isJumping) {
          player.velocity.y -= 60;
          player.state = "jump";
          isJumping = true;
        }
        break;
      case "ArrowLeft": //!hello deepika was hereeee <3
        isPressed.left = true;
        lastKeyPressed = "Left";
        break;

      case "ArrowRight":
        isPressed.right = true;
        lastKeyPressed = "Right";
        break;

      case " ":
        if (player.powerUp && player.direction === "right") {
          player.state = "shoot";
          isShooting = true;
          setTimeout(() => {
            weapons.push(
              new Weapon(
                canvas,
                context,
                gravity * 0.1,
                player.position.x + player.width / 2,
                player.position.y + player.height * 0.75,
                60
              )
            );
          }, 100);
        }
    }
  });

  addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "ArrowUp":
        break;
      case "ArrowLeft":
        isPressed.left = false;
        break;
      case "ArrowRight":
        isPressed.right = false;
        break;
    }
  });
}

// !---------------- PAGE LOGIC -----------------
// Track mouse position
let mousePos = { x: undefined, y: undefined };

// Button click event
button.addEventListener("click", function () {
  header.style.display = "none";
  footer.style.display = "none";
  hero.style.display = "none";
  document.body.style.height = "100vh";
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";
  canvas.style.display = "block";
  main();
});

// Mouse move event
window.addEventListener("mousemove", (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
  if (
    header.style.display === "none" &&
    footer.style.display === "none" &&
    mousePos.y < 65
  ) {
    header.style.display = "flex";
    footer.style.display = "flex";
    hero.style.display = "flex";
    canvas.style.display = "none";
    document.body.style.height = "";
    document.body.style.display = "block";
    document.body.style.backgroundColor = "";
  }
});
