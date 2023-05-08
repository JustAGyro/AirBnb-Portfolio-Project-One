import React from 'react';

const Logo = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        color: 'orangered',
        fontSize: '60px',
      }}
    >
      <i class="fa-solid fa-hat-wizard"></i>
      <span
        style={{
          marginLeft: '-3px',
          fontSize: '24px',
          fontFamily: 'Arial Rounded MT Bold',
          fontWeight: 'bolder',
        }}
      >
        azeroth/bnb
      </span>
    </div>
  );
};

export default Logo;
