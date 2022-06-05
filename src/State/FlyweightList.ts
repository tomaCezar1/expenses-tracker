interface Item {
  id: number;
  date: Date | string;
  category: string;
  title: string;
  value: string;
}

interface ItemsList {
  list: any[];
  existingTitleAndValue: boolean;
  createItem: (
    id: any,
    date: any,
    category: any,
    title: any,
    value: any
  ) => Item;
  addItem: (
    id: any,
    date: any,
    category: any,
    title: any,
    value: any
  ) =>
    | any[]
    | {
        id: number;
        date: string | Date;
        category: string;
        title: string;
        value: string;
      };
}

class Item implements Item {
  id: number;
  date: Date | string;
  category: string;
  title: string;
  value: string;

  constructor(id, date, category, title, value) {
    this.id = id;
    this.date = date;
    this.category = category;
    this.title = title;
    this.value = value;
  }
}

const itemMap: any[] = [];

class ItemsListFlyweight implements ItemsList {
  list: any[] = [];

  existingTitleAndValue = false;

  createItem = (id, date, category, title, value) => {
    const createdItem = new Item(id, date, category, title, value);
    itemMap[id] = createdItem;

    return createdItem;
  };

  addItem = (id, date, category, title, value) => {
    for (const property in itemMap) {
      if (
        itemMap[property].value === value &&
        itemMap[property].title === title
      ) {
        this.existingTitleAndValue = true;
      }
    }

    if (!this.existingTitleAndValue) {
      const item = {
        ...this.createItem(id, date, category, title, value),
      };

      this.list.push(item);
      return item;
    }

    return this.list;
  };
}

export default ItemsListFlyweight;
