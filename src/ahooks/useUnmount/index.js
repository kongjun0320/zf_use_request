import { useEffect } from 'react';
import { isFunction } from '../utils';
import useLatest from '../useLatest';

const useUnmount = (fn) => {
  if (!isFunction(fn)) {
    console.error(
      `useUnmount expected parameter is a function, got ${typeof fn}`
    );
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};

export default useUnmount;
