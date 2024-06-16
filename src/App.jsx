import { useRef, useState } from 'react';
import { useRequest } from './ahooks';

let count = 0;
function getName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: 'aic' + count++,
        time: new Date().toLocaleTimeString(),
      });
      // reject('some error');
    }, 500);
  });
}

function User() {
  const { data, loading } = useRequest(getName, {
    cacheKey: 'cacheKey',
    staleTime: 5000,
  });

  return (
    <>
      <div>{loading ? '加载中...' : '加载完成'}</div>
      <p>最后请求的时候：{data?.time}</p>
      <p>data：{data?.data}</p>
    </>
  );
}

const App = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hidden' : 'show'}
      </button>
      {visible && <User />}
    </>
  );
};

export default App;
