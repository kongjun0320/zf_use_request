import { useEffect } from 'react';
import { isFunction } from '../utils';

const useMount = (fn) => {
  if (!isFunction(fn)) {
    console.error(
      `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`
    );
  }

  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
