export interface Iterator {
  next(): any;
  hasNext(): boolean;
  getItem(): any;
  getList(): any[];
  getPosition(): any;
}

export interface IAggregator {
  createIterator(): Iterator;
}

export class ConcreteIterator implements Iterator {
  private list: any[] = [];
  private position: number = 0;

  constructor(list: any[]) {
    this.list = list;
  }

  public next(): any {
    var result = this.list[this.position];
    this.position += 1;
    return result;
  }

  public getItem() {
    return this.list[this.getPosition()];
  }

  public hasNext(): boolean {
    return this.position < this.list.length;
  }

  public getList() {
    return this.list;
  }
  public getPosition() {
    return this.position - 1;
  }
}

export class List implements IAggregator {
  private list: {}[] = [];

  constructor(list: {}[]) {
    this.list = list;
  }
  public createIterator(): Iterator {
    return new ConcreteIterator(this.list);
  }
}
