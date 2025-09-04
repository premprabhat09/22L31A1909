import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { log } from './logger';
import { Button, Container, TextField, Typography, Box, IconButton, Alert, AppBar, Tabs, Tab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Statistics from './components/Statistics';
import RedirectHandler from './components/RedirectHandler';

const URLShortener = () => {
  const [inputFields, setInputFields] = useState([
    { longUrl: '', validity: '', shortCode: '' }
  ]);
  const [error, setError] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState([]);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls'));
    if (storedUrls) {
      setShortenedUrls(storedUrls);
    }
    log("frontend", "info", "page", "URL Shortener page loaded");
  }, []);

  const handleAddRow = () => {
    if (inputFields.length < 5) {
      setInputFields([...inputFields, { longUrl: '', validity: '', shortCode: '' }]);
      log("frontend", "info", "component", "Added new URL input row");
    }
  };

  const handleRemoveRow = (index) => {
    const newFields = [...inputFields];
    newFields.splice(index, 1);
    setInputFields(newFields);
    log("frontend", "info", "component", `Removed URL input row at index: ${index}`);
  };

  const handleInputChange = (index, event) => {
    const newFields = [...inputFields];
    newFields[index][event.target.name] = event.target.value;
    setInputFields(newFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    let isValid = true;
    const newShortenedUrls = [];
    const allUrls = [...shortenedUrls];

    const generateRandomShortcode = () => {
      let code;
      let isUnique = false;
      while (!isUnique) {
        code = Math.random().toString(36).substring(2, 8);
        if (!allUrls.some(url => url.shortCode === code)) {
          isUnique = true;
        }
      }
      return code;
    };

    for (let i = 0; i < inputFields.length; i++) {
      const field = inputFields[i];
      try {
        new URL(field.longUrl);
      } catch (_) {
        isValid = false;
        const errorMessage = `Invalid URL format for row ${i + 1}`;
        log("frontend", "error", "component", errorMessage);
        setError(errorMessage);
        break;
      }

      if (field.validity && (!Number.isInteger(Number(field.validity)) || Number(field.validity) <= 0)) {
        isValid = false;
        const errorMessage = `Invalid validity period for row ${i + 1}. Must be a positive integer.`;
        log("frontend", "error", "component", errorMessage);
        setError(errorMessage);
        break;
      }

      let shortCode = field.shortCode;
      if (shortCode) {
        if (allUrls.some(url => url.shortCode === shortCode)) {
          isValid = false;
          const errorMessage = `Custom shortcode '${shortCode}' already exists.`;
          log("frontend", "error", "component", errorMessage);
          setError(errorMessage);
          break;
        }
      } else {
        shortCode = generateRandomShortcode();
      }

      const validityInMinutes = field.validity ? parseInt(field.validity, 10) : 30;
      const createdAt = new Date().toISOString();
      const expiresAt = new Date(Date.now() + validityInMinutes * 60 * 1000).toISOString();
      const shortUrl = `${window.location.origin}/${shortCode}`;

      const newUrl = {
        longUrl: field.longUrl,
        shortUrl,
        shortCode,
        createdAt,
        expiresAt,
        clicks: 0,
      };
      newShortenedUrls.push(newUrl);
      allUrls.push(newUrl); // Add to allUrls to check for duplicates in the same batch
      log("frontend", "info", "component", `Successfully created short URL for: ${field.longUrl}`);
    }

    if (isValid && newShortenedUrls.length > 0) {
      const updatedUrls = [...shortenedUrls, ...newShortenedUrls];
      setShortenedUrls(updatedUrls);
      localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
      setInputFields([{ longUrl: '', validity: '', shortCode: '' }]);
      log("frontend", "info", "component", "All inputs validated and processed successfully");
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        URL Shortener
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        {inputFields.map((field, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              name="longUrl"
              label="Long URL"
              variant="outlined"
              value={field.longUrl}
              onChange={(e) => handleInputChange(index, e)}
              sx={{ mr: 1, flexGrow: 1 }}
              required
            />
            <TextField
              name="validity"
              label="Validity (minutes)"
              variant="outlined"
              type="number"
              value={field.validity}
              onChange={(e) => handleInputChange(index, e)}
              sx={{ mr: 1, width: '150px' }}
            />
            <TextField
              name="shortCode"
              label="Custom Shortcode (optional)"
              variant="outlined"
              value={field.shortCode}
              onChange={(e) => handleInputChange(index, e)}
              sx={{ width: '200px' }}
            />
            {inputFields.length > 1 && (
              <IconButton onClick={() => handleRemoveRow(index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Button variant="outlined" onClick={handleAddRow} disabled={inputFields.length >= 5} sx={{ mr: 1 }}>
          Add More
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
      {shortenedUrls.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Shortened URLs
          </Typography>
          {shortenedUrls.map((url, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
              <Typography><strong>Original URL:</strong> {url.longUrl}</Typography>
              <Typography><strong>Short URL:</strong> <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></Typography>
              <Typography><strong>Expires At:</strong> {new Date(url.expiresAt).toLocaleString()}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="URL Shortener" component={Link} to="/" />
          <Tab label="Statistics" component={Link} to="/stats" />
        </Tabs>
      </AppBar>
      <Routes>
        <Route path="/" element={<URLShortener />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
