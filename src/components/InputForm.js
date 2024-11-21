import React, { useState } from "react";
import axios from "axios";
import DropdownFilter from "./DropdownFilter";
import "../styles.css";

const InputForm = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [error, setError] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [filteredResponse, setFilteredResponse] = useState(null);

    // Validate JSON and call API
    const handleSubmit = async () => {
        try {
            setError(""); // Clear previous errors
            const parsedInput = JSON.parse(jsonInput);
    
            // Call backend API
            const response = await axios.post("http://localhost:3000/bfhl", parsedInput);
            setResponseData(response.data);
            setFilteredResponse(response.data); // Default: Full response
        } catch (err) {
            // Handle JSON parsing error
            if (err instanceof SyntaxError) {
                setError("Invalid JSON format. Please check your input.");
            } else if (err.response) {
                // Handle API errors
                setError(`API Error: ${err.response.statusText}`);
            } else {
                // Handle other errors
                setError("An unexpected error occurred. Please try again.");
            }
            console.error(err);
        }
    };
    

    // Update filtered response based on dropdown selections
    const handleFilterChange = (selectedOptions) => {
        if (!responseData) return;

        const filters = selectedOptions.map((option) => option.value);
        const filtered = {};

        // Map the selected filters to the response fields
        if (filters.includes("Numbers")) filtered.numbers = responseData.numbers;
        if (filters.includes("Alphabets")) filtered.alphabets = responseData.alphabets;
        if (filters.includes("Highest Lowercase Alphabet"))
            filtered.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;

        setFilteredResponse(filtered);
    };

    return (
        <div className="input-form">
            <h1>BFHL Frontend</h1>

            {/* JSON Input */}
            <textarea
                placeholder='Enter JSON, e.g., {"data":["A","C","z"]}'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>Submit</button>

            {/* Error Message */}
            {error && <p className="error">{error}</p>}

            {/* Dropdown and Filtered Response */}
            {responseData && (
                <>
                    <DropdownFilter onChange={handleFilterChange} />
                    <div className="response">
                        <h3>Filtered Response:</h3>
                        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
                    </div>
                </>
            )}
        </div>
    );
};

export default InputForm;
