import { createError } from "#app";

export function assertAny<T>(condition: T | null | undefined, message?: string): asserts condition is T {
	if (!condition) {
		throw createError({
			message: message??'assert error: failed',
			statusCode: 500,
			name:"name1"

		})
	}
}

export function debounce(func: () => void, delay: number): () => void {
	let timeoutId: NodeJS.Timeout | null = null;
	let ifCanRun = true;

	return function () {
		if (ifCanRun) {
			// 第一次点击时立即执行
			func();
			ifCanRun = false;
			timeoutId = setTimeout(() => {
				ifCanRun = true; // 恢复为初始状态，允许下次点击立即执行
			}, delay);
		}
	};
}