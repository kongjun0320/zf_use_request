import { useRef } from 'react';

function useLoadingDelayPlugin(fetchInstance, { loadingDelay, ready }) {
  const timerRef = useRef();

  if (!loadingDelay) {
    return {};
  }

  const cancelTimeout = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return {
    // 在请求前设置一个定时器，在 loadingDelay 时间后变成 true，当前的 loading 变成 false
    onBefore: () => {
      cancelTimeout();

      // Two cases:
      // 1. ready === undefined
      // 2. ready === true
      if (ready !== false) {
        timerRef.current = setTimeout(() => {
          fetchInstance.setState({
            loading: true,
          });
        }, loadingDelay);
      }

      return {
        loading: false,
      };
    },

    onFinally: () => {
      cancelTimeout();
    },

    onCancel: () => {
      cancelTimeout();
    },
  };
}

export default useLoadingDelayPlugin;
