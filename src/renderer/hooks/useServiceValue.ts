import {useEffect, useState} from "react";
import eventEmitter from "../utils/eventEmitter";
import {ON_UPDATE_BUCKETS, ON_UPDATE_FILE_LIST} from "../constants";
import asset from "../service/asset";

const eventName2Value = (eventName:string) => {
    if (eventName === ON_UPDATE_BUCKETS) {
        return asset.buckets
    }
    if (eventName === ON_UPDATE_FILE_LIST) {
        return asset.fileList
    }
}

const useServiceValue = (eventName) => {

    const [value, setValue] = useState(eventName2Value(eventName))

    useEffect(() => {
        const getValue = (data) => {
            setValue(data)
        }
        eventEmitter.on(eventName, getValue)
        return () => {
            eventEmitter.off(eventName, getValue)
        }
    }, []);

    return [value];
}

export default useServiceValue;