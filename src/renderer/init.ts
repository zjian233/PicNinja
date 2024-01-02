import asset from './service/asset';

const init = async () => {
    // await // console.log('asset:', asset)
    await  asset.init()
    await asset.getB2ListBuckets()
}

export default init;