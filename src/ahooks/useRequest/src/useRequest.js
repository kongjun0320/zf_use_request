import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin';
import useRequestImplement from './useRequestImplement';

function useRequest(service, options, plugins) {
  return useRequestImplement(service, options, [
    ...(plugins || []),
    useLoadingDelayPlugin,
  ]);
}

export default useRequest;
