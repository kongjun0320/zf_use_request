import { useRef, useState } from 'react';
import { useRequest } from './ahooks';

function getName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ai_cherish');
    }, 1000);
  });
}

function updateName(newName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(newName);
      reject('error');
    }, 1000);
  });
}

const App = () => {
  const [value, setValue] = useState('');
  const lastRef = useRef();
  const { data: name, mutate } = useRequest(getName, {});
  const { run, loading } = useRequest(updateName, {
    manual: true,
    onSuccess(response, params) {
      console.log('更新用户名成功 >>> ', response, params);
      setValue('');
    },
    onError(error, params) {
      console.log('更新用户名失败 >>> ', error, params);
      mutate(lastRef.current);
    },
  });

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        onClick={() => {
          lastRef.current = name;
          mutate(value);
          run(value);
        }}
      >
        {loading ? '更新中' : '更新'}
      </button>
      {name && <div>用户名：{name}</div>}
    </>
  );
};

export default App;
