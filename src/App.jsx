import { useRef, useState } from 'react';
import { useRequest } from './ahooks';

function getName(count) {
  console.log('count >>> ', count);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ai_cherish ' + count);
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
  const [count, setCount] = useState(0);
  const {
    data: name,
    loading,
    run,
  } = useRequest(getName, {
    defaultParams: [count],
    refreshDeps: [count],
    refreshDepsAction: () => {
      run(count);
    },
  });

  return (
    <>
      {/* <button onClick={() => run(count)}>run</button> */}
      <button onClick={() => setCount(count + 1)}>Add Count {count}</button>
      <div>{loading ? '加载中...' : name}</div>
    </>
  );
};

export default App;
