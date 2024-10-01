import React from "react";
import "./quotes.css";
import card1 from "../../resources/card1.jpg";
import card2 from "../../resources/card2.jpg";
import card3 from "../../resources/card3.jpg";
import card4 from "../../resources/card4.jpg";
import card5 from "../../resources/card5.jpg";

interface quoteProps {
  quotes: string[];
}

const cards = [card1, card2, card3, card4, card5];

const QuoteList: React.FC<quoteProps> = ({ quotes: favoriteQuotes }) => {
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle("hover");
  };

  return (
    <div className="wrapper">
      <h1>Favorited Quote</h1>
      <div className="cols">
        {favoriteQuotes.map((quote, index) => (
          <div className="col" onTouchStart={handleTouchStart}>
            <div className="container">
              <div
                className="front"
                style={{
                  backgroundImage: `url(${cards[index % cards.length]})`,
                }}
              >
                <div className="inner">
                  <p>Quote #{index + 1}</p>
                  <span>
                    {quote.length > 20 ? quote.slice(0, 20) + "..." : quote}
                  </span>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>{quote}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteList;
