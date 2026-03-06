EntityEvents.death((event) => {
  if (!event.entity.isPlayer()) return;
  const player = event.player;

  const inventory = player.inventory.allItems;
  const gear = inventory.filter((item) => {
    return isGear(item);
  });
  gear.forEach((item) => {
    const damageBy = item.maxDamage * 0.1;
    const currentDamage = item.damageValue;
    let finalValue = currentDamage + damageBy;
    if (finalValue >= item.maxDamage) {finalValue = item.maxDamage - 1} // dont break it completely just yet...
    item.setDamageValue(finalValue);
  });

  player.setXp(player.xp / 2)
});

/**
 *
 * @param {Internal.ItemStack} item
 */
function isGear(item) {
  const tags = ["c:armors", "c:tools"];
  let isValid = false;
  for (const tag of tags) {
    if (item.hasTag(tag)) {
      isValid = true;
      break;
    }
  }
  return isValid;
}
