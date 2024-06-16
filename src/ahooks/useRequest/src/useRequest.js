import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin';
import usePollingPlugin from './plugins/usePollingPlugin';
import useRequestImplement from './useRequestImplement';

function useRequest(service, options, plugins) {
  return useRequestImplement(service, options, [
    ...(plugins || []),
    useLoadingDelayPlugin,
    usePollingPlugin,
  ]);
}

export default useRequest;
