import React, { useState } from "react";
import "../css/Faq.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const faqData = [
  {
    question: "What is cryptocurrency?",
    answer:
      "Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates independently of a central authority."
  },
  {
    question: "How do I buy crypto?",
    answer:
      "You can buy crypto on exchanges using a bank account, credit card, or other cryptocurrencies."
  },
  {
    question: "Is crypto safe?",
    answer:
      "Crypto can be safe if stored in secure wallets and traded on reputable platforms, but it is also volatile and subject to risk."
  },
  {
    question: "What is blockchain?",
    answer:
      "Blockchain is a distributed ledger technology that records transactions across multiple computers securely."
  },
  {
    question: "About official accounts",
    answer:
      "Official accounts are verified accounts associated with a specific organization or individual."
  },
  {
    question: "What is transaction volume?",
    answer:
      "Transaction volume refers to the total number or value of transactions over a specific period."
  },
  {
    question: "Why do we need to transfer funds?",
    answer:
      "Fund transfers allow for the movement of digital assets between wallets or accounts for trading or payments."
  },
  {
    question: "What are futures?",
    answer:
      "Futures are financial contracts obligating the buyer to purchase or sell an asset at a predetermined future date and price."
  },
  {
    question: "What does the assets after conversion change?",
    answer:
      "Converted assets will reflect new values in your wallet based on the currency they were converted into."
  },
  {
    question: "Why do we need real-name authentication?",
    answer:
      "Real-name authentication helps prevent fraud and ensures compliance with regulations."
  },
  {
    question: "What is frozen assets?",
    answer:
      "Frozen assets are funds that are temporarily restricted from withdrawal or trading."
  },
  {
    question: "What are the rules of futures trading?",
    answer:
      "Futures trading rules include margin requirements, leverage limits, and contract expiration dates."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-tag">
        <p>FAQs</p>
      </div>
      <div className="section-title">Frequently Asked Questions</div>
      <p className="faq-subtext">
        Follow design trends and continually update your skills by learning new
        tools and techniques.
      </p>
      <div className="faq-grid">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              role="button"
              tabIndex={0}
            >
              <p>{item.question}</p>
              <FontAwesomeIcon
                icon={activeIndex === index ? faChevronUp : faChevronDown}
                className={`faq-icon ${activeIndex === index ? "open" : ""}`}
              />
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
            <hr className="faq-divider" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
