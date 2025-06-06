# 🧠 SEO Analyzer Web App

This is a simple and effective SEO Analyzer built with the Express.js , Node.js and React.js . It allows users to input a block of text and receive keyword and topic analysis using the TextRazor NLP API.

## ✨ Features

- Analyze any block of text (e.g., blogs, tweets, newsletters).
- Get keyword suggestions with confidence scores and Wikipedia links.
- Identify relevant topics from the content.
- Insert suggested keywords into the text.
- Simple and clean Tailwind CSS UI.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **External API**: [TextRazor NLP API](https://www.textrazor.com/)

## 🔗 Live Demo

- 🌐 **Frontend**: [SEO Analyzer Frontend](https://seo-analyzer-pearl.vercel.app/)  
- 🚀 **Backend**: [SEO Analyzer Backend API](https://seo-analyzer-backend-ocn4.onrender.com)

---  

## 🚀 Getting Started

### 1. Clone the repo

```bash

# 1. Clone the repository
git clone https://github.com/your-username/seo-analyzer.git
cd seo-analyzer

# 2. Set up the backend
cd backend
npm install

# 3. Create a .env file inside the backend directory and add your TextRazor API key
echo "TEXTRAZOR_API_KEY=your_textrazor_api_key" > .env

# 4. Start the backend server
npm run dev

# 5. Open a new terminal tab/window and set up the frontend
cd ../frontend
npm install

# 6. Start the frontend dev server
npm run dev
