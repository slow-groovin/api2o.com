export type HttpMethodStr= 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE' ;
export type GraphqlOpTypeStr = 'query' | 'mutation' ;

export interface RestReqSample {
	baseUrl?: string;
	url: string;
	method: HttpMethodStr;
	headers?: Record<string, string>;
	body?: any;
}



export class RestReqSampleImpl implements RestReqSample {
	baseUrl?: string;
	url: string;
	body?: any;
	headers?: Record<string, string>;
	method: HttpMethodStr;

	constructor(desc: RestReqSample) {
		this.baseUrl = desc.baseUrl;
		this.url = desc.url;
		this.body = desc.body;
		this.headers = desc.headers;
		this.method = desc.method;
		//reassign url
		this.url = !!this.baseUrl ? `${this.baseUrl}${this.url}` : `${this.url}`
	}
}


/**
 * 请求/响应内容的描述item
 * @param title 名称
 * @param content 参数/body的text
 * @param contentWithAnnotation 带注释的参数/body的text
 */
export interface BodyItemDesc {
	title: string,
	content: string,
	contentWithAnnotation: string,
}

export interface RestReqDesc {
	name: string,
	desc: string,
	sample: RestReqSampleImpl,
	methods: (HttpMethodStr)[],
	paramOrBodyDescList: BodyItemDesc[],
	responseBodyDescList: BodyItemDesc[]
}


export interface GraphReqSchemaItem{
	title:string;
	content:string;
}
export interface GraphqlReqSample {
	title: string;
	desc: string;
	// type: GraphqlOpTypeStr
	body: string;
}
export interface GraphqlReqDesc{
	name: string,
	desc: string,

	samples:GraphqlReqSample[]
	operations: {type:GraphqlOpTypeStr,content:string, annotation?:string}[];
	types: {title:string,content:string}[];
}