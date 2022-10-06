// import React from "react";
import {createRoot} from 'react-dom/client'

const App = () => {
    console.log('test')


    return (<h1>What's the tea</h1>)
}


const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)