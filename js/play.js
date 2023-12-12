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
import { loadImage, loadImageAsync } from "./utils/loadImage.js";
import {
  collisionPlatform,
  collisionMinionTop,
  collisionMinionSide,
  collisionPlatformCircle,
  blockCollision,
  blockCollisionSide,
} from "./utils/collisionDetection.js";

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

// !---------------MAIN FUNCTION----------------
async function main() {
  // !----------------- GAME LOGIC -----------------
  let isPressed = { left: false, right: false };
  let lastKeyPressed = null;
  let isJumping = false;
  const gravity = 4;
  let distance = 0;

  const playerSpeed = 7;
  // !----------------- OBJECTS -----------------
  // * Platforms
  const smallBlock = await loadImageAsync("../assets/BrownWoodSmall.png");
  const largeBlock = await loadImageAsync("../assets/BrownWoodLarge.png");
  const platformImage1 = await loadImageAsync("../assets/lgPlatform.png");
  const platformImage2 = await loadImageAsync("../assets/mdPlatform.png");

  // TODO: Refactors the platforms into an array of objects.
  let platforms = [];
  // * Objects
  let Objects = [];
  // * Player
  let player = null;
  // * Enemies
  let minions = [];

  let particles = [];

  //* Animates the game by clearing the canvas and updating the player.
  async function reset() {
    distance = 0;

    platforms = [
      new Platform(canvas, context, platformImage1, 0, canvas.height - 111),
      new Platform(canvas, context, platformImage1, 903, canvas.height - 111),
      new Platform(
        canvas,
        context,
        platformImage1,
        903 * 2.3,
        canvas.height - 111
      ),
      new Platform(
        canvas,
        context,
        platformImage1,
        903 * 3.3,
        canvas.height - 111
      ),
      new Platform(
        canvas,
        context,
        platformImage2,
        903 * 3.8,
        canvas.height - 222
      ),
      new Platform(
        canvas,
        context,
        platformImage1,
        903 * 4.7,
        canvas.height - 111
      ),
      new Platform(canvas, context, largeBlock, 800, 300, true),
    ];
    // * Objects
    Objects = [
      new GenericObject(
        canvas,
        context,
        loadImage("../assets/Forest/1.png"),
        0,
        0
      ),
      new GenericObject(
        canvas,
        context,
        loadImage("../assets/Forest/2.png"),
        0,
        0
      ),
      new GenericObject(
        canvas,
        context,
        loadImage("../assets/Forest/3.png"),
        0,
        0
      ),
      new GenericObject(
        canvas,
        context,
        loadImage("../assets/Forest/5.png"),
        0,
        0
      ),
      new GenericObject(
        canvas,
        context,
        loadImage("../assets/Forest/8.png"),
        0,
        0
      ),
      new GenericObject(
        canvas,
        context,
        loadImage("../assets/Forest/6.png"),
        0,
        canvas.height - 450,
        720,
        400
      ),
      new GenericObject(
        canvas,
        context,
        loadImage("../assets/Forest/6.png"),
        10,
        canvas.height - 515,
        720 * 1.2,
        400 * 1.2
      ),
    ];

    minions = [
      new MiTrash(canvas, context, gravity, 800, 100, enemy, { x: -1, y: 0 }),
      new MiTrash(canvas, context, gravity, 1600, 100, enemy, { x: -1, y: 0 }),
    ];

    player = new Player(gravity, canvas, context, Players.Archer, 100, 100);

    particles = [];
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
    minions.forEach((minion, index) => {
      minion.update();

      // * Collision detection Minion
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
        reset();
      }
    });
    console.log(player.position.y);
    // !----------------- PLAYER MOVEMENT -----------------
    // TODO: Rework on the jumping sprite of character
    if (isPressed.left && lastKeyPressed === "Left") {
      player.state = "walk";
      player.direction = "left";
    } else if (isPressed.right && lastKeyPressed === "Right") {
      player.state = "walk";
      player.direction = "right";
    } else {
      player.state = "idle";
    }

    // !----------------- PLAYER MOVEMENT PARALLAX  -----------------
    // TODO: Refactor the parallax effect into a function.
    if (isPressed.left && player.position.x > 55) {
      player.velocity.x = -playerSpeed;
    } else if (isPressed.right && player.position.x + player.width < 500) {
      player.velocity.x = +playerSpeed;
    } else {
      player.velocity.x = 0;
      if (isPressed.left && distance > 0) {
        distance -= playerSpeed;

        platforms.forEach((platform) => {
          platform.velocity.x = playerSpeed;
        });

        minions.forEach((minion) => {
          minion.position.x += playerSpeed;
        });

        particles.forEach((particle) => {
          particle.position.x += playerSpeed;
        });
        Objects[6].position.x += 5;
        Objects[5].position.x += 5;
      } else if (isPressed.right) {
        distance += playerSpeed;

        platforms.forEach((platform) => {
          platform.velocity.x = -playerSpeed;
        });

        minions.forEach((minion) => {
          minion.position.x -= playerSpeed;
        });

        particles.forEach((particle) => {
          particle.position.x -= playerSpeed;
        });

        Objects[6].position.x -= 5;
        Objects[5].position.x -= 5;
      }
    }
    // !----------------- COLLISION DETECTION -----------------
    platforms.forEach((platform) => {
      if (collisionPlatform(player, platform)) {
        player.velocity.y = 0;
        isJumping = false;
      }

      if (platform.block && blockCollision(player, platform)) {
        player.velocity.y = -player.velocity.y;
      }

      if (platform.block && blockCollisionSide(player, platform)) {
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
      minions.forEach((minion) => {
        if (collisionPlatform(minion, platform)) {
          minion.velocity.y = 0;
        }
      });
    });

    particles.forEach((particle) => {
      particle.update();
    });
    player.update();

    if (distance >= Math.floor(903 * 4.85)) {
      console.log("You win!");
    }

    if (player.position.y > canvas.height) {
      reset();
    }
  }
  reset();
  animate();
  // !----------------- EVENT LISTENERS -----------------
  addEventListener("keydown", ({ key }) => {
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
    }
  });

  addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "ArrowUp":
        if (player.velocity.y === 0) {
          isJumping = false;
        }

        break;
      case "ArrowLeft":
        isPressed.left = false;
        player.velocity.x = 0;
        break;
      case "ArrowRight":
        isPressed.right = false;
        player.velocity.x = 0;
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
