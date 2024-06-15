import React from 'react';
import './light.css';

const Product = ({ onChangeLight }) => {
  return (
    <>
      <div className="color-change">
        <button
          className="color-button"
          onClick={() => onChangeLight([
            { position: [10, 10, 5], intensity: 30, color: 'gray' },
            { position: [5, 5, 5], intensity: 4, color: 'yellow' },
            { position: [0, 0, 0], intensity: 10, color: 'green' },
          ])}
        />
        <button
          className="color-button"
          onClick={() => onChangeLight([
            { position: [10, 10, 5], intensity: 30, color: 'yellow' },
            { position: [5, 5, 5], intensity: 6, color: 'red' },
            { position: [0, 0, 0], intensity: 10, color: 'white' },
          ])}
        />
        <button
          className="color-button"
          onClick={() => onChangeLight([
            { position: [10, 10, 5], intensity: 30, color: 'red' },
            { position: [5, 5, 5], intensity: 6, color: 'orange' },
            { position: [0, 0, 0], intensity: 10, color: 'black' },
          ])}
        />
        <button
          className="color-button"
          onClick={() => onChangeLight([
            { position: [10, 10, 5], intensity: 30, color: 'white' },
            { position: [5, 5, 5], intensity: 1, color: 'white' },
            { position: [0, 0, 0], intensity: 10, color: 'white' },
          ])}
        />
      </div>
    </>
  );
};

export default Product;
