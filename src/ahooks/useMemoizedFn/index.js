import { useMemo, useRef } from 'react';
import { isFunction } from '../utils';

function useMemoizedFn(fn) {
  if (!isFunction(fn)) {
    console.error(
      `useMemoizedFn expected parameter is a function, got ${typeof fn}`
    );
  }

  const fnRef = useRef(fn);

  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef();
  if (!memoizedFn.current) {
    memoizedFn.current = function (...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current;
}

export default useMemoizedFn;
