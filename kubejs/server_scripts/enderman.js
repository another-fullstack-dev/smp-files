LootJS.modifiers((event) => {
  event
    .addLootTableModifier("minecraft:entities/enderman")
    .anyDimension("minecraft:the_end")
    .removeLoot("minecraft:ender_pearl")
    .customCondition({
      condition: "minecraft:random_chance_with_looting",
      chance: 0.25, // base 25%
      looting_multiplier: 0.025, // 2.5% per looting level
    })
    .addLoot("minecraft:ender_pearl")
});
