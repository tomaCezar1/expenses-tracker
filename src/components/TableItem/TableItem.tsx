import React from 'react';
import * as S from './styles';

import { Item } from '../../types/Item';
import DateFiltersFacade from '../../helpers/DateFiltersFacade';
import { categories } from '../../data/categories';

type Props = {
  item: Item;
};

class TableItem extends React.Component<any, Props> {
  render() {
    const { item } = this.props;
    const dateFilters = new DateFiltersFacade();

    return (
      <S.TableLine>
        <S.TableColumn>{item.id}</S.TableColumn>
        <S.TableColumn>{dateFilters.formatDate(item.date)}</S.TableColumn>
        <S.TableColumn>
          <S.Category color={categories[item.category].color}>
            {categories[item.category].title}
          </S.Category>
        </S.TableColumn>
        <S.TableColumn>{item.title}</S.TableColumn>
        <S.TableColumn>
          <S.Value color={categories[item.category].expense ? 'red' : 'green'}>
            $ {item.value}
          </S.Value>
        </S.TableColumn>
      </S.TableLine>
    );
  }
}

export default TableItem;
