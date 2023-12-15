const PLATFORM_MARGIN = 1;
const SIDE_MARGIN = 60;

export function collisionPlatform(
  object,
  platform,
  margin = PLATFORM_MARGIN,
  sideMargin = 0
) {
  return (
    object.position.y + object.height < platform.position.y * margin &&
    object.position.y + object.height + object.velocity.y >=
      platform.position.y * margin &&
    object.position.x + sideMargin <= platform.position.x + platform.width &&
    object.position.x + object.width - sideMargin >= platform.position.x
  );
}

export function collisionPlatformCircle(object, platform) {
  return (
    object.position.y + object.radius < platform.position.y &&
    object.position.y + object.radius + object.velocity.y >=
      platform.position.y &&
    object.position.x <= platform.position.x + platform.width &&
    object.position.x + object.radius >= platform.position.x
  );
}

export function collisionMinionTop(object, minion) {
  return (
    object.position.y + object.height < minion.position.y &&
    object.position.y + object.height + object.velocity.y >=
      minion.position.y &&
    object.position.x <= minion.position.x + minion.width &&
    object.position.x + object.width >= minion.position.x
  );
}

export function blockCollision({ object, platform, margin = 1 }) {
  return (
    object.position.y <= platform.position.y * margin + platform.height &&
    object.position.y - object.velocity.y >=
      platform.position.y * margin + platform.height &&
    object.position.x <= platform.position.x + platform.width &&
    object.position.x + object.width >= platform.position.x
  );
}

export function collisionMinionSide(object, minion, margin = PLATFORM_MARGIN) {
  return (
    object.position.y + object.height > minion.position.y &&
    object.position.y < minion.position.y + minion.height &&
    object.position.x + object.width - SIDE_MARGIN * margin >
      minion.position.x &&
    object.position.x < minion.position.x + minion.width - SIDE_MARGIN * margin
  );
}

export function blockCollisionSide({ object, platform, margin = 1 }) {
  return (
    object.position.x +
      object.width +
      object.velocity.x -
      50 -
      platform.velocity.x >=
      platform.position.x &&
    object.position.x + object.velocity.x + 50 <=
      platform.position.x + platform.width &&
    object.position.y <= platform.position.y * margin + platform.height &&
    object.position.y + object.height >= platform.position.y * margin
  );
}

export function rectangularCollision(obj1, obj2) {
  return (
    obj1.position.x + obj1.width >= obj2.position.x &&
    obj1.position.x <= obj2.position.x + obj2.width &&
    obj1.position.y + obj1.height >= obj2.position.y &&
    obj1.position.y <= obj2.position.y + obj2.height
  );
}
