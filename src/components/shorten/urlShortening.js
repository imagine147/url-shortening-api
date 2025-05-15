'use client';

import { useState, useEffect } from 'react';

export default function Shortening() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('shortenedLinks');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const shortenUrl = async () => {
    if (!originalUrl.trim()) {
      setError('Please add a link');
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError('Invalid URL');
      return;
    }

    setLoading(true);
    setError('');
    setShortUrl('');
    setCopiedUrl('');

    try {
      const res = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url: originalUrl }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setShortUrl(data.result_url);

      const newEntry = { original: originalUrl, shortened: data.result_url };
      const updatedHistory = [newEntry, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('shortenedLinks', JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setOriginalUrl('');
    }
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(''), 2000);
    } catch {
      setCopiedUrl('');
    }
  };

  return (
    <div className="w-full px-6 md:px-0 relative -bottom-24 md:-bottom-17">
      {/* Input Form */}
      <div className="bg-mobile bg-cover rounded-lg p-6 md:p-4 flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-10/12 mx-auto">
        <div className="w-full md:w-[80%]">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Shorten a link here..."
            className={`w-full py-3 rounded-lg focus:outline-none text-sm placeholder:bg-white  placeholder:text-[#9e9aa7] placeholder:rounded-md placeholder:px-4 placeholder:py-2 ${
              error
                ? 'border-2 border-[#f46262] focus:ring-red-300'
                : 'focus:ring-2 focus:ring-cyan-300'
            }`}
          />
          {error && (
            <p className="text-[#f46262] text-xs mt-1 italic">{error}</p>
          )}
        </div>
        <button
          disabled={loading}
          onClick={shortenUrl}
          className="bg-[#2acfcf] text-white text-sm w-full md:w-[25%] px-6 py-2 rounded-lg font-bold hover:opacity-70 transition disabled:opacity-50"
        >
          {loading ? 'Shortening...' : 'Shorten It!'}
        </button>
      </div>

      {/* Shortened Links */}
      <div className="w-full md:w-10/12 mx-auto mt-6 flex flex-col gap-4">
        {history.map((item, idx) => (
          <div
            key={idx}
            className="bg-white flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-3 rounded-lg shadow"
          >
            <p className="text-[#35323e] text-sm truncate w-full md:w-1/2">
              {item.original}
            </p>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
              <a
                href={item.shortened}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2acfcf] text-sm break-all"
              >
                {item.shortened}
              </a>
              <button
                onClick={() => copyToClipboard(item.shortened)}
                className={`text-white px-4 py-2 text-sm rounded-md font-bold ${
                  copiedUrl === item.shortened
                    ? 'bg-[#3b3054]'
                    : 'bg-[#2acfcf] hover:opacity-70'
                }`}
              >
                {copiedUrl === item.shortened ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
