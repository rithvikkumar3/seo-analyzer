// components/AnalyzerForm.js
import React from 'react';

function AnalyzerForm({ onSubmit, inputText, setInputText }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onSubmit(inputText);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 mt-6 bg-white shadow-md rounded-md">
      <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-700">
        Enter Text to Analyze
      </label>
      <textarea
        id="text"
        rows="6"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste blog, caption, or text here..."
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Analyze
      </button>
    </form>
  );
}

export default AnalyzerForm;
