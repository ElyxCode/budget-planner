import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';

import {Header} from './components/Header';
import {NewBudget} from './components/NewBudget';
import {ControlBudget} from './components/ControlBudget';
import {FormBudget} from './components/FormBudget';
import {Expense} from './interface/interface';
import {ExpenseList} from './components/ExpenseList';
import {Filter} from './components/Filter';

const BudgetPlannerApp = () => {
  const [budget, setBudget] = useState<string>('');
  const [isValidBudget, setIsValidBudget] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showExpenseModal, setShowExpenseModal] = useState<boolean>(false);
  const [expense, setExpense] = useState<Expense>({} as Expense);
  const [filter, setFilter] = useState<string>('');
  const [filteredExpense, setfilteredExpense] = useState<Expense[]>([]);

  const handlerNewBudget = (budget: string) => {
    if (!Number(budget)) {
      return Alert.alert('Error', 'The budget cannot be 0 o less', [
        {text: 'Ok'},
      ]);
    }

    setIsValidBudget(true);
  };

  const deleteExpense = (id: string) => {
    return Alert.alert(
      'Error',
      'Are you sure you want to delete the expense? this action is not reversible',
      [
        {text: 'Cancel'},
        {
          text: 'Ok',
          onPress: () => {
            const updateExpenses = expenses.filter(
              expense => expense.id !== id,
            );
            setExpenses(updateExpenses);
            setShowExpenseModal(false);
            setExpense({} as Expense);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidBudget ? (
            <ControlBudget budget={budget} Expense={expenses} />
          ) : (
            <NewBudget
              handlerNewBudget={handlerNewBudget}
              setBudget={setBudget}
              budget={budget}
            />
          )}
        </View>

        {isValidBudget && (
          <>
            <Filter
              expenses={expenses}
              filter={filter}
              setFilter={setFilter}
              setfilteredExpense={setfilteredExpense}
            />
            <ExpenseList
              expenses={expenses}
              setShowExpenseModal={setShowExpenseModal}
              setExpense={setExpense}
              filter={filter}
              filteredExpense={filteredExpense}
            />
          </>
        )}
      </ScrollView>

      {showExpenseModal && (
        <Modal visible={showExpenseModal} animationType="slide">
          <FormBudget
            setShowExpenseModal={setShowExpenseModal}
            setExpenses={setExpenses}
            expenses={expenses}
            setExpense={setExpense}
            expense={expense}
            deleteExpense={deleteExpense}
          />
        </Modal>
      )}

      {isValidBudget && (
        <Pressable
          style={styles.btnAddSpent}
          onPress={() => setShowExpenseModal(true)}>
          <Image
            style={styles.image}
            source={require('./assets/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default BudgetPlannerApp;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 60,
    height: 60,
  },
  btnAddSpent: {
    // backgroundColor: '#F00',
    width: 60,
    height: 60,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
