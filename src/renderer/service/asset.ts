import Request from "../utils/request";
import eventEmitter from "../utils/eventEmitter";
import {ON_UPDATE_BUCKETS, ON_UPDATE_FILE_LIST} from "../constants";

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

interface IFile {
    fileId: string,
    fileInfo: {
        src_last_modified_millis: string
    },
    fileName: string,
    contentLength: number,
    contentMd5: string,
    contentSha1: string,
    contentType: string,
    uploadTimestamp: number,
}

interface IB2ListFiles {
    files: IFile[]
}

class Asset {
    apiUrl:string = '';
    authorizationToken:string = '';
    downloadUrl:string = '';
    accountId: string = '';
    request:Request | null =  null;
    buckets:Array<Partial<IBucket>> = [];
    fileList: IFile[] = [];

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
        this.buckets = res.buckets.map(bucket => ({bucketId: bucket.bucketId, bucketName: bucket.bucketName, }))
        eventEmitter.emit(ON_UPDATE_BUCKETS, this.buckets);
    }

    async getB2ListFileNames(bucketId:string) {
        if (!this.request) {
            return;
        }
        const query = new URLSearchParams();
        query.append('bucketId', bucketId);
        const res = await this.request.get('/b2api/v2/b2_list_file_names?' + query.toString() , {}) as IB2ListFiles
        this.fileList = res.files
        eventEmitter.emit(ON_UPDATE_FILE_LIST, this.fileList);
    }
}

export default new Asset();