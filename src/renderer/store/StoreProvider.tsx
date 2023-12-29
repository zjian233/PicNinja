import  React, {useReducer} from "react";


import StoreContext from "./StoreContext";

interface IStore {

}

interface IAction {
    payload: Partial<IStore>,
    type: string
}


const initialState: IStore = {

}

const reducer = (state: IStore, action: IAction) => {
    switch (action.type) {
        case 'UPDATE':
            return {...state, data: action.payload};
        default:
            return {...state}
    }
}


const StoreProvider = ({children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;