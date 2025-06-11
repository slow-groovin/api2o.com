<template>
  <div class="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
    <div class=" mx-auto">
      <div class="shadow-lg shadow-primary border rounded-lg overflow-hidden">
        <!-- 标题区域 -->
        <div class="  px-6 py-4">
          <h1 class="text-2xl font-bold">
            {{ t('tools.ai-sse-result-parse.title') }}
          </h1>
          <!-- 徽章区域 -->
          <div class="m-1 flex gap-2">
            <OfflineBadge />
            <GithubSourceLink relativepath="pages/tool/ai-sse-result-parse.vue" class="text-sm" />
          </div>

          <!-- 说明区域 -->
          <span>
            <span class="mt-2 italic font-light ">
              {{ t('tools.ai-sse-result-parse.description') }}
            </span>
          </span>


        </div>

        <!-- 输入区域 -->
        <div class="p-6 ">
          <div class="flex items-center">
            <div class="flex flex-col">
              <label for="input-type" class="block font-bold mb-2 text-lg ">
                Input type:
              </label>
              <select id="input-type" v-model="inputType"
                class="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 w-fit dark:bg-neutral-600">
                <option value="openai-sse">OpenAI SSE Response</option>
              </select>
            </div>

          </div>

          <div class="flex flex-col mt-4">

            <div class="flex flex-row items-center mb-2">
              <label for="input-text" class="block text-lg font-bold">
                Input:
              </label>
              <button @click="inputSample"
                class="ml-2 px-1 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 active:ring-offset-1 shadow-sm transition-colors duration-200">Example</button>
            </div>
            <textarea id="input-text" v-model="inputText" rows="10"
              class="w-full px-3 py-2 border text-sm rounded-lg focus:outline-none focus:border-blue-500"
              :placeholder="placeholder"></textarea>
          </div>
        </div>

        <!-- 转换按钮 -->
        <div class="px-6 py-4 flex justify-center">
          <button @click="convertText()"
            class="px-4 py-2 bg-[#FED10A] hover:bg-[#FADB5F] text-gray-600 font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:ring-offset-1 shadow-md transition-colors duration-200">
            Parse
          </button>
        </div>

        <!-- 结果区域 -->
        <div class="p-6  mb-4 flex flex-col">
          <div class="flex items-center justify-between">
            <label for="output-markdown" class="block text-lg font-bold mb-2">
              Result:
            </label>
            <Button @click="convertText({ indent: true })"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:ring-offset-1 shadow-md transition-colors duration-200">Indent</Button>
          </div>


          <div class="prose">
            <div v-html="markdownResult"></div>
          </div>


          <div v-if="result" class="border rounded text-primary font-mono p-4 bg-white shadow-md">
            <div class="mb-4 p-2 bg-blue-50 rounded-md border-l-4 border-blue-500">
              <span class="text-blue-700 font-semibold">type:</span>
              <span class="font-extrabold text-blue-900">{{ result.type }}</span>
            </div>
            <div class="mb-4 p-2 bg-green-50 rounded-md border-l-4 border-green-500">
              <span class="text-green-700 font-semibold">model:</span>
              <span class="font-extrabold text-green-900">{{ result.model || 'N/A' }}</span>
            </div>
            <div class="mb-4 p-2 bg-yellow-50 rounded-md border-l-4 border-yellow-500">
              <span class="text-yellow-700 font-semibold">tokenUsage:</span>
              <span class="font-medium text-yellow-800">
                {{ result.tokenUsage ?
                  `prompt: ${result.tokenUsage.prompt_tokens}, completion: ${result.tokenUsage.completion_tokens}, total:
                ${result.tokenUsage.total_tokens}`
                  : 'N/A' }}
              </span>
            </div>
            <div class="mb-4 p-2 bg-red-50 rounded-md border-l-4 border-red-500">
              <span class="text-red-700 font-semibold">id:</span>
              <span class="font-extrabold text-red-900">{{ result.id || 'N/A' }}</span>
            </div>
            <div class="mb-4 p-2 bg-purple-50 rounded-md border-l-4 border-purple-500">
              <span class="text-purple-700 font-semibold">created:</span>
              <span class="font-medium text-purple-800">
                {{ result.created ? new Date(result.created * 1000).toLocaleString() : 'N/A' }}
              </span>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import OfflineBadge from "~/components/hint/badge/OfflineBadge.vue";
import { useI18n, useHead, useSeoMeta } from '#imports';
import GithubSourceLink from '~/components/hint/GithubSourceLink.vue';
import { codeToHtml } from 'shiki';




onMounted(() => {

})

const { t } = useI18n()
const i18nVal = (subKey: string) => t('tools.ai-sse-result-parse.' + subKey)
useSeoMeta({
  title: i18nVal('title'),
  description: i18nVal('description'),
})

const inputType = ref('openai-sse');
const inputText = ref('');
const markdownResult = ref('');
const result = ref();

