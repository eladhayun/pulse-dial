import { useCallback, useEffect, useState } from 'react';
import { getRandomArbitraryDialableAsString, getNullArray, timeInRange } from './utils'
import './App.css';

function Asterisks({ randomNumber, asterisk, stage, attempts }) {
  const currentDigit = parseInt([...randomNumber][stage]);
  const digitArray = Array.from({ length: currentDigit }, (_, i) => i);

  return (
    <div className="App-asterisks">
      {digitArray.map((_, i) => (
        <p
          key={i}
          className={`App-asterisk ${attempts[i] === true
            ? "App-asterisk-success"
            : attempts[i] === false
              ? "App-asterisk-fail"
              : ""}`
          }
        >
          {i < asterisk ? "*" : ""}
        </p>
      ))}
    </div>
  )
}

function RandomNumber({ randomNumber, stage }) {
  return (
    <div className="App-number">
      {
        [...randomNumber].map((s, i) => (
          <div
            key={i}
            className={stage === i ? "App-digit-active" : ""}>
            {s}
          </div>)
        )
      }
    </div>
  )
}

function App() {
  const [randomNumber, setRandomNumber] = useState(getRandomArbitraryDialableAsString());
  const [stage, setStage] = useState(0);
  const [asterisk, setAsterisk] = useState(0);
  const [attempts, setAttempts] = useState(getNullArray(randomNumber, stage));
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (asterisk === parseInt([...randomNumber][stage])) {
      setTimeout(() => {
        const nextStage = stage + 1;
        setAsterisk(0);
        setAttempts(getNullArray(randomNumber, stage));
        if (nextStage === randomNumber.length) {
          setRandomNumber(getRandomArbitraryDialableAsString());
          setStage(0);
        } else {
          setStage(nextStage);
        }
      }, 500);
    }
  }, [asterisk, randomNumber, stage]);

  useEffect(() => {
    if (attempts.some(a => a === false)) {
      setTimeout(() => {
        const randomNumber = getRandomArbitraryDialableAsString();
        setRandomNumber(randomNumber);
        setStage(0);
        setAsterisk(0);
        setAttempts(getNullArray(randomNumber, 0));
        setTime(new Date());
      }, 500);
    }
  }, [attempts]);

  const nextHandler = useCallback(() => {
    setTime(new Date());
    setAsterisk(asterisk + 1);
    setAttempts(attempts.map((_, i) => {
      if (i === 0) {
        return true;
      }
      else if (i <= asterisk) {
        return timeInRange(time)
      } else {
        return null
      }
    }));
  }, [asterisk, setAsterisk, setAttempts, attempts, setTime, time]);

  return (
    <div className="App" onClick={nextHandler} onKeyUp={nextHandler} tabIndex={0}>
      <header className="App-header">
        <RandomNumber
          randomNumber={randomNumber}
          stage={stage}
        />
        <Asterisks
          randomNumber={randomNumber}
          asterisk={asterisk}
          stage={stage}
          attempts={attempts}
        />
      </header>
    </div>
  );
}

export default App;
