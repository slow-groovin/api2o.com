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

