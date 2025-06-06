import React, { useState } from 'react';
import axios from 'axios';
import AnalyzerForm from './components/AnalyzerForm';

function App() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextSubmit = async (text) => {
    setLoading(true);
    setResults(null);
    try {
      const res = await axios.post('https://seo-analyzer-backend-ocn4.onrender.com/analyze', {
        text: inputText
      });
      console.log("API Response:", res.data);  // helpful log for debugging
      setResults(res.data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInsertKeyword = (keyword) => {
    let modifiedText;
    const periodIndex = inputText.lastIndexOf(".");
    
    if (periodIndex !== -1) {
      // Insert keyword before the last period
      modifiedText =
        inputText.slice(0, periodIndex).trim() +  // text before the period
        ` ${keyword}.`;                           // space + keyword + period
    } else {
      // No period found, just append the keyword
      modifiedText = inputText.trim() + ` ${keyword}`;
    }
    
    setInputText(modifiedText);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <AnalyzerForm
        onSubmit={handleTextSubmit}
        inputText={inputText}
        setInputText={setInputText}
      />
      {loading && <p className="text-center mt-4 text-blue-600">Analyzing...</p>}
      {results && (
        <div className="max-w-3xl mx-auto p-4 mt-6 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-2">Analysis Results:</h2>
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Keywords:</h3>
            {results.keywords && results.keywords.length > 0 ? (
              <ul className="list-disc ml-6">
                {results.keywords.map((kw, index) => (
                  <li key={index} className="mb-1 flex items-center justify-between">
                    <span>{kw.keyword}</span>
                    <button
                      onClick={() => handleInsertKeyword(kw.keyword)}
                      className="ml-4 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Insert
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No keywords found.</p>
            )}
          </div>
          <pre className="text-sm text-gray-700 overflow-x-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
