LootJS.modifiers((event) => {
  event
    .addLootTypeModifier(LootType.FISHING)

    .entityPredicate((entity) => {
      // this is a very simple check for caves - anywhere where you cant see sky and under y=60.
      // it is checked against bobber
      const pos = entity.blockPosition();
      const level = entity.level;
      return !level.canSeeSky(pos) && pos.y <= 60;
    })

    .removeLoot(Ingredient.all)

    .pool((pool) => {
      pool.rolls(1);

      pool.addAlternativesLoot(
        // =========================
        // TREASURE CATEGORY
        // =========================
        LootEntry.ofJson({
          type: "minecraft:loot_table",
          name: "kubejs:gameplay/fishing/treasure",
          conditions: [
            {
              condition: "minecraft:table_bonus",
              enchantment: "minecraft:luck_of_the_sea",
              chances: [0.05, 0.1, 0.15, 0.2],
            },
          ],
        }),

        // =========================
        // JUNK CATEGORY
        // =========================
        LootEntry.ofJson({
          type: "minecraft:loot_table",
          name: "kubejs:gameplay/fishing/junk",
          conditions: [
            {
              condition: "minecraft:table_bonus",
              enchantment: "minecraft:luck_of_the_sea",
              chances: [0.1, 0.07, 0.04, 0.02],
            },
          ],
        }),

        // =========================
        // FISH CATEGORY (fallback)
        // =========================
        LootEntry.ofJson({
          type: "minecraft:loot_table",
          name: "kubejs:gameplay/fishing/fish",
        }),
      );
    });
});

LootJS.modifiers((event) => {
  event
    .addLootTypeModifier(LootType.FISHING)
    .matchLoot("minecraft:nether_star")
    // lightning underground? do not problem
    .triggerLightningStrike(false); // passing a boolean is not optional for some reason...
})
