import * as S from './styles';
import React from 'react';

import { Item } from '../../types/Item';
import TableItem from '../TableItem/TableItem';
import { List, Iterator } from '../../iterators/iterator';

type Props = {
  list: Item[];
};

class TableArea extends React.Component<any, Props> {
  createTableItem = (item) => {
    return <TableItem key={item.id} item={item} />;
  };

  listMapping = (listIterator) => {
    let itemsList: any[] = [];
    while (listIterator.hasNext()) {
      listIterator.next();
      const listElement = this.createTableItem(listIterator.getItem());
      itemsList.push(listElement);
    }
    return itemsList;
  };

  render() {
    const { list } = this.props;

    const listIterator: Iterator = new List(list).createIterator();

    return (
      <S.Table>
        {list.length ? (
          <>
            <thead>
              <tr>
                <S.TableHeadColumn width={50}>ID</S.TableHeadColumn>
                <S.TableHeadColumn width={100}>Date</S.TableHeadColumn>
                <S.TableHeadColumn width={130}>Category</S.TableHeadColumn>
                <S.TableHeadColumn width={170}>Title</S.TableHeadColumn>
                <S.TableHeadColumn width={150}>Value</S.TableHeadColumn>
              </tr>
            </thead>
            <tbody>{list.length && this.listMapping(listIterator)}</tbody>
          </>
        ) : (
          <S.NoDataContainer>Please add your expenses here</S.NoDataContainer>
        )}
      </S.Table>
    );
  }
}

export default TableArea;
