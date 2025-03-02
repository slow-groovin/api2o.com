import path from "node:path";
import * as fs from "node:fs";


export function tryWriteFileSyncWithMkDir(filePath:string,data:string){
	const dir = path.dirname(filePath); // 提取目录路径
	// 创建目录（如果不存在）
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	// 写入文件
	fs.writeFileSync(filePath, data, 'utf8');
}

