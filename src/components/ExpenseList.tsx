import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Expense} from '../interface/interface';
import {ExpenseCard} from './ExpenseCard';

interface Props {
  expenses: Expense[];
  setShowExpenseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExpense: React.Dispatch<React.SetStateAction<Expense>>;
  filter: string;
  filteredExpense: Expense[];
}

export const ExpenseList = ({
  expenses,
  setShowExpenseModal,
  setExpense,
  filter,
  filteredExpense,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>

      {filter
        ? filteredExpense.map(expense => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              setShowExpenseModal={setShowExpenseModal}
              setExpense={setExpense}
            />
          ))
        : expenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              setShowExpenseModal={setShowExpenseModal}
              setExpense={setExpense}
            />
          ))}

      {expenses.length === 0 ||
        (filteredExpense.length === 0 && !!filter && (
          <Text style={styles.noExpense}>There are no expenses</Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 100,
  },
  title: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  noExpense: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});
