import React, {useEffect, useState} from "react";
import eventEmitter from "../utils/eventEmitter";
import asset, {IBucket} from "../service/asset";
import {ON_UPDATE_BUCKETS} from "../constants";


const Home = () => {
    const [buckets, setBuckets] = useState<Array<Partial<IBucket>>>([])
    console.log('buckets:', buckets);
    useEffect(() => {
        const onUpdateBuckets = () => {
            console.log('执行了event')
            setBuckets(asset.buckets)
        }
        eventEmitter.on(ON_UPDATE_BUCKETS, onUpdateBuckets)
        onUpdateBuckets();
        return () => {
            eventEmitter.off(ON_UPDATE_BUCKETS, onUpdateBuckets)
        }
    }, []);
    return (<div className={"p-1"}>
        {buckets.map(item => item.bucketName)}
    </div>)
}

export default Home;