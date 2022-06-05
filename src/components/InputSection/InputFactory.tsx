import React from 'react';
import * as S from './styles';
import { categories } from '../../data/categories';

class DateInputCreator extends React.Component<any> {
  render() {
    const { dateField, setDateField, errors } = this.props;

    return (
      <S.InputLabel>
        <S.InputTitle>Date</S.InputTitle>
        <S.Input
          id="dateInput"
          type="date"
          value={dateField}
          onChange={(e) => setDateField(e.target.value)}
          error={errors.date}
        />
      </S.InputLabel>
    );
  }
}

class CategoriesInputCreator extends React.Component<any> {
  categoryKeys = Object.keys(categories);

  render() {
    const { categoryField, setCategoryField, categories, errors } = this.props;
    return (
      <S.InputLabel>
        <S.InputTitle>Category</S.InputTitle>
        <S.Select
          id="categorySelect"
          value={categoryField}
          onChange={(e) => setCategoryField(e.target.value)}
          error={errors.category}
        >
          <>
            <option></option>
            {this.categoryKeys.map((key, index) => (
              <option key={index} value={key}>
                {categories[key].title}
              </option>
            ))}
          </>
        </S.Select>
      </S.InputLabel>
    );
  }
}

class TitleInputCreator extends React.Component<any> {
  render() {
    const { titleField, setTitleField, errors } = this.props;

    return (
      <S.InputLabel>
        <S.InputTitle>Title</S.InputTitle>
        <S.Input
          id="titleInput"
          type="text"
          value={titleField}
          autoFocus
          onChange={(e) => setTitleField(e.target.value)}
          error={errors.title}
        />
      </S.InputLabel>
    );
  }
}

class AmountInputCreator extends React.Component<any> {
  render() {
    const { valueField, setValueField, errors } = this.props;

    return (
      <S.InputLabel>
        <S.InputTitle>Amount</S.InputTitle>
        <S.Input
          id="valueInput"
          type="number"
          value={valueField}
          onChange={(e) => setValueField(parseFloat(e.target.value))}
          error={errors.value}
        />
      </S.InputLabel>
    );
  }
}

class AddInputCreator extends React.Component<any> {
  render() {
    const { handleAddEvent } = this.props;
    return (
      <S.InputLabel>
        <S.InputTitle>&nbsp;</S.InputTitle>
        <S.Button onClick={handleAddEvent}>Add</S.Button>
      </S.InputLabel>
    );
  }
}

export enum InputTypes {
  AMOUNT = 'AMOUNT',
  CATEGORIES = 'CATEGORIES',
  DATE = 'DATE',
  TITLE = 'TITLE',
  ADD = 'ADD',
}

class InputFactory {
  public static createInput(
    type: InputTypes | string,
    props: Record<string, any>
  ) {
    if (type === InputTypes.AMOUNT) {
      return <AmountInputCreator {...props} />;
    }
    if (type === InputTypes.TITLE) {
      return <TitleInputCreator {...props} />;
    }
    if (type === InputTypes.CATEGORIES) {
      return <CategoriesInputCreator {...props} />;
    }
    if (type === InputTypes.DATE) {
      return <DateInputCreator {...props} />;
    }
    if (type === InputTypes.ADD) {
      return <AddInputCreator {...props} />;
    }
    return null;
  }
}

export default InputFactory;
