// App.js
import React, { useState, useEffect, useCallback } from 'react';
import HiraganaList from './HiraganaList';
// import TextBox from './TextBox';

const App = () => {
  const [inputText, setInputText] = useState('');

  const handleCharacterClick = (character) => {
    setInputText(inputText + character);
  };

  const handleReadAloud = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  }, [inputText]);

  const handleKeyDown = (event) => {
    if (event.key === 'Delete') {
      setInputText(inputText.slice(0, -1));
      event.preventDefault();
    } else if (event.key === 'Enter') {
      setInputText('');
    }
  }

    useEffect(() => {
      const handleKeyDown = (event) => {

        switch (event.key) {
          case 'Backspace':
            setInputText(inputText.slice(0, -1));
            event.preventDefault();  // デフォルトのバックスペースの動作を防ぐ
            break;
          case '^':
            handleReadAloud();
            event.preventDefault();
            break;
          default:
            break;
        }
      };
  
      // イベントリスナーを追加
      window.addEventListener('keydown', handleKeyDown);
  
      // コンポーネントがアンマウントされるときにイベントリスナーを削除
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [inputText, handleReadAloud]);

  return (
    <div>
      <HiraganaList onCharacterClick={handleCharacterClick} />
      {/* <HiraganaList onCharacterClick={handleCharacterClick} />
      <TextBox
        inputText={inputText}
        onReadAloud={handleReadAloud}
      />
      <button onClick={handleReadAloud}>Read aloud</button> */}
      <input type="text" value={inputText} 
        onChange={e => setInputText(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <button onClick={handleReadAloud}>読み上げ</button>
    </div>
  );
};

export default App;