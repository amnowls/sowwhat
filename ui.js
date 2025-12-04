export function centerText(scene, msg, yOffset = 50, style = {}) {
    const { width, height } = scene.scale;
    return scene.add.text(
        width / 2,
        height / 2 + yOffset,
        msg,
        {
            fontSize: style.fontSize || '32px',
            fill: style.fill || '#ffffff',
            align: style.align || 'left'
        }
    ).setOrigin(0.5, .5);
}
 