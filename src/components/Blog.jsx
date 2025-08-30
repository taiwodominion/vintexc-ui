import React, { useEffect, useState } from 'react';
import '../css/Blog.css';

const Blog = () => {
  const [news, setNews] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const fetchNews = async () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    try {
      const res = await fetch(
        'https://api.vintexc.com/apps/trade/get_news',
        requestOptions
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    const loadNews = async () => {
      const result = await fetchNews();
      if (result?.status === 'success') {
        setNews(result.data);
        console.log('The message was sent successfully');
      }
    };

    loadNews();
  }, []);

  const shortenText = (text, limit) => {
    const words = text.split(' ');
    if (words.length === limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const shortenHeadText = (text, limit) => {
    const words = text.split(' ');
    if (words.length === limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const toggleExpand = (index) => {
    console.log('The learn button has been clicked ');
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expand/collapse
  };

  return (
    <div className="overlay">
      <div className="blog-container">
        <div className="section-label">
          <div className="section-label-text">Blog</div>
        </div>
        <div className="section-title">News and Informations</div>
        <p>
          Follow trading trends and continually update your skills by learning
          new techniques from the world.
        </p>
        <div className="blog-grid">
          {news &&
            news.map((item, index) => (
              <div
                className={`blog-box ${
                  expandedIndex === index ? 'expanded' : ''
                }`} 
                key={index}
              >
                <h2>
                  {expandedIndex === index
                    ? item.title
                    : shortenHeadText(item.title, 7)}
                </h2>
                <p>
                  {expandedIndex === index
                    ? item.description
                    : shortenText(item.description, 13)}
                </p>
                <img src={item.image} alt="" />
                <button id="learn-more-btn" onClick={() => toggleExpand(index)}>
                  {expandedIndex === index ? 'Show Less' : 'Learn More'}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;