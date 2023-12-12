export function collisionPlatform(object, platform) {
  return (
    object.position.y + object.height < platform.position.y &&
    object.position.y + object.height + object.velocity.y >=
      platform.position.y &&
    object.position.x <= platform.position.x + platform.width &&
    object.position.x + object.width >= platform.position.x
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

export function collisionMinionSide(object, minion) {
  return (
    object.position.y + object.height > minion.position.y &&
    object.position.y <= minion.position.y + minion.height &&
    object.position.x + object.width - 60 > minion.position.x &&
    object.position.x < minion.position.x + minion.width - 60
  );
}

export function blockCollision(object, platform) {
  return (
    object.position.y < platform.position.y + platform.height &&
    object.position.y - object.velocity.y >=
      platform.position.y + platform.height &&
    object.position.x + 50 <= platform.position.x + platform.width &&
    object.position.x + object.width - 60 >= platform.position.x
  );
}

export function blockCollisionSide(object, platform) {
  return (
    object.position.x +
      object.width +
      object.velocity.x -
      platform.velocity.x >=
      platform.position.x &&
    object.position.x + object.velocity.x <=
      platform.position.x + platform.width &&
    object.position.y <= platform.position.y + platform.height &&
    object.position.y + object.height >= platform.position.y
  );
}
