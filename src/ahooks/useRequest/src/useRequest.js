import useAutoRunPlugin from './plugins/useAutoRunPlugin';
import useCachePlugin from './plugins/useCachePlugin';
import useDebouncePlugin from './plugins/useDebouncePlugin';
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin';
import usePollingPlugin from './plugins/usePollingPlugin';
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin';
import useRetryPlugin from './plugins/useRetryPlugin';
import useThrottlePlugin from './plugins/useThrottlePlugin';
import useRequestImplement from './useRequestImplement';

function useRequest(service, options, plugins) {
  return useRequestImplement(service, options, [
    ...(plugins || []),
    useLoadingDelayPlugin,
    usePollingPlugin,
    useAutoRunPlugin,
    useRefreshOnWindowFocusPlugin,
    useDebouncePlugin,
    useThrottlePlugin,
    useRetryPlugin,
    useCachePlugin,
  ]);
}

export default useRequest;
