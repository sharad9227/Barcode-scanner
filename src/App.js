// src/App.js
import React, { useState } from 'react';
import BarcodeScanner from './Barcodescanner';

function App() {
  const [barcode, setBarcode] = useState(null);
  const [error, setError] = useState(null);

  const handleResult = (result) => {
    const decodedText = result.getText();
    console.log('Decoded Barcode:', decodedText);
    setBarcode(decodedText);
    setError(null);
  };

  const handleError = (error) => {
    console.error('Error:', error);
    setError('Failed to decode the barcode.');
    setBarcode(null);
  };

  return (
    <div className="App">
      <h1>Barcode Scanner</h1>
      <BarcodeScanner onResult={handleResult} onError={handleError} />
      {error && <p className="error">{error}</p>}
      {barcode && (
        <div className="barcode-info">
          <h2>Decoded Barcode Information</h2>
          <p>{barcode}</p>
        </div>
      )}
    </div>
  );
}

export default App;
