export function centerText(scene, msg, yOffset = -200, style = {}) {
    const { width, height } = scene.scale;
    return scene.add.text(
        width / 2,
        height / 2 + yOffset,
        msg,
        {
            fontSize: style.fontSize || '24px',
            fontFamily: style.fontFamily || 'PressStart2P',
            fill: style.fill || '#ffffff',
            align: style.align || 'left',
            wordWrap: style.wordWrap || { width: width * .7, useAdvancedWrap: true},
            lineSpacing: style.lineSpacing || 0.4
        }
    ).setOrigin(0.5, 0);
}
 