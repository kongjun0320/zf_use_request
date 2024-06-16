import { useRequest } from './ahooks';

function getName(prefix) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(prefix + ' ai_cherish');
      // reject(new Error('error'));
    }, 1000);
  });
}

const App = () => {
  const { data, loading, error, run, refresh } = useRequest(getName, {
    // manual: true,
    defaultParams: ['Kong'],
    onBefore() {
      console.log('onBefore >>> ');
    },
    onSuccess(response) {
      console.log('onSuccess response>>> ', response);
    },
    onError(error) {
      console.log('error >>> ', error);
    },
    onFinally() {
      console.log('onFinally >>> ');
    },
  });

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <button disabled={loading} onClick={() => run()}>
        {loading ? '获取中' : 'run'}
      </button>
      <button disabled={loading} onClick={() => refresh()}>
        {loading ? '获取中' : 'refresh'}
      </button>
      {/* <button disabled={loading} onClick={() => runAsync('孔')}>
        {loading ? '获取中' : 'runAsync'}
      </button> */}
      <div>{data}</div>
    </>
  );
};

export default App;
