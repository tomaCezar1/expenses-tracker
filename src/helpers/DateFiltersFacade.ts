import { Item } from '../types/Item';

interface IDateFiltersFacade {
  months: string[];
  getCurrentMonth(): string;
  formatCurrentMonth: (currentMonth: string) => string;
  formatDate: (date: Date) => string;
  filterListByMonth: (list: Item[], date: string) => Item[];
}

class DateFiltersFacade implements IDateFiltersFacade {
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Septembre',
    'Octobre',
    'November',
    'December',
  ];

  getCurrentMonth = () => {
    let now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}`;
  };

  formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-');

    return `${this.months[parseInt(month) - 1]} of ${year}`;
  };

  formatDate = (date: Date): string => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${String(day).padStart(2, '0')}/${String(month).padStart(
      2,
      '0'
    )}/${year}`;
  };

  filterListByMonth = (list: Item[], date: string): Item[] => {
    let newList: Item[] = [];
    let [year, month] = date.split('-');

    for (let i in list) {
      if (
        list[i].date.getFullYear() === parseInt(year) &&
        list[i].date.getMonth() + 1 === parseInt(month)
      ) {
        newList.push(list[i]);
      }
    }

    return newList;
  };
}

export default DateFiltersFacade;
