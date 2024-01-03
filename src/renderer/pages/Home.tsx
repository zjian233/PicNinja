import React, {useEffect, useState} from "react";
import asset, {IBucket} from "../service/asset";
import {ON_UPDATE_BUCKETS, ON_UPDATE_FILE_LIST} from "../constants";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import useServiceValue from "../hooks/useServiceValue";

const Home = () => {
    const [buckets] = useServiceValue(ON_UPDATE_BUCKETS)
    const [files]= useServiceValue(ON_UPDATE_FILE_LIST)
    const [currentBucket, setCurrentBucket] = useState(null)

    const onItemClick = async (item) => {
        if (!item) {
            return;
        }

        setCurrentBucket(item);

        await asset.getB2ListFileNames(item.bucketId)
    }

    return (<div className={"p-1"}>
        <List>
            {buckets.map(item => (
                <ListItem disablePadding key={item.bucketId}>
                    <ListItemButton onClick={() => onItemClick(item)}>
                        <ListItemText primary={item.bucketName} />
                    </ListItemButton>
                </ListItem>)
            )}

        </List>
        <div className={"flex flex-wrap justify-between "}>
            {files.map(item => (
                    <div  key={item.fileId} className={"basis-[calc(33%-2px)] mb-2 "}>
                        <img src={`https://static.zjian.xyz/file/${currentBucket.bucketName}/${item.fileName}`}/>
                    </div>
                )
            )}
        </div>



    </div>)
}

export default Home;