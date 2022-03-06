
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import ReactGa from 'react-ga';
import './LabelScanner.css';

const allergens = [
  "diphenylguanidine",
  "1,3-diphenylguanidine",
  "n,n'-diphenylguanidine",
  "zincdibutyldithiocarbamate",
  "bis(n,n-dibutyldithiocarbamato)zinc",
  "carbamicaciddibutyldithio",
  "zinccomplex",
  "zincbis(dibutyldithiocarbamate)",
  "zincbis",
  "dibutyldithiocarbamate",
  "zincdiethyldithiocarbamate",
  "diethyldithiocarbamicacidzincsalt",
  "diethyldithiocarbamate",
  "zincdiethylcarbamodithioate",
  "casrn",
  "102-06-7",
  "14324-55-1",
  "136-23-2",
  "balsamofperu",
  "balsamperu",
  "carba",
  "carbamix",
  "decylglucoside",
  "decyl",
  "dodecylgallate",
  "dodecyl",
  "iodopropynylbutylcarbamate",
  "iodopropynyl",
  "linalool",
  "n,n-diphenylguanidine",
  "diphenylguanidine",
  "octylsalicylate",
  "octyl",
  "propylgallate",
  "gallate",
  "propyleneglycol",
  "propylene",
  "sorbitansesquioleate",
  "sorbitan",
  "sesquioleate",
  "thimerosal",
  "decyld-glucopyranoside",
  "d-glucopyranoside",
  "glucopyranoside",
  "decylglucoside",
  "glucoside",
  "eugenol",
  "isoeugenol",
  "benzoin",
  "benzoicacid",
  "benzoic",
  "benzylalcohol",
  "benzyl",
  "rosin",
  "colophony",
  "citrusfruitpeel",
  "citruspeel",
  "tigerbalm",
  "vanilla",
  "balsamoftolu",
  "tolu",
];

export default function LabelScanner() {
  document.title="Label Scanner | JordanRhode.com";
  ReactGa.pageview(window.location.pathname);

  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [anyFoundText, setAnyFoundText] = useState("");

  const handleHelpClick = () => {
    setText("Allergens: " + allergens.join(', '));
  }

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
        setText("Image result: " + result.data.text);

        let allergensFound = [];
        allergens.forEach(allergen => {
          let response = String(result.data.text).replace(/\s/g, '');
          if (response.toLocaleLowerCase().includes(allergen)) {
            allergensFound.push(allergen);
          }
        });

        if (allergensFound.length > 0) {
          setAnyFoundText("Allergens Found: " + allergensFound.join(', '));
        }
        else {
          setAnyFoundText("No allergens found");
        }
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
      <button onClick={handleHelpClick} className="ls-btn-input btn btn-outline-primary btn-lg">?</button>
      </div>
      <img src={imagePath} className="image-preview"/>
      <div>{anyFoundText}</div>
      <div>{text}</div>
    </div>
  );
}
