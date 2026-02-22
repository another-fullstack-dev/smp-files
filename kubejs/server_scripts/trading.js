const betterDungeonsMaps = VillagerUtils.createStructureMapTrade(
  TradeItem.of("minecraft:emerald", 5, 15),
  MoreJS.weightedList()
    .add(50, "betterdungeons:small_dungeon")
    .add(10, "betterdungeons:zombie_dungeon")
    .add(10, "betterdungeons:spider_dungeon")
    .add(10, "betterdungeons:skeleton_dungeon"),
).displayName(Text.of("Карта подземелья"))

MoreJSEvents.wandererTrades((event) => {
  event.addTrade(1, "5x minecraft:emerald", "fishing101:fish_book");
  event.addTrade(1, "5x minecraft:emerald", "fishing101:meal_book");
  event.addTrade(2, betterDungeonsMaps);
});