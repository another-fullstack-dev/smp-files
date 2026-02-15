StartupEvents.registry("minecraft:villager_type", (event) => {
  const villager = event.create("kubejs:villager_skeleton");
  villager.displayName("Житель-скелет");
});

StartupEvents.registry("minecraft:villager_profession", (event) => {
  const merchant = event.create("kubejs:skeleton_merchant");  
  merchant.displayName("Скелет-торговец");
});