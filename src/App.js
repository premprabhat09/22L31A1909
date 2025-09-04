import React, { useState, useEffect } from 'react';
import { createShortUrl, getAllLinks } from './api'; // Import our fake backend functions

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [newShortLink, setNewShortLink] = useState('');
  const [allLinks, setAllLinks] = useState([]);

  // This code runs once when the page loads to get the list of links
  useEffect(() => {
    getAllLinks().then(data => {
      setAllLinks(data);
    });
  }, []);

  // This function runs when you click the "Shorten" button
  const handleSubmit = async (event) => {
    event.preventDefault(); // Stop the page from reloading
    if (!longUrl) {
      alert('Please enter a URL');
      return;
    }
    const result = await createShortUrl(longUrl); // Call our fake backend
    setNewShortLink(result.shortLink); // Show the new link
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>URL Shortener</h1>

      {/* --- The Form --- */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter a long URL here"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          style={{ width: '300px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px' }}>Shorten</button>
      </form>

      {/* --- Show the result here --- */}
      {newShortLink && <p>Your new link is: {newShortLink}</p>}

      <hr />

      {/* --- The Statistics Page section --- */}
      <h2>Statistics (All Links)</h2>
      <ul>
        {allLinks.map((link) => (
          <li key={link.shortLink}>
            {link.shortLink} - Clicks: {link.clicks}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
