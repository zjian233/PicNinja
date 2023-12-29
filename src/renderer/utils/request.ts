import keyConfig from "../../../keyConfig";

class Request {

    baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.backblazeb2.com';
    }

    async get(url:string = '/') {
        const completeUrl = this.baseUrl + url;

        const response = await fetch(completeUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Basic' + btoa(`${keyConfig.keyId}:${keyConfig.key}`)
            }
        })

        // const data =[];
        // const data = [];
        let body = '';

        const reader = response.body?.getReader();
        while (true) {
            const { done, value } = await reader?.read() ?? {};
            if (done) {
                // Do something with last chunk of data then exit reader
                // return;
                break;
            }

            body += new TextDecoder('utf-8').decode(value);

            // Otherwise do something here to process current chunk
        }

        return body;

        // Array.prototype.concat.apply([], data)
        // console.log('data:',  str);


        //
        // if (!reader) {
        //     return res;
        // }
        //
        // const body = new ReadableStream({
        //     start(controller) {
        //         async function pump() {
        //             const {done, value} = await reader?.read() || {};
        //             if (done) {
        //                 controller.close();
        //                 return;
        //             }
        //             controller.enqueue(value);
        //             return pump();
        //         }
        //
        //         return pump();
        //     }
        // })

        // console.log(response);
        // return response
    }
}

export  default new Request();