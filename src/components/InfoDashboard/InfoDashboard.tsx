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

class InfoDashboard extends React.Component<any, Props> {
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

    const income = singletonBalance.getRevenue();
    const expense = singletonBalance.getExpense();
    const balance = income - expense;
    const balanceColor = income - expense < 0 ? 'red' : 'green';

    return (
      <S.Container>
        <S.MonthArea>
          <S.MonthArrow onClick={handlePrevMonth}>⬅</S.MonthArrow>
          <S.MonthTitle>
            {dateFilters.formatCurrentMonth(currentMonth)}
          </S.MonthTitle>
          <S.MonthArrow onClick={handleNextMonth}>➡</S.MonthArrow>
        </S.MonthArea>
        <S.ResumeArea>
          <DashboardItem title="Revenue" value={income} />
          <DashboardItem title="Expenses" value={expense} />
          <DashboardItem title="Balance" value={balance} color={balanceColor} />
        </S.ResumeArea>
      </S.Container>
    );
  }
}

export default InfoDashboard;
