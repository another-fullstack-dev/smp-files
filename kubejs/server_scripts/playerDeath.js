PlayerEvents.respawned((event) => {
  const reason = event.oldPlayer.getRemovalReason();
  if (reason === "CHANGED_DIMENSION") return;

  const player = event.player;
  const data = player.persistentData;
  data.hasVisitedDeathPos = false;

  if (player.inventory.find("minecraft:recovery_compass") != -1) return;
  player.give(
    Item.of("minecraft:recovery_compass").withLore([
      Text.darkRed("Временный компас, показывает место последней смерти."),
    ]),
  );
  if (!data.givenDeathCompass) {
    data.givenDeathCompass = true;
  }
});

PlayerEvents.tick((event) => {
  const player = event.player;
  const currentPos = player.blockPosition();
  let deathPos = player.getLastDeathLocation().get();
  deathPos = deathPos.pos();
  const { x, y, z } = currentPos;
  const { x: dx, y: dy, z: dz } = deathPos;

  const inRange =
    Math.abs(x - dx) <= 1 && Math.abs(y - dy) <= 1 && Math.abs(z - dz) <= 1;
  if (inRange && !player.persistentData.hasVisitedDeathPos) {
    const compassSlot = player.inventory.find("minecraft:recovery_compass");
    if (compassSlot === -1) return;
    if (player.persistentData.givenDeathCompass) {
      player.inventory.extractItem(compassSlot, 1, false);
      player.persistentData.givenDeathCompass = false;
    }
    player.persistentData.hasVisitedDeathPos = true;
  }
});

ItemEvents.dropped((event) => {
  if (!event.entity.isPlayer()) return;
  const player = event.player;
  const item = event.item;
  if (
    player.persistentData.givenDeathCompass &&
    item.id === "minecraft:recovery_compass"
  ) {
    item.shrink(1);
    player.persistentData.givenDeathCompass = false;
  }
});

/* PlayerEvents.chestOpened((event) => {
  const item = event.inventoryContainer.items.contains("minecraft:recovery_compass");
  const player = event.player;
  const inventory = player.inventory;

  if (inventory.find("minecraft:recovery_compass") != -1) return;

  if (
    item.id === "minecraft:recovery_compass" &&
    player.persistentData.givenDeathCompass
  ) {
    item.shrink(1);
  }
}); */
