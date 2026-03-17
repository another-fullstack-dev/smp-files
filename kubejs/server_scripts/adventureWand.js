const selections = {};

// pos1
BlockEvents.leftClicked((event) => {
  const player = event.player;
  if (player.mainHandItem.id != "minecraft:nether_star") return;

  if (!selections[player.uuid]) selections[player.uuid] = {};

  selections[player.uuid].pos1 = {
    x: event.block.x,
    y: event.block.y,
    z: event.block.z,
    dim: event.level.dimension,
  };

  player.tell("Pos1 set");
});

// pos2
BlockEvents.rightClicked((event) => {
  const player = event.player;
  if (player.mainHandItem.id != "minecraft:nether_star") return;

  if (!selections[player.uuid]) selections[player.uuid] = {};

  selections[player.uuid].pos2 = {
    x: event.block.x,
    y: event.block.y,
    z: event.block.z,
    dim: event.level.dimension,
  };

  player.tell("Pos2 set");
});

ServerEvents.commandRegistry((event) => {
  const { commands: Commands } = event;

  event.register(
    Commands.literal("zonecreate")
      .executes((ctx) => {
        const player = ctx.source.player;
        const sel = selections[player.uuid];

        if (!sel || !sel.pos1 || !sel.pos2) {
          player.tell("Select two points first");
          return 0;
        }

        const data = player.server.persistentData;

        if (!data.advZones) data.advZones = [];

        data.advZones.push({
          pos1: sel.pos1,
          pos2: sel.pos2,
          author: player.uuid,
        });

        player.tell("Zone saved");
        selections[player.uuid] = {}
        return 1;
      }),
  );
});

PlayerEvents.tick((event) => {
  const player = event.player;
  const zones = player.server.persistentData.advZones;
  if (!zones) return;

  let inside = false;

  zones.forEach((z) => {
    if (z.author == player.uuid) return;
    const x = player.x;
    const y = player.y;
    const zPos = player.z;

    const minX = Math.min(z.pos1.x, z.pos2.x);
    const maxX = Math.max(z.pos1.x, z.pos2.x);

    const minY = Math.min(z.pos1.y, z.pos2.y);
    const maxY = Math.max(z.pos1.y, z.pos2.y);

    const minZ = Math.min(z.pos1.z, z.pos2.z);
    const maxZ = Math.max(z.pos1.z, z.pos2.z);

    if (
      x >= minX &&
      x <= maxX &&
      y >= minY &&
      y <= maxY &&
      zPos >= minZ &&
      zPos <= maxZ
    )
      inside = true;
  });

  if (inside) {
    event.server.runCommandSilent(`gamemode adventure ${player.name.string}`);
  } else {
    event.server.runCommandSilent(`gamemode survival ${player.name.string}`);
  }
});
