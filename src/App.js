
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");

  const handleClick = () => {
    Tesseract.recognize(imagePath, 'eng', { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
     console.log(result);
     if (String(result.data.text).toLowerCase().includes('carbonated')) {
       setText('this is carbonated');
     }
    else {
      setText('this is not carbonated');
    }})
  }

  return (
    <div className="App">
      <img src={imagePath} className="App-image" alt="logo" style={{width:500}}/>
      <div>{text}</div>
      <input type="file" onInput={e => setImagePath(URL.createObjectURL(e.target.files[0]))} accept="image/*"/>
      <button onClick={handleClick} style={{height:50}}> convert to text</button>
    </div>
  );
}

export default App;