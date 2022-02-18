
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import './LabelScanner.css';

function LabelScanner() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");

  const handleClick = () => {
    console.log(imagePath);
    Tesseract.recognize(imagePath, 'eng', {
      logger: m => setText('Status: ' + m.status + ', Progress: ' + m.progress * 100)
    })
      .catch(err => {
        console.error(err);
      })
      .then(result => {
        console.log(result);
        setText(result.data.text);
        // if (String(result.data.text).toLowerCase().includes('carbonated')) {
        //   setText('this is carbonated');
        // }
        // else {
        //   setText('this is not carbonated');
        // }
      })
  }

  return (
    <div className="label-scanner">
      <div className='input-container'>
        <div className='ls-btn-input btn btn-outline-primary btn-lg'>
          <input id='ls-image-input' type="file" onInput={e => setImagePath(URL.createObjectURL(e.target.files[0]))} accept="image/*"></input>
          <label htmlFor="ls-image-input">Select Image</label>
        </div>
      <button onClick={handleClick} className="ls-btn-input btn btn-outline-primary btn-lg">Process</button>
      </div>
      <img src={imagePath} className="image-preview"/>
      <div>{text}</div>
    </div>
  );
}

export default LabelScanner;