import React, {FormEventHandler, useContext, useState} from "react";
import keyConfig from '../../keyConfig';
import request from "./utils/request";
// import {useStore, StoreProvider } from './store/index';
import StoreProvider from "./store/StoreProvider";
import useStore from "./store/useStore";

const App = () => {
    const [key, setKey] = useState('');
    const [res, setRes] = useState('');

    const a = useStore();
    console.log('a:', a);
    const onFormSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        const ret = await request.get('/b2api/v2/b2_authorize_account')
        // console.log('ret: ', ret);
        // console.log('提交');
        // const res = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
        //     method: 'GET',
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: 'Basic' + btoa(`${keyConfig.keyId}:${keyConfig.key}`)
        //     }
        // })
        // console.log(res);
        // setRes(res.toString());
        // const reader = res.body?.getReader();

    }

    return <StoreProvider>
        <div className={"p-1"}>
            <form onSubmit={onFormSubmit}>
                <input value={key} onChange={(e) => setKey(e.target.value || '')}  className={"w-60 h-9 border border-indigo-600"}/>
                <button type="submit">确认</button>
            </form>
            <div dangerouslySetInnerHTML={{__html: res}}></div>
        </div>
    </StoreProvider>
}

export default App;
