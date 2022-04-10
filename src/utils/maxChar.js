import React, { useState } from 'react';

const maxChar = (string, max) => {
  const splitbychar = string.split('');
  let array = [];
  for (let i = 0; i < max; i++) {
    array.push(splitbychar[i]);
  }
  splitbychar.length > max && array.push('...');
  return array.join('');
}

export default maxChar;
