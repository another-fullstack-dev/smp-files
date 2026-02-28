LootJS.modifiers((event) => {
  event
    .addEntityLootModifier("minecraft:warden")
    .addAlternativesLoot(
      LootEntry.of("minecraft:nether_star").when((c) => c.randomChance(0.05)),
    )
    .matchLoot("minecraft:nether_star")
    .triggerLightningStrike(false);
});
