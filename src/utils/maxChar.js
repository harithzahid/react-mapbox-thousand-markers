import React, { useState } from 'react';

const maxChar = (string, max, readMore) => {
  const splitbychar = string.split('');
  let array = [];
  for (let i = 0; i < max; i++) {
    array.push(splitbychar[i]);
  }
  splitbychar.length > max && array.push('...');
  const newString = array.join('');
  if (splitbychar.length > max && readMore) {
    return (
      <span>
        {newString}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          (more)
        </span>
      </span>
    );
  }
  return array.join('');
}

export default maxChar;
