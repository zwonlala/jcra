import React from 'react';

export default function Timer() {
  return (
    <div style={{ background: 'hotpink' }}>
      <span>09시</span>
      <span>29분</span>

      <button type='button'>초기화</button>
      <button type='button'>시작</button>
    </div>
  );
}
