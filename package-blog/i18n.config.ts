import { defineI18nConfig } from "#imports";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "zh",
  fallbackLocale: "en",
  messages: {
    zh: {
      titlePostfix: "开发者技术博客网站",
      welcome: "欢迎",
      blog: "博客",
      handbook: "小册",
      tool: "工具",
      api: "API",
      lang: "语言",
      toc: "目录",
      "no-trans-so-default": "此文章没有您语言对应的翻译,因此显示默认原始内容",
      errorOccurs: "出错了",
      goHome: "回到首页",
      timeline: "时间线",
      constructingTitle: "页面建设中",
      constructingContent: "我们正在努力建设这个页面，敬请期待。",
      handbookDesc:
        "技术主题的文章集合，涵盖了不同技术主题的实用指南、模式、故障排除、技巧等内容。",
      toolDesc:
        "api2o.com原创开发的一系列网页版工具， 提供简单方便便捷的功能, 帮助用户提升效率，节省时间.",
      apiDesc:
        "HTTP在线接口, 包括RESTful接口和GraphQL接口, 用于开发者进行数据获取/mock假数据/调试/测试, 免费, 无需鉴权",
      previous: "上一篇",
      next: "下一篇",
      noPrevious: "没有上一篇",
      noNext: "没有下一篇",
      tools: {
        "object-id-parser": {
          title: "ObjectId 在线解析",
          description:
            "网页版ObjectId解析工具, 解析来自MongoDB等软件中的 ObjectId, 展示其中的时间戳(timestamp),随机数(rand),计数器(counter)等部分",
          doParse: "解析",
          inputNot24BitHint: "请确保输入的 ObjectId 长度为 24 个字符。",
          result: "解析结果",
          timestampPart: "时间戳部分",
          randomPart: "随机数部分",
          counterPart: "counter部分",
          placeholder: "请输入objectId",
          history: "历史记录",
        },
        "elastic-painless-script-format": {
          title: "ElasticSearch Painless Script脚本简单格式化工具",
          description:
            '格式化 ElasticSearch Painless Script中的"source"字段内容, 单行格式/多行格式 相互转换，',
          inlineFormat: "单行 -> 多行",
          multilineFormat: "多行 -> 单行",
          placeholder: "请输入 Painless code",
          result: "结果",
        },
        "ai-sse-result-parse": {
          title: "AI大模型流式输出 SSE 结果解析",
          description: "将AI大模型API的流式输出(SSE)中的内容提取并展示, 方便使用者直接阅读."
        }
      },
    },
    en: {
      titlePostfix: "Developer Technology Blog Website",
      welcome: "Welcome",
      blog: "Blog",
      handbook: "Handbook",
      tool: "Tool",
      api: "API",
      lang: "Lang",
      toc: "Table of Contents",
      "no-trans-so-default":
        "This article has no translation for your language,\nso it displays the content of its original language",
      errorOccurs: "Error Occurs",
      goHome: "Go Home",
      timeline: "Timeline",
      constructingTitle: "Under Construction",
      constructingContent:
        "We are working on this page, please wait for a while.",
      handbookDesc:
        "Handbooks are collections of articles for specific technologies, covering practical guide, pattern, troubleshooting, trick. ",
      toolDesc:
        "Html tools(entirely run in browser) that help you complete various tasks effortlessly. Easy to use, efficient and convenient, and save time. ",
      apiDesc:
        "many HTTP api, RESTful API or GraphQL API, for developer to fetch data/fake mock data/debug/testing, free, public, no auth",
      previous: "prev",
      next: "next",
      noPrevious: "no prev",
      noNext: "no next",
      tools: {
        "object-id-parser": {
          title: " ObjectId Parser/Converter",
          description:
            " Parse/convert ObjectId to parts: timestamp, random ,counter. (entirely offline)",
          doParse: "PARSE it",
          inputNot24BitHint: "please ensure the input ObjectId length is 24。",
          result: "Result",
          timestampPart: "timestamp",
          randomPart: "random",
          counterPart: "counter",
          placeholder: "please input objectId",
          history: "History Records",
        },
        "elastic-painless-script-format": {
          title: "ElasticSearch Painless Script Simple Formater",
          description:
            'format/beautifier/prettier ElasticSearch Painless script "source" field content, multiline to single line, or single line to multiline, for build elastic request field "source"  (entirely offline)',
          inlineFormat: "SingleLLine -> Multiline",
          multilineFormat: "Multiline -> SingleLine",
          placeholder: "please input Painless script",
        },
        "ai-sse-result-parse": {
          title: "AI SSE Result Parse",
          description: "parse SSE Response of AI API (OpenAI, Claude, Gemini, Grok, ...). transfer text delta (choices, ...) to full content for human reading."
        }
      },
    },
  },
}));
