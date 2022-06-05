import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import * as S from './styles/global';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import InfoDashboard from './components/InfoDashboard';
import InputSection from './components/InputSection';
import TableArea from './components/TableArea';

import singletonBalance from './components/BalanceSingleton/BalanceSingleton';
import observable from './components/ToastObservable/Observable';
import DateFiltersFacade from './helpers/DateFiltersFacade';
import InfoDashboardDecorator from './components/InfoDashboard/InfoDashboardDecorator';
import FlyweightItemsList from './State/FlyweightList';

const dateFilters = new DateFiltersFacade();
const itemsList = new FlyweightItemsList();

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: itemsList.list,
      filteredList: [],
      currentMonth: dateFilters.getCurrentMonth(),
      income: singletonBalance.getRevenue(),
      expense: singletonBalance.getExpense(),
    };
  }

  handleMonthChange = (newMonth: string) => {
    this.setState({ currentMonth: newMonth });
  };

  notifyToastObserver = (item) => {
    observable.notify(`Added $${item.value} ${item.category} in your list`);
  };

  handleAddItem = (item: any) => {
    const amount = item.value;

    const { id, date, category, title, value } = item;
    itemsList.addItem(id, date, category, title, value);

    this.setState({ list: itemsList.list });

    if (item.category === 'salary') {
      singletonBalance.setRevenue(amount);
    } else {
      singletonBalance.setExpense(amount);
    }

    this.notifyToastObserver(item);
  };

  logger(data) {
    console.log('Item info: ' + data);
  }

  toastify(data) {
    toast(data, {
      position: toast.POSITION.BOTTOM_RIGHT,
      closeButton: false,
      autoClose: 2000,
      type: 'info',
    });
  }

  componentDidMount() {
    observable.subscribe(this.toastify);
    observable.subscribe(this.logger);
  }

  render() {
    return (
      <S.Container>
        <S.Header>
          <S.HeaderText>Expenses tracker</S.HeaderText>
        </S.Header>
        <S.Body>
          <InfoDashboard
            currentMonth={this.state.currentMonth}
            onMonthChange={this.handleMonthChange}
            component={InfoDashboard}
          />
          <InputSection onAdd={this.handleAddItem} />
          <TableArea list={this.state.list} />
          <ToastContainer />
        </S.Body>
      </S.Container>
    );
  }
}

export default App;
