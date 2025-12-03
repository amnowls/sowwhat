export function centerText(scene, text, yOffset = 0, style = {}, originX = 0.5, originY = 0.5) {
    const { width, height } = scene.scale;
    return scene.add.text(width / 2, height / 2 + yOffset, text, {
        fontSize: "32px",
        fill: "#ffffff",
        align: "left",
        ...style
        // wordWrap: { width: this.scale.width * 0.7 }  // wrap at 70% of screen width
    }).setOrigin(originX, originY);;
}


//(originX, originY);