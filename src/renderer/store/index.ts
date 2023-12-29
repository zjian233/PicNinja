
import StoreProvider from "./StoreProvider";

import StoreContext from "./StoreContext";
import {useContext} from "react";



const useStore = () => {
    return useContext(StoreContext);
}
const store = {
    StoreContext,
    StoreProvider,
    useStore
}
export default store