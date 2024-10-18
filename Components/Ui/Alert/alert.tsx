import React from 'react';

interface ItemAlertProps {
  message: string;
  bullet: string;
  color: string;
}

const Itemalert: React.FC<ItemAlertProps> = ({ message, bullet, color }) => {
  const handleClose = (event: React.MouseEvent<HTMLSpanElement>) => {
    // TypeScript recognizes the event target as an HTMLElement
    const target = event.target as HTMLElement;
    target.parentElement!.style.display = 'none'; // Use non-null assertion to tell TypeScript that `parentElement` won't be null
  };

  return (
    <div style={{
      position: 'fixed',
      top: '7%',
      left: '76%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      backgroundColor: color,
      color: 'white',
      width: '50vw',
      zIndex: 1000,
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      borderRadius: '8px'
    }}>
      <span
        style={{
          marginLeft: '15px',
          color: 'white',
          fontWeight: 'bold',
          float: 'right',
          fontSize: '22px',
          lineHeight: '20px',
          cursor: 'pointer',
          transition: '0.3s',
        }}
        onClick={handleClose}
      >
        &times;
      </span>
      <strong>{bullet}!</strong> {message}
    </div>
  );
};

export default Itemalert;
