export function centerText(scene, msg, yOffset = 0, style = {}) {
    const { width, height } = scene.scale;

    return scene.add.text(
        width / 2,
        height / 2 + yOffset,
        msg,
        {
            fontSize: style.fontSize || '18px',
            fontFamily: style.fontFamily || 'PressStart2P',
            fill: style.fill || '#1645f5',
            align: style.align || 'left',
            wordWrap: style.wordWrap || { width: width * .7, useAdvancedWrap: true},
            lineSpacing: style.lineSpacing || 10
        }
    ).setOrigin(0.5, 0);
}




export function createTypewriterText(scene, fullText, yOffset = 0, style = {}, speed = 80) {
    const { width, height } = scene.scale;
    const textObject = scene.add.text(
        width * .15,
        height / 2 +yOffset,
        '',
        {
            fontSize: style.fontSize || '18px',
            fontFamily: style.fontFamily || 'PressStart2P',
            fill: style.fill || '#1645f5',
            align: style.align || 'left',
            wordWrap: style.wordWrap || { width: width * .7, useAdvancedWrap: true},
            lineSpacing: style.lineSpacing || 10
        }
    ).setOrigin(0, 0);
    
    // Apply typewriter animation
    let currentIndex = 0;
    
    scene.time.addEvent({
        delay: speed,
        callback: () => {
            if (currentIndex < fullText.length) {
                currentIndex++;
                textObject.setText(fullText.substring(0, currentIndex));
            }
        },
        repeat: fullText.length - 1
    });
    
    return textObject;
}