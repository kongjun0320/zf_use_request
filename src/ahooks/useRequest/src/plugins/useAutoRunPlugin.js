import { useRef } from 'react';
import useUpdateEffect from '../../../useUpdateEffect';

const useAutoRunPlugin = (
  fetchInstance,
  {
    manual,
    ready = true,
    defaultParams = [],
    refreshDeps = [],
    refreshDepsAction,
  }
) => {
  // 是否已经自动运行过了
  const hasAutoRun = useRef(false);
  hasAutoRun.current = false;

  useUpdateEffect(() => {
    // 非手动模式，并且已经准备好了，就自动运行
    if (!manual && ready) {
      hasAutoRun.current = true;
      fetchInstance.run(...defaultParams);
    }
  }, [ready]);

  useUpdateEffect(() => {
    // 已经自动运行过了
    if (hasAutoRun.current) {
      return;
    }
    // 自动执行
    if (!manual) {
      hasAutoRun.current = true;
      if (refreshDepsAction) {
        refreshDepsAction();
      } else {
        fetchInstance.refresh();
      }
    }
  }, [...refreshDeps]);

  return {
    onBefore: () => {
      if (!ready) {
        return {
          stopNow: true,
        };
      }
    },
  };
};

// 用来设置初始状态，ready 是否就绪，默认值是 true，manual 是是否手动模式
useAutoRunPlugin.onInit = ({ ready = true, manual }) => {
  return {
    // 如果是自动模式，并且准备好了，相当于会自动发起请求（默认的配置）
    loading: !manual && ready,
  };
};

export default useAutoRunPlugin;
