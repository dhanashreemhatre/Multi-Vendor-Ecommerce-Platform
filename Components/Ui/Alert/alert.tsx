import React from 'react'

const alert = () => {
    const handleClose = (event) => {
        event.target.parentElement.style.display = 'none';
      };
  return (
    <div>
      <div  style={{ padding: '20px', backgroundColor: '#90EE90', color: 'white' }}>
  <span  style={{
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
  <strong>Success!</strong> Item added to Cart
</div>
    </div>
  )
}

export default alert
