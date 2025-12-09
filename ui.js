export function centerText(scene, msg, yOffset = 0, style = {}) {
    const { width, height } = scene.scale;
    return scene.add.text(
        width / 2,
        height / 2 + yOffset,
        msg,
        {
            fontSize: style.fontSize || '25px',
            fontFamily: style.fontFamily || 'PressStart2P',
            fill: style.fill || '#ffffff',
            align: style.align || 'left'
        }
    ).setOrigin(0.5, .5);
}
 