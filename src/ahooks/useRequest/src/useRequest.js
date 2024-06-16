import useLoggerPlugin from './plugins/useLoggerPlugin';
import useRequestImplement from './useRequestImplement';

function useRequest(service, options, plugins) {
  return useRequestImplement(service, options, [
    ...(plugins || []),
    useLoggerPlugin,
  ]);
}

export default useRequest;
