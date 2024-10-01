import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import QuoteList from "./components/quotes/quotes";

function App() {
  const defaultQuotes = [
    "Have you ever thought you were in love with someone but then realized you were just staring in a mirror for 20 minutes?",
    "I need an army of angels to cover me while I pull this sword out of the stone",
    "People always say that you can't please everybody. I think that's a cop-out. Why not attempt it? Cause think of all the people that you will please if you try.",
    "People always tell you 'Be humble. Be humble.' When was the last time someone told you to be amazing? Be great! Be awesome! Be awesome!",
  ];
  const quotesUrl = "https://api.kanye.rest/";
  const [newQuote, setQuote] = useState("");
  const [favoriteQuotes, addFavoriteQuotes] = useState<string[]>(defaultQuotes);

  const fetchQuote = async () => {
    fetch(quotesUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((quote) => {
        setQuote(quote.quote);
      })
      .catch((error) => {
        throw new Error(`HTTP error! Status: ${error.status}`);
      });
  };

  const favorite = (customQuotes?: string) => {
    const failedText =
      "Failed! This quote already existed in the favorited list.";
    const successText = "Success";
    const quote = customQuotes ? customQuotes : newQuote;
    let found = favoriteQuotes.find((q) => q === quote);
    if (!found) {
      addFavoriteQuotes((prevFavoriteQuotes) => [...prevFavoriteQuotes, quote]);
      alert(successText);
    } else {
      alert(failedText);
    }
  };

  const addCustomQuote = () => {
    const input = prompt("Add your quote:");
    if (input) {
      favorite(input);
    }
  };

  useEffect(() => {
    //Can't use fetch quote directly due to async issue with useEffect
    const fetchData = async () => {
      try {
        await fetchQuote();
      } catch (error) {
        console.error(error);
      }
    };
    if (!newQuote) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <div className="card">
        <div className="quote">{newQuote ? newQuote : "Loading"}</div>
        <div className="flex">
          <button
            onClick={async () => {
              setQuote("");
              await fetchQuote();
            }}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Get Quote
          </button>
          <button
            onClick={() => {
              favorite();
            }}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Add Favorite
          </button>
          <button
            onClick={() => {
              addCustomQuote();
            }}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Add custom quote
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <QuoteList quotes={favoriteQuotes} />
      </div>
    </div>
  );
}

export default App;
