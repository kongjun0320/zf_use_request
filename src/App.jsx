import { useRef, useState } from 'react';
import { useRequest } from './ahooks';

function getName(suffix = '') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('ai_cherish ' + suffix);
      reject('some error');
    }, 500);
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
  const {
    data: name,
    loading,
    run,
  } = useRequest(getName, {
    retryCount: 3,
    retryInterval: 1000,
  });

  return (
    <>
      <input type="text" onChange={(event) => run(event.target.value)} />
      <div>{loading ? '加载中...' : name}</div>
    </>
  );
};

export default App;
