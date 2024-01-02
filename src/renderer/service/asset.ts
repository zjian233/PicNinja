import Request from "../utils/request";
import eventEmitter from "../utils/eventEmitter";
import {ON_UPDATE_BUCKETS} from "../constants";

interface IRes {
    apiUrl: string,
    authorizationToken: string,
    downloadUrl: string,
    accountId: string
}

export interface IBucket {
    accountId: string,
    bucketId: string,
    bucketName: string,
    bucketType: string,
    bucketInfo: Record<any, any>
}

interface IB2ListBuckets {
    buckets: IBucket[]
}

class Asset {
    apiUrl:string = '';
    authorizationToken:string = '';
    downloadUrl:string = '';
    accountId: string = '';
    request:Request | null =  null;
    buckets:Array<Partial<IBucket>> = [];

    async init() {
        const request = new Request()
        const res = await request.get('/b2api/v2/b2_authorize_account') as IRes
        this.apiUrl = res.apiUrl
        this.authorizationToken = res.authorizationToken;
        this.downloadUrl = res.downloadUrl
        this.accountId = res.accountId
        this.request = new Request(this.apiUrl, this.authorizationToken);
        // this.request.commonConfig =
    }

    async getB2ListBuckets() {
        if (!this.request) {
            return;
        }
        const query = new URLSearchParams();
        query.append('accountId', this.accountId);
        const res = await this.request.get('/b2api/v2/b2_list_buckets?' + query.toString() , {}) as IB2ListBuckets
        // useStore();
        // const [state, dispatch] = useStore();
        // 初始化store
        // const [state, dispatch] = useStore();
        // console.log('state, ', state, dispatch);
        console.log('res', res);
        this.buckets = res.buckets.map(bucket => ({bucketId: bucket.bucketId, bucketName: bucket.bucketName, }))
        eventEmitter.emit(ON_UPDATE_BUCKETS);
    }
}

export default new Asset();