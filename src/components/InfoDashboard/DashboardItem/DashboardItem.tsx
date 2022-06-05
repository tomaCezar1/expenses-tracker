import React from 'react';
import * as S from './styles';

type Props = {
  title: string;
  value: number;
  color?: string;
};

class DashboardItem extends React.Component<any, Props> {
  render() {
    const { title, value, color } = this.props;
    return (
      <S.Container>
        <S.Title>{title}</S.Title>
        <S.Info color={color}>$ {value}</S.Info>
      </S.Container>
    );
  }
}

export default DashboardItem;
