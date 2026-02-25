const betterDungeonsMaps = VillagerUtils.createStructureMapTrade(
  TradeItem.of("minecraft:emerald", 5, 15),
  MoreJS.weightedList()
    .add(50, "betterdungeons:small_dungeon")
    .add(10, "betterdungeons:zombie_dungeon")
    .add(10, "betterdungeons:spider_dungeon")
    .add(10, "betterdungeons:skeleton_dungeon"),
).displayName(Text.of("Карта подземелья"));

MoreJSEvents.wandererTrades((event) => {
  event.addTrade(1, "5x minecraft:emerald", "fishing101:fish_book");
  event.addTrade(1, "5x minecraft:emerald", "fishing101:meal_book");
  event.addTrade(2, betterDungeonsMaps);
});

MoreJSEvents.villagerTrades((event) => {
  const starMerchant = "spacecatcustomprofessions:star_merchant" // nice namespace moron
  event.addTrade(
    starMerchant, 
    1,
    "minecraft:nether_star",
    Item.of("minecraft:fishing_rod").enchant("minecraft:lure", 10).withName("Алмазом инкрустированная золотая удочка"),
  );
  event.addTrade(
    starMerchant, 
    1,
    "minecraft:nether_star",
    Item.of("kubejs:bf_sword").withName("Слишком большой меч"),
  );
});
