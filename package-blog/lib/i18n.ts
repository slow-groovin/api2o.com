import { useI18n } from "#imports";

export function usePageScopedI18n<MessageType extends any>(messages: Record<'zh' | 'en', MessageType>) {
	const { locale } = useI18n();

	// 获取当前语言和默认语言的消息对象
	const currentMessages = messages[locale.value as 'zh' | 'en'];
	const fallbackMessages = messages['en']; // 默认回退到英文

	// 使用 Proxy 来拦截对象属性访问，处理回退逻辑
	const tPage = new Proxy(currentMessages as any, {
		get(target, prop:  string | symbol) {
			// 如果当前语言的翻译中存在该键，直接返回
			if (prop in target) {
				return target[prop];
			}
			// 如果当前语言中没有该键，回退到英文翻译
			if (prop in (fallbackMessages as any)) {
				return (fallbackMessages as any)[prop];
			}
			// 如果连英文中都没有该键，可以返回 undefined 或自定义默认值
			return undefined; // 或者 'Translation not found'
		}
	});

	return {
		tPage,
	};
}
