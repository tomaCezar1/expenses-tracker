interface IObservable {
  observers: any[];
  subscribe(func: any): void;
  unsubscribe(func: any): void;
  notify(data: any): void;
}

class ToastObservable implements IObservable {
  observers: any[];

  constructor() {
    this.observers = [];
  }

  subscribe(func): void {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((subscriber) => subscriber !== func);
  }

  notify(data: any) {
    this.observers.forEach((observer) => observer(data));
  }
}

export default new ToastObservable();
