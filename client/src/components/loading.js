import React from 'react';
import srcImg from 'Images/dog.gif';

let Loading = () => {
  const propsImg = {
    src: srcImg,
    className: 'loading',
    width: 80,
    height: 80,
    style: {
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: '50%'
    }
  };
  return <img {...propsImg} />;
};

export default Loading;
