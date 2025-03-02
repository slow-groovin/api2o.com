function generateBase64Pattern(opacity:number) {
	// 确保透明度值在0到1之间
	if (opacity < 0) opacity = 0;
	if (opacity > 1) opacity = 1;

	// 使用浅色 (rgba(255, 255, 255, opacity)) 作为点的颜色
	const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="1" fill="rgba(86, 86, 86, ${opacity})" />
    </svg>`;

	// 将SVG编码为Base64格式
	return `data:image/svg+xml;base64,${btoa(svg)}`;
}


// 使用例子：生成透明度为0.1的图案
const base64Pattern = generateBase64Pattern(0.2);

// 打印结果或者在CSS中使用
console.log(base64Pattern);