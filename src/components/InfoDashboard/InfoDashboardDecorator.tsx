import React from 'react';
import * as S from './styles';
import singletonBalance from '../BalanceSingleton/BalanceSingleton';
import DashboardItem from './DashboardItem';
import DateFiltersFacade from '../../helpers/DateFiltersFacade';

type Props = {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
};

const dateFilters = new DateFiltersFacade();

function InfoDashboardDecorator(Component) {
  return class extends React.Component<any, Props> {
    render() {
      const { currentMonth, onMonthChange } = this.props;

      const handlePrevMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        currentDate.setMonth(currentDate.getMonth() - 1);
        onMonthChange(
          `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`
        );
      };

      const handleNextMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        currentDate.setMonth(currentDate.getMonth() + 1);
        onMonthChange(
          `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`
        );
      };

      const formatMonth = dateFilters.formatCurrentMonth(currentMonth);

      const income = singletonBalance.getRevenue();
      const expense = singletonBalance.getExpense();
      const balance = income - expense;
      const balanceColor = income - expense < 0 ? 'red' : 'green';

      console.log(Component);

      const props = {
        handlePrevMonth,
        handleNextMonth,
        income,
        expense,
        balance,
        balanceColor,
        formatMonth,
      };

      return <Component {...props} />;
    }
  };
}

export default InfoDashboardDecorator;
