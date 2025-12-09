export function centerText(scene, msg, yOffset = -100, style = {}) {
    const { width, height } = scene.scale;
    return scene.add.text(
        width / 2,
        height / 2 + yOffset,
        msg,
        {
            fontSize: style.fontSize || '32px',
            // fontFamily: style.fontFamily || '',
            fill: style.fill || '#ffffff',
            align: style.align || 'left',
            wordWrap: style.wordWrap || { width: width - 450, useAdvancedWrap: true },
        }
    ).setOrigin(0.5, 0);
}
 