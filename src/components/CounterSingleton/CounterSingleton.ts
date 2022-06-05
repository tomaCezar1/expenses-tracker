class CounterSingleton {
  private static instance: CounterSingleton;

  private constructor() {}

  public static getInstance(): CounterSingleton {
    if (!CounterSingleton.instance) {
      CounterSingleton.instance = new CounterSingleton();
    }

    return CounterSingleton.instance;
  }

  counter: number = 0;

  getCount() {
    return this.counter;
  }

  increment() {
    return ++this.counter;
  }

  decrement() {
    return --this.counter;
  }
}

const singletonCounter = CounterSingleton.getInstance();

export default singletonCounter;
