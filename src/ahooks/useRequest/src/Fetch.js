import { isFunction } from '../../utils';

class Fetch {
  constructor(serviceRef, options, subscribe, initState) {
    this.serviceRef = serviceRef;
    this.subscribe = subscribe;
    this.count = 0;

    this.state = {
      loading: !options.manual,
      data: undefined,
      params: undefined,
      error: undefined,
      ...initState,
    };
  }

  setState = (s = {}) => {
    this.state = {
      ...this.state,
      ...s,
    };
    this.subscribe();
  };

  run(...params) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
        console.error(error);
      }
    });
  }

  async runAsync(...params) {
    this.count += 1;
    const currentCount = this.count;

    const { ...state } = this.runPluginHandler('onBefore', params);

    this.setState({
      loading: true,
      params,
      ...state,
    });

    this.options.onBefore?.(params);

    try {
      let { servicePromise } = this.runPluginHandler(
        'onRequest',
        this.serviceRef.current,
        params
      );

      if (!servicePromise) {
        servicePromise = this.serviceRef.current(...params);
      }

      const res = await servicePromise;
      // 被取消掉了、或者是又发生了一次请求
      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {});
      }

      this.setState({
        data: res,
        loading: false,
        error: undefined,
      });

      this.options.onSuccess?.(res, params);
      this.runPluginHandler('onSuccess', res, params);

      this.options.onFinally?.(params, res, undefined);
      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, res, undefined);
      }
    } catch (error) {
      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {});
      }

      this.setState({
        loading: false,
        error,
      });

      this.options.onError?.(error, params);
      this.runPluginHandler('onError', error, params);

      this.options.onFinally?.(params, undefined, error);
      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, undefined, error);
      }

      throw error;
    }
  }

  cancel() {
    this.count += 1;

    this.setState({
      loading: false,
    });

    this.options.onCancel?.();

    this.runPluginHandler('onCancel');
  }

  refresh() {
    this.run(...(this.state.params || []));
  }

  refreshAsync() {
    return this.runAsync(...(this.state.params || []));
  }

  mutate(data) {
    const targetData = isFunction(data) ? data(this.state.data) : data;
    this.runPluginHandler('onMutate', targetData);
    this.setState({
      data: targetData,
    });
  }

  /**
   *
   * @param {*} event onBefore onSuccess onError
   * @param  {...any} rest
   * @returns
   */
  runPluginHandler(event, ...rest) {
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }
}

export default Fetch;
