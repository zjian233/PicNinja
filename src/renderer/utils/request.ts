import keyConfig from "../../../keyConfig";

// function mergeObject(object1, object2) {
//     const object2 =
//     Object.keys(object1)
// }

class Request {

    baseUrl: string;

    commonConfig = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Basic' + btoa(`${keyConfig.keyId}:${keyConfig.key}`)
        }
    }


    constructor(baseUrl:string = 'https://api.backblazeb2.com', token?: string) {
        this.baseUrl = baseUrl;
        if (token) {
            this.commonConfig.headers.Authorization = token;
        }
    }

    async executeFetch(url:string, config: RequestInit = {}):Promise<unknown> {
        const response = await fetch(url, {...this.commonConfig, ...config});

        if (response.body) {
            return await this.parseBody(response.body);

        }
        return response
    }

    async parseBody(inputStream: ReadableStream<Uint8Array>) {
        const reader = inputStream.getReader();
        let res = ''
        while (true) {
            const { done, value } = await reader?.read() ?? {};
            if (done) {
                break;
            }
            res += new TextDecoder('utf-8').decode(value);
        }

        return JSON.parse(res);

    }

    async get(url:string = '/', config?: RequestInit) {
        const completeUrl = this.baseUrl + url;
        return  await this.executeFetch(completeUrl, config)

    }
}

export  default Request;