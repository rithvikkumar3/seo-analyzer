// App.js
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
      const res = await axios.post('http://localhost:5000/analyze', {
        text: text
      });
      setResults(res.data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInsertKeyword = (keyword) => {
    const newText = inputText + ' ' + keyword;
    setInputText(newText);
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
