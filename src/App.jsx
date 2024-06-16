import { useRef, useState } from 'react';
import { useRequest } from './ahooks';

let count = 0;
function getName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ai_cherish ' + count++);
    }, 1000);
  });
}

function updateName(newName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Date.now());
      // reject('error');
    }, 2000);
  });
}

const App = () => {
  const { data: name, loading } = useRequest(getName, {
    refreshOnWindowFocus: true,
    // focusTimespan: 1000,
  });

  return (
    <>
      <div>{loading ? '加载中...' : name}</div>
    </>
  );
};

export default App;
