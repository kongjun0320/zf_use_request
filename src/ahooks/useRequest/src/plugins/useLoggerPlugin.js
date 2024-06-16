function useLoggerPlugin(fetchInstance, { name }) {
  return {
    onBefore(params) {
      console.log('onBefore >>> ', params);
      return {
        id: name,
        a: 'a',
      };
    },
    onRequest(service, params) {
      console.log(name + ' onRequest >>> ', params);
      return undefined;
    },
    onSuccess(response, params) {
      console.log(name + ' onSuccess >>> ', response, params);
    },
    onError(error, params) {
      console.log(name + ' onError >>> ', error, params);
    },
    onFinally(params, response, error) {
      console.log(name + ' onFinally >>> ', params, response, error);
    },
    onCancel() {
      console.log(name + ' onCancel >>> ');
    },
    onMutate() {
      console.log(name + ' onMutate >>> ');
    },
  };
}

/**
 * Fetch 实例前初始化
 * @param {*} param0
 * @returns
 */
useLoggerPlugin.onInit = ({ name }) => {
  console.log('onInit >>> ');
  return { name };
};

export default useLoggerPlugin;
