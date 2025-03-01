/*
请提供一个把http请求分别转换为curl/js(fetch)/nodejs+js/nodejs+ts/java(http client)/golang/python/rust 的ts代码,
函数参数类型为:
export interface RestReqSample {
	baseUrl?: string;
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE';
	headers?: Record<string, string>;
	body?: any;
}
返回的类型为:
{
    fileName: string,
    code: string
    lang: 'python'
  }[]
每个语言的代码使用一个独立的函数执行
 */


import type {RestReqSample} from "~/lib/models/api-request";

export function convertHttpRequest(req: RestReqSample): { fileName: string; code: string; lang: string }[] {

	const result = [
		{fileName: 'curl', code: generateCurlCode(req), lang: 'shell'},
		{fileName: 'js(fetch)', code: generateJsFetchCode(req), lang: 'javascript'},
		{fileName: 'node.js', code: generateNodeJsCode(req), lang: 'javascript'},
		{fileName: 'node.js(ts)', code: generateNodeTsCode(req), lang: 'typescript'},
		{fileName: 'java(jdk11+)', code: generateJavaCode(req), lang: 'java'},
		{fileName: 'golang', code: generateGoCode(req), lang: 'javascript'}
	];

	return result;
}

// 1. cURL
function generateCurlCode(req: RestReqSample): string {
	const {url, method, headers, body} = req;
	const headerStr = headers ? Object.entries(headers).map(([key, value]) => `-H "${key}: ${value}"`).join(' ') : '';
	const bodyStr = body ? `-d '${JSON.stringify(body)}'` : '';

	return `
curl -X ${method} ${headerStr} ${bodyStr} "${url}"
`.trim();
}

// 2. JavaScript (Fetch)
function generateJsFetchCode(req: RestReqSample): string {
	const {url, method, headers, body} = req;
	const bodyStr = body ? `body:JSON.stringify(${indentObj(body)})` : '';
	return `
fetch("${url}", {
  method: "${method}",
  headers: ${headers ? indentObj(headers) : '{}'},
  ${bodyStr}
}).then(response => response.text()).then(data => console.log(data));
`.trim();
}

// 3. Node.js (JavaScript)
function generateNodeJsCode(req: RestReqSample): string {
	const {url, method, headers, body} = req;
	const bodyStr = body ?
		`req.write(JSON.stringify(${indentObj(body, 0)}))`
		:
		'';
	return `
const https = require('https');

const options = {
  method: '${method}',
  headers: ${headers ? JSON.stringify(headers, null, 2) : '{}'}
};

const req = https.request("${url}", options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => { console.log(data); });
});

req.on('error', error => console.error(error));
${bodyStr}
req.end();
`.trim();
}

// 4. Node.js (TypeScript)
function generateNodeTsCode(req: RestReqSample): string {
	const {url, method, headers, body} = req;
	const bodyStr=body?`req.write(JSON.stringify(${indentObj(body,0)}));`:''
	return `
import * as https from 'https';

const options: https.RequestOptions = {
  method: '${method}',
  headers: ${headers ? JSON.stringify(headers, null, 2) : '{}'}
};

const req = https.request("${url}", options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => { console.log(data); });
});

req.on('error', error => console.error(error));
${bodyStr}
req.end();
`.trim();
}

// 5. Java (HTTP Client)
function generateJavaCode(req: RestReqSample): string {
	const {url, method, headers, body} = req;
	const bodyStr=body?`.method("${method}", HttpRequest.BodyPublishers.ofString("${JSON.stringify(body).replace(/"/g, '\\"')}"))`
		:	`.method("${method}")`
	const headerStr=headers?`.headers(${ Object.entries(headers).map(([k, v]) => `"${k}", "${v}"`).join(', ')})`:''
	return `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
/**
 only jdk11+ can do.
*/
public class Main {
  public static void callApi2o() throws Exception{
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("${url}"))
        ${bodyStr}
        ${headerStr}
        .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    System.out.println(response.body());
  }
  public static void main(String[] args) throws Exception {
    callApi2o();
  }
}
`.trim();
}

// 6. Go (http package)
function generateGoCode(req: RestReqSample): string {
	const {url, method, headers, body} = req;
	const payloadStr=body?`payload :=  bytes.NewBuffer([]byte(\`${indentObj(body,0)}\`))`:`var payload io.Reader = nil`
	return `
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "${url}"
  method := "${method}"

  ${payloadStr}

  client := &http.Client{}
  req, err := http.NewRequest(method, url, payload)
  if err != nil {
    fmt.Println(err)
    return
  }
  ${headers ? Object.entries(headers).map(([key, value]) => `req.Header.Set("${key}", "${value}")`).join('\n  ') : ''}
  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()
  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}
`.trim();
}


/**
 * stringify obj,并缩减换行, 适配它在代码中的indent
 */
function indentObj(headers: any, indent: number = 2) {
	const json = JSON.stringify(headers, null, 2)
	return json.replace(/\n/g, `\n${' '.repeat(indent)}`)
}