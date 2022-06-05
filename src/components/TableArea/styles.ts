import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  min-height: 160px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  margin-top: 20px;
`;

export const TableHeadColumn = styled.th<{ width?: number }>`
    width: ${(props) => (props.width ? `${props.width}px` : 'auto')}
    padding: 10px 0;
    text-align: left;
`;

export const NoDataContainer = styled.div`
  width: auto;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
