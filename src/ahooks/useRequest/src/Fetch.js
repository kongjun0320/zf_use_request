class Fetch {
  constructor(serviceRef, options, subscribe) {
    this.serviceRef = serviceRef;
    this.subscribe = subscribe;

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
    this.setState({
      loading: true,
      params,
    });

    this.options.onBefore?.(params);

    try {
      const res = await this.serviceRef.current(...params);
      this.setState({
        data: res,
        loading: false,
        error: undefined,
      });
      this.options.onSuccess?.(res, params);
      this.options.onFinally?.(params, res, undefined);
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });

      this.options.onError?.(error, params);
      this.options.onFinally?.(params, undefined, error);

      throw error;
    }
  }

  cancel() {}

  refresh() {
    this.run(...(this.state.params || []));
  }

  refreshAsync() {
    return this.runAsync(...(this.state.params || []));
  }
}

export default Fetch;
