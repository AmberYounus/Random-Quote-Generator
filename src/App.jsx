import { useState, useRef, useEffect } from 'react';
import './App.css';



const App = () => {
  const [quotes, setquotes] = useState('');
  const textRef = useRef();
  let colors = ["#2869d1", "#2869d1", "#a62b2b", "#1cb5bd", "#b7bf1f"]

  const getQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      // .then(console.log);
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length)
        setquotes(data[randomNum])
      })
  }
  useEffect(() => {
    getQuote();
  }, [])
  useEffect(() => {
    textRef.current.style.color = colors[Math.floor(Math.random() * colors.length)]
  }, [quotes])

  return (
    <>
      <div className="App">
        <div className="quote">
          <p ref={textRef}><b>{quotes.text}</b></p>
          <br />
          <p> Author : <i> {quotes.author}</i> </p>
          <br />
          <div className="btnContainer">
            <button onClick={getQuote} className='btn'>Get Quote</button>
            <a href={`https://twitter.com/intent/tweet?text=${quotes.text}`}
              target="_blank"
              rel='noreferrer noopener'
              className='btn'>Tweet</a>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
