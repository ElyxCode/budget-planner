import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import globalStyles from '../styles/styles';
import {Expense} from '../interface/interface';

interface Props {
  filter: string;
  expenses: Expense[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setfilteredExpense: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export const Filter = ({
  setFilter,
  filter,
  expenses,
  setfilteredExpense,
}: Props) => {
  useEffect(() => {
    if (filter === '') {
      return setfilteredExpense([]);
    }

    const expenseFiltering = expenses.filter(val => val.category === filter);

    setfilteredExpense(expenseFiltering);
  }, [filter]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Expense filter</Text>
      <Picker
        selectedValue={filter}
        onValueChange={value => {
          setFilter(value);
        }}>
        <Picker.Item label="-- Select --" value="" />
        <Picker.Item label="Saving" value="saving" />
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Home" value="home" />
        <Picker.Item label="Bills" value="bills" />
        <Picker.Item label="Various expenses" value="leisure" />
        <Picker.Item label="Health" value="health" />
        <Picker.Item label="Subscription" value="subscription" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    transform: [{translateY: 0}],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#64748B',
  },
});
