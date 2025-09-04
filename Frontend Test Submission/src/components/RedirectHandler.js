import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { log } from '../logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    const urlObject = urls.find(url => url.shortCode === shortcode);

    if (urlObject) {
      urlObject.clicks += 1;
      if (!urlObject.clickDetails) {
        urlObject.clickDetails = [];
      }
      urlObject.clickDetails.push({
        timestamp: new Date().toISOString(),
        source: document.referrer || 'Direct',
        location: 'Unknown',
      });

      localStorage.setItem('shortenedUrls', JSON.stringify(urls));
      log('frontend', 'info', 'route', `Redirecting shortcode ${shortcode} to ${urlObject.longUrl}`);
      window.location.href = urlObject.longUrl;
    } else {
      log('frontend', 'error', 'route', `Shortcode ${shortcode} not found`);
    }
  }, [shortcode]);

  return (
    <div>
      {shortcode ? <p>Redirecting...</p> : <p>URL not found</p>}
    </div>
  );
};

export default RedirectHandler;