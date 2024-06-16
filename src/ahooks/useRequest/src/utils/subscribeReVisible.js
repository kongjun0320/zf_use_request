import isBrowser from '../../../utils/isBrowser';
import isDocumentVisible from './isDocumentVisible';

const listeners = [];

function subscribe(listener) {
  listeners.push(listener);
  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

if (isBrowser) {
  const revalidate = () => {
    // 页面不可见时，直接退出
    if (!isDocumentVisible()) return;
    // 页面可见，开始监听
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  };
  window.addEventListener('visibilitychange', revalidate, false);
}

export default subscribe;
