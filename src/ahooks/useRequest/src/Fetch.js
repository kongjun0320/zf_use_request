import { isFunction } from '../../utils';

class Fetch {
  constructor(serviceRef, options, subscribe) {
    this.serviceRef = serviceRef;
    this.subscribe = subscribe;
    this.count = 0;

    this.state = {
      loading: !options.manual,
      data: undefined,
      params: undefined,
      error: undefined,
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

    this.setState({
      loading: true,
      params,
    });

    this.options.onBefore?.(params);

    try {
      const res = await this.serviceRef.current(...params);
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
      this.options.onFinally?.(params, res, undefined);
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
      this.options.onFinally?.(params, undefined, error);

      throw error;
    }
  }

  cancel() {
    this.count += 1;

    this.setState({
      loading: false,
    });

    this.options?.onCancel();
  }

  refresh() {
    this.run(...(this.state.params || []));
  }

  refreshAsync() {
    return this.runAsync(...(this.state.params || []));
  }

  mutate(data) {
    const targetData = isFunction(data) ? data(this.state.data) : data;
    // this.runPluginHandler('onMutate', targetData);
    this.setState({
      data: targetData,
    });
  }
}

export default Fetch;
