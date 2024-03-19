// HiraganaList.js
import React, { useState } from 'react';

const hiraganaCharacters = [
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や', 'ゆ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'を', 'ん', 'ー', '゛', '゜'
];

const HiraganaList = ({ onCharacterClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);



  const handleKeyDown = (event) => {
    const { key } = event;
    let newIndex = selectedIndex;

    // if (key === 'ArrowLeft') {
    //   newIndex = (selectedIndex - 1 + hiraganaCharacters.length) % hiraganaCharacters.length;
    // } else if (key === 'ArrowRight') {
    //   newIndex = (selectedIndex + 1) % hiraganaCharacters.length;
    // } else if (key === 'Enter') {
    //   onCharacterClick(hiraganaCharacters[selectedIndex]);
    // } else if (key === 'Backspace' ) {

    // }

    switch (key) {
      case 'ArrowLeft':
        newIndex = (selectedIndex - 1 + hiraganaCharacters.length) % hiraganaCharacters.length;
        break;
      case 'ArrowRight':
        newIndex = (selectedIndex + 1) % hiraganaCharacters.length;
        break;
      case 'Enter':
        onCharacterClick(hiraganaCharacters[selectedIndex]);

        break;
      default:
        break;  
    }

    

    setSelectedIndex(newIndex);
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown}>
      {hiraganaCharacters.map((character, index) => (
        <span
          key={character}
          onClick={() => onCharacterClick(character)}
          style={{ backgroundColor: index === selectedIndex ? 'yellow' : 'transparent' }}
        >
          {character}
        </span>
      ))}
    </div>
  );
};

export default HiraganaList;