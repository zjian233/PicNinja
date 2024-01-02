import React from "react";
import StoreProvider from "./store/StoreProvider";
import Home from "./pages/Home";

const App = () => {
    return <StoreProvider>
        <Home></Home>
    </StoreProvider>
}

export default App;
