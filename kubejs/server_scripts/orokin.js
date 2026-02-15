const REPAIR_AMOUNT = 1;
const REPAIR_INTERVAL = 120; // 20 ticks - 1 second

PlayerEvents.inventoryChanged((event) => {
  applyOrokin(event);
});

PlayerEvents.respawned((event) => {
  applyOrokin(event);
});

PlayerEvents.loggedIn((event) => {
  applyOrokin(event, true);
});

PlayerEvents.tick((event) => {
  if (event.getLevel().getTime() % REPAIR_INTERVAL !== 0) return;
  if (!event.player.hasEffect("kubejs:orokin")) return; // if no orokin effect = not full set of gold armor. no need to check armor pieces individually.
  event.player.getArmorSlots().forEach((piece) => {
    repair(piece);
  });
});

PlayerEvents.tick((event) => {
  const player = event.player;
  if (!player.hasEffect("kubejs:orokin")) return;

  const hand = player.getMainHandItem();

  if (!isGoldTool(hand)) return;

  // repair held gold gear below 25% durability every second
  if (event.getLevel().getTime() % 20 !== 0) return;
  repair(hand);
});

const MIN = 5 * 60 * 20      // 6000 ticks
const MAX = 30 * 60 * 20    // 36000 ticks

PlayerEvents.tick((event)=>{
  const player = event.player;

  if (!player.hasEffect("kubejs:orokin")) return;

  const data = player.persistentData
  
  if (!data.randomEffectTimer) {
    data.randomEffectTimer = Math.floor(
      Math.random() * (MAX - MIN + 1)
    ) + MIN
    return
  }

  data.randomEffectTimer--

  if (data.randomEffectTimer <= 0) {
    player.potionEffects.add("kubejs:kuva", 1500, 0, false, true);
    data.randomEffectTimer = Math.floor(
      Math.random() * (MAX - MIN + 1)
    ) + MIN
  }
})

function isGoldArmor(item) {
  if (item.isEmpty()) return false;
  const goldArmorItems = [
    "minecraft:golden_helmet",
    "minecraft:golden_chestplate",
    "minecraft:golden_leggings",
    "minecraft:golden_boots",
  ];
  return goldArmorItems.includes(item.id);
}

function isGoldTool(item) {
  if (item.isEmpty()) return false;
  const goldTools = [
    "minecraft:golden_hoe",
    "minecraft:golden_pickaxe",
    "minecraft:golden_axe",
    "minecraft:golden_shovel",
    "minecraft:golden_sword",
  ];
  return goldTools.includes(item.id);
}

// warning: defining default parameter (force = false) breaks kubejs/rhino. leaving it as is. typescript would kill me for this!
function applyOrokin(event, force) {
  const player = event.player;
  const armor = player.getArmorSlots();

  for (const piece of armor) {
    if (!isGoldArmor(piece)) {
      if (player.hasEffect("kubejs:orokin")) {
        player.removeEffect("kubejs:orokin");
      }
      return;
    }
  }

  if (!player.hasEffect("kubejs:orokin")) {
    player.potionEffects.add("kubejs:orokin", -1, 0, false, true);
  } else if (force) {
    player.removeEffect("kubejs:orokin");
    player.potionEffects.add("kubejs:orokin", -1, 0, false, true);
  }
}

function repair(item) {
  const maxDurability = item.getMaxDamage();
  const currentDamage = item.getDamageValue();
  const currentDurability = maxDurability - currentDamage;

  // only repair if durability below 25%
  if (currentDurability >= maxDurability * 0.25) return;

  item.setDamageValue(currentDamage - REPAIR_AMOUNT);
}
