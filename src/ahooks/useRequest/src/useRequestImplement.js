import useCreation from '../../useCreation';
import useLatest from '../../useLatest';
import useMemoizedFn from '../../useMemoizedFn';
import useMount from '../../useMount';
import useUnmount from '../../useUnmount';
import useUpdate from '../../useUpdate';
import Fetch from './Fetch';

function useRequestImplement(service, options = {}) {
  const { manual = false, ...rest } = options;

  const fetchOptions = {
    manual,
    ...rest,
  };

  const serviceRef = useLatest(service);
  const update = useUpdate();

  const fetchInstance = useCreation(() => {
    return new Fetch(serviceRef, fetchOptions, update);
  }, []);

  fetchInstance.options = fetchOptions;

  useMount(() => {
    if (!manual) {
      const params = fetchInstance.state.params || options.defaultParams || [];
      fetchInstance.run(...params);
    }
  });

  useUnmount(() => {
    fetchInstance.cancel();
  });

  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
    runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
    refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
    refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
    mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance)),
    cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance)),
  };
}

export default useRequestImplement;
