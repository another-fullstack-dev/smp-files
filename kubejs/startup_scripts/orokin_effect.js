StartupEvents.registry("mob_effect", (event) => {
  event
    .create("orokin")
    .color(0xffec00)
    .beneficial()
    .effectTick((entity, lvl) => {
      if (entity.age % 40 != 0) return;
      entity.heal(1);
    })
    .modifyAttribute(
      "minecraft:generic.attack_damage",
      "increase_damage",
      0.25,
      "multiply_total",
    )
    .modifyAttribute(
      "minecraft:generic.max_health",
      "half_health",
      -0.5,
      "multiply_total",
    )
    .modifyAttribute(
      "porting_lib:entity_gravity",
      "decrease_gravity",
      -0.25,
      "multiply_total",
    )
    .modifyAttribute(
      "minecraft:generic.movement_speed",
      "increase_speed",
      0.15,
      "multiply_total",
    )
    .displayName("Орокин");
});
