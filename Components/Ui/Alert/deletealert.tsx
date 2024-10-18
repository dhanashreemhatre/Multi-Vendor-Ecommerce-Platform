import React from 'react';

const Itemalert: React.FC = () => {
  const handleClose = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // Cast event.target as an HTMLElement to access `parentElement` safely
    const target = event.target as HTMLElement;
    
    // Use non-null assertion (`!`) to ensure `parentElement` is not null
    target.parentElement!.style.display = 'none';
  };

  return (
    <div style={{
      position: 'fixed',
      top: '7%',
      left: '76%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      backgroundColor: '#50C878',
      color: 'white',
      width: '50vw',
      zIndex: 1000, // Ensures the alert is on top of other elements
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      borderRadius: '8px'
    }}>
      <span style={{
        marginLeft: '15px',
        color: 'white',
        fontWeight: 'bold',
        float: 'right',
        fontSize: '22px',
        lineHeight: '20px',
        cursor: 'pointer',
        transition: '0.3s',
      }}
      onClick={handleClose}>&times;</span> 
      <strong>Success!</strong> Item removed from the Cart
    </div>
  );
};

export default Itemalert;