const convertText = async (opt?: { indent?: boolean }) => {
  const parsedResult = parseOpenAISSEResult(inputText.value);
  console.log('parsedResult', parsedResult)
  result.value = parsedResult

  if (opt?.indent) {
    markdownResult.value = await codeToHtml(JSON.stringify(JSON.parse(parsedResult.text), null, 2), { lang: 'json', theme: 'github-dark' })
  } else {
    markdownResult.value = await codeToHtml(parsedResult.text, { lang: 'json', theme: 'github-dark' })
  }


};


function parseOpenAISSEResult(sseText: string): {
  type: string,
  text: string,
  model?: string,
  tokenUsage?: { prompt_tokens: number, completion_tokens: number, total_tokens: number },
  id?: string,
  created?: number
} {
  // Split the SSE text into individual lines
  const lines = sseText.trim().split('\n');

  // Initialize variables to store results
  let result = '';
  let resultType: 'text' | 'tool_call' | 'empty' = 'empty';
  let model: string | undefined;
  let tokenUsage: { prompt_tokens: number, completion_tokens: number, total_tokens: number } | undefined;
  let id: string | undefined;
  let created: number | undefined;

  // Iterate through each line
  for (const line of lines) {
    // Skip empty lines or [DONE] marker
    if (!line || line === 'data: [DONE]') {
      continue;
    }

    // Extract JSON content after "data: "
    if (line.startsWith('data: ')) {
      const jsonStr = line.substring(6); // Remove "data: " prefix
      try {
        const jsonObj = JSON.parse(jsonStr);

        // Extract metadata if present
        if (jsonObj.model) {
          model = jsonObj.model;
        }
        if (jsonObj.usage) {
          tokenUsage = {
            prompt_tokens: jsonObj.usage.prompt_tokens,
            completion_tokens: jsonObj.usage.completion_tokens,
            total_tokens: jsonObj.usage.total_tokens
          };
        }
        if (jsonObj.id) {
          id = jsonObj.id;
        }
        if (jsonObj.created) {
          created = jsonObj.created;
        }

        // Check if choices array exists and has elements
        if (jsonObj.choices && jsonObj.choices.length > 0) {
          const choice = jsonObj.choices[0];

          // Handle delta content
          if (choice.delta) {
            // Case 1: Text content
            if (choice.delta.content) {
              result += choice.delta.content;
              resultType = 'text';
            }

            // Case 2: Tool calls
            if (choice.delta.tool_calls && choice.delta.tool_calls.length > 0) {
              const toolCall = choice.delta.tool_calls[0];
              if (toolCall.function && toolCall.function.arguments) {
                result += toolCall.function.arguments;
                resultType = 'tool_call';
              }
            }
          }
        }
      } catch (e) {
        console.error(jsonStr, e);
        // Handle parsing errors silently (invalid JSON chunks)
        continue;
      }
    }
  }

  // Process the result based on type
  if (resultType === 'tool_call') {
    // For tool calls, ensure the result is a valid JSON string
    try {
      const parsedResult = JSON.parse(result);
      return {
        type: 'tool_call',
        text: JSON.stringify(parsedResult, null, 0),
        model,
        tokenUsage,
        id,
        created
      };
    } catch (e) {
      // If parsing fails, return raw concatenated string
      return {
        type: 'tool_call',
        text: result,
        model,
        tokenUsage,
        id,
        created
      };
    }
  } else if (resultType === 'text') {
    // For text, return the concatenated content as-is
    return {
      type: 'text',
      text: result,
      model,
      tokenUsage,
      id,
      created
    };
  } else {
    // For empty or unhandled cases
    return {
      type: 'empty',
      text: '',
      model,
      tokenUsage,
      id,
      created
    };
  }
}


const sample = `data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"call_xxxxxx","type":"function","function":{"name":"Fetch_User_Info_Tool","arguments":"{\\"address\\":"}}],"role":"assistant"},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":" {\\"city\\": \\""}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":"New York\\", \\""}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":"district\\": \\"Brookl"}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":"ln\\","}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":" \\"street\\": \\""}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":"A32 street\\", \\""}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":"street_number\\": \\""}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":"No. 33\\"},"}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":" \\"age\\":"}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":" 0, \\"tags"}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"content":null,"tool_calls":[{"index":0,"id":"","type":"function","function":{"arguments":"\\": []}"}}]},"finish_reason":null,"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"delta":{"tool_calls":[{"function":{"arguments":null},"index":0,"id":"","type":"function"}]},"index":0}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[{"finish_reason":"tool_calls","delta":{},"index":0,"logprobs":null}],"object":"chat.completion.chunk","usage":null,"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: {"choices":[],"object":"chat.completion.chunk","usage":{"prompt_tokens":492,"completion_tokens":64,"total_tokens":556},"created":1740000000,"system_fingerprint":null,"model":"gpt-5o-mini","id":"chatcmpl-uuid"}

data: [DONE]`
const placeholder = `Paste SSE response text here, eg: \\n ${sample}`
function inputSample() {
  inputText.value = sample
  convertText({ indent: true })
}

</script>
