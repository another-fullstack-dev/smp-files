StartupEvents.registry("minecraft:painting_variant", (event)=>{
    event.create("orokin_hall").width(16).height(32).tag('minecraft:placeable');
    event.create("orokin_hall_dark").width(16).height(32).tag('minecraft:placeable');
    event.create("sunset").width(16).height(16).tag('minecraft:placeable');
    event.create("the_mask").width(16).height(16).tag('minecraft:placeable');
})