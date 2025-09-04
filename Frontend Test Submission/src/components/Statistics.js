import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Collapse,
  Box,
} from '@mui/material';
import { log } from '../logger';

const Statistics = () => {
  const [urls, setUrls] = useState([]);
  const [open, setOpen] = useState({});

  useEffect(() => {
    log('frontend', 'info', 'page', 'Statistics page loaded');
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    setUrls(storedUrls);
  }, []);

  const handleToggle = (shortCode) => {
    setOpen(prev => ({ ...prev, [shortCode]: !prev[shortCode] }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <React.Fragment key={url.shortCode}>
                <TableRow>
                  <TableCell>
                    <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                      {url.shortUrl}
                    </a>
                  </TableCell>
                  <TableCell>{url.longUrl}</TableCell>
                  <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
                  <TableCell>{url.clicks}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleToggle(url.shortCode)}
                      disabled={!url.clickDetails || url.clickDetails.length === 0}
                    >
                      {open[url.shortCode] ? 'Hide' : 'Show'}
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open[url.shortCode]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          Click Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Timestamp</TableCell>
                              <TableCell>Source</TableCell>
                              <TableCell>Location</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {url.clickDetails?.map((detail, index) => (
                              <TableRow key={index}>
                                <TableCell>{new Date(detail.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{detail.source}</TableCell>
                                <TableCell>{detail.location}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Statistics;