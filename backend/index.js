// index.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await axios.post(
      'https://api.textrazor.com/',
      new URLSearchParams({
        text,
        extractors: 'entities,topics,words',
      }),
      {
        headers: {
          'x-textrazor-key': process.env.TEXTRAZOR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { entities = [], topics = [] } = response.data.response;

    // 1. Get top 5 keywords by confidence score
    const sortedEntities = (entities || [])
      .filter(e => e.matchedText) // Remove incomplete ones
      .sort((a, b) => b.confidenceScore - a.confidenceScore)
      .slice(0, 5)
      .map(e => ({
        keyword: e.matchedText,
        confidence: e.confidenceScore,
        wikiLink: e.wikiLink,
      }));

    // 2. Get top 5 topics by score
    const sortedTopics = (topics || [])
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(t => ({
        topic: t.label,
        score: t.score,
        wikiLink: t.wikiLink,
      }));

    res.json({
      keywords: sortedEntities,
      topics: sortedTopics,
    });

  } catch (error) {
    console.error('TextRazor Error:', error.message);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
});

app.post('/insert-keyword', (req, res) => {
  const { text, keyword } = req.body;

  if (!text || !keyword) {
    return res.status(400).json({ error: 'Both text and keyword are required.' });
  }

  // If keyword already exists, skip insertion
  if (text.toLowerCase().includes(keyword.toLowerCase())) {
    return res.json({ modifiedText: text });
  }

  // Naively insert keyword before last period
  let modifiedText;

  const periodIndex = text.lastIndexOf(".");
  if (periodIndex !== -1) {
    modifiedText =
      text.slice(0, periodIndex).trim() +
      ` ${keyword}` +
      text.slice(periodIndex);
  } else {
    // No period, just append to end
    modifiedText = text.trim() + ` ${keyword}`;
  }

  res.json({ modifiedText });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
