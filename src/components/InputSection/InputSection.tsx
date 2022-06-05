import { useState } from 'react';
import * as S from './styles';
import { categories } from '../../data/categories';
import InputFactory, { InputTypes } from './InputFactory';
import singletonCounter from '../CounterSingleton/CounterSingleton';

type Props = {
  onAdd: (item: any) => void;
};

export const InputSection = ({ onAdd }: Props) => {
  const [dateField, setDateField] = useState('');
  const [categoryField, setCategoryField] = useState('');
  const [titleField, setTitleField] = useState('');
  const [valueField, setValueField] = useState(0);
  const [errors, setErrors] = useState({
    date: '',
    category: '',
    title: '',
    value: '',
  });

  const clearInput = () => {
    setDateField('');
    setCategoryField('');
    setTitleField('');
    setValueField(0);
  };

  let categoryKeys = Object.keys(categories);

  const handleAddEvent = () => {
    if (isNaN(new Date(dateField).getTime())) {
      setErrors((prevState) => ({ ...prevState, date: 'Invalid date' }));
      return;
    }

    if (!categoryKeys.includes(categoryField)) {
      setErrors((prevState) => ({
        ...prevState,
        category: 'Invalid category',
      }));
      return;
    }

    if (titleField === '') {
      setErrors((prevState) => ({ ...prevState, title: 'Title invalid' }));
      return;
    }

    if (valueField <= 0) {
      setErrors((prevState) => ({ ...prevState, value: 'Invalid value' }));
      return;
    }

    singletonCounter.increment();

    onAdd({
      id: singletonCounter.getCount(),
      date: new Date(dateField),
      category: categoryField,
      title: titleField,
      value: valueField,
    });

    clearInput();
  };

  const DateInput = () =>
    InputFactory.createInput(InputTypes.DATE, {
      dateField,
      setDateField,
      errors,
    });

  const CategoriesInput = () =>
    InputFactory.createInput(InputTypes.CATEGORIES, {
      categoryField,
      setCategoryField,
      categories,
      errors,
    });

  const TitleInput = () =>
    InputFactory.createInput(InputTypes.TITLE, {
      titleField,
      setTitleField,
      errors,
    });

  const AmountInput = () =>
    InputFactory.createInput(InputTypes.AMOUNT, {
      valueField,
      setValueField,
      errors,
    });

  const AddInput = () =>
    InputFactory.createInput(InputTypes.ADD, {
      handleAddEvent,
    });

  return (
    <S.Container>
      <DateInput key={InputTypes.DATE} />
      <CategoriesInput />
      <TitleInput key={InputTypes.TITLE} />
      <AmountInput />
      <AddInput />
    </S.Container>
  );
};

export default InputSection;
