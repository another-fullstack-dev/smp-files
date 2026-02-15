EntityEvents.hurt((event) => {
  if (!event.entity.isPlayer()) return;

  const player = event.entity;

  if (!player.hasEffect("kubejs:kuva")) return;

  const healthAfter = player.health - event.damage;

  // would this damage kill the player?
  if (healthAfter <= 0) {
    event.cancel();

    // keep them barely alive just in case
    player.health = 1;
  }
});
