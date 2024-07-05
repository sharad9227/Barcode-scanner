// src/BarcodeScanner.js
import React from 'react';
import PropTypes from 'prop-types';
import useZxing from './hooks/useZxing';
import './BarcodeScanner.css';
const BarcodeScanner = ({ onResult, onError }) => {
  const { ref } = useZxing({ onResult, onError });

  return (
    <div className="scanner-container">
      <video ref={ref} />
      <div className="scanning-area">
        <div className="scanning-line"></div>
      </div>
    </div>
  );
};

BarcodeScanner.propTypes = {
  onResult: PropTypes.func,
  onError: PropTypes.func,
};

BarcodeScanner.defaultProps = {
  onResult: () => {},
  onError: () => {},
};

export default BarcodeScanner;
