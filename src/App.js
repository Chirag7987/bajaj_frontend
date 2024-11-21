import React from "react";
import InputForm from "./components/InputForm";
import "./styles.css";

const App = () => {
    document.title = "21100BTCSE09816"; // Set website title to roll number
    return (
        <div className="App">
            <InputForm />
        </div>
    );
};

export default App;