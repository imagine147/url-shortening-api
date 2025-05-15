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
      const res = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`
      );
      if (!res.ok) throw new Error('Failed to shorten URL');

      const short = await res.text(); // TinyURL returns plain text
      setShortUrl(short);

      const newEntry = { original: originalUrl, shortened: short };
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
    <div className="w-full px-6 md:px-0 relative -bottom-24 md:-bottom-64">
      {/* Input Form */}
      <div className="bg-mobile bg-cover rounded-lg p-6 md:p-10 flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-10/12 mx-auto">
        <div className="w-full md:w-[80%]">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Shorten a link here..."
            className={`w-full py-3 rounded-lg focus:outline-none text-sm placeholder:bg-white  placeholder:text-[#9e9aa7] placeholder:rounded-md placeholder:px-4 placeholder:py-2  ${
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
          onClick={shortenUrl}
          disabled={loading}
          className="bg-[#2acfcf] text-white text-sm w-full md:w-[20%] px-6 py-2 rounded-lg font-bold hover:opacity-70 transition disabled:opacity-50"
        >
          {loading ? 'Shortening...' : 'Shorten It!'}
        </button>
      </div>

      {/* Shortened URL Result */}
      {shortUrl && (
        <div className="w-full md:w-10/12 mx-auto mt-4 flex items-center gap-4 bg-blue-100 text-blue-900 px-4 py-2 rounded">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline break-all"
          >
            {shortUrl}
          </a>
          <button
            onClick={() => copyToClipboard(shortUrl)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Copy
          </button>
          {copiedUrl && <span className="text-green-600">Copied!</span>}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="w-full md:w-10/12 mx-auto mt-4 text-[#f46262] bg-red-100 px-4 py-2 rounded text-center">
          Error: {error}
        </div>
      )}

      {/* History of Shortened Links */}
      {history.length > 0 && (
        <div className="w-full md:w-10/12 mx-auto mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">History</h3>
          <ul className="space-y-2">
            {history.map((item, idx) => (
              <li
                key={idx}
                className="bg-white px-4 py-3 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <span className="text-[#35323e] text-sm truncate w-full md:w-1/2">
                  {item.original}
                </span>
                <div className="flex items-center gap-4">
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
