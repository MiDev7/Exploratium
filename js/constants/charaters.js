function loadImage(imgSrc) {
  let image = new Image();
  image.src = imgSrc;
  return image;
}

const Players = {
  Archer: {
    idle: loadImage("../assets/archer/Idle.png"),
    walk: loadImage("../assets/archer/Walk.png"),
    idleLeft: loadImage("../assets/archer/IdleLeft.png"),
    walkLeft: loadImage("../assets/archer/WalkLeft.png"),
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

export default Players;
