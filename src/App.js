import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState("");
  const [selected, setSelected] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(myMoney);
    if (myMoney === "") return;
    setMyMoney("");
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const handleSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const selectedCoin = coins.find((coin) => coin.id === selected);
  const selectedPrice = selectedCoin ? selectedCoin.quotes.USD.price : null;

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => setMyMoney(e.target.value)}
          value={myMoney}
          type="text"
          placeholder="How much do you change?"
        />
        <button>Submit</button>
      </form>
      <div>
        {loading ? (
          <strong>Loading ...</strong>
        ) : (
          <select
            name="choose a coin"
            value={selected}
            onChange={handleSelectChange}
          >
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        {selectedPrice !== null && (
          <>
            <p>Selected Coin Price: ${selectedPrice} USD</p>
            <p>How much I can buy? ${myMoney / selectedPrice}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
