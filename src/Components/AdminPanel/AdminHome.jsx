import React from 'react';

const Footer = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const mainContentStyle = {
    flex: 1,
    padding: '20px',
  };

  const footerStyle = {
    marginTop: 'auto',
    fontFamily: 'cursive',
    fontSize: '16px',
    fontWeight: 'bolder',
  };

  return (
    <div style={containerStyle}>
      <hr />
      <hr />
      <h1 className='text-center' style={{ fontFamily: 'cursive', fontSize: '80px', fontWeight: 'bolder' }}>
        Reva Nest
      </h1>
      <div style={mainContentStyle}>
        {/* Add your main content here */}
        <h2 className='text-center'>  Welcome to Reva Nest! .</h2>
      </div>
      <hr />
      <hr />
      <footer className='text-center' style={footerStyle}>
        This site is made entirely for admin's purpose.
      </footer>
    </div>
  );
};

export default Footer;
