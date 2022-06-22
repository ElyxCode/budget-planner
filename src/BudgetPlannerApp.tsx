import React, { useState, useEffect } from 'react';
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

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from './components/Header';
import { NewBudget } from './components/NewBudget';
import { ControlBudget } from './components/ControlBudget';
import { FormBudget } from './components/FormBudget';
import { Expense } from './interface/interface';
import { ExpenseList } from './components/ExpenseList';
import { Filter } from './components/Filter';
import { set } from 'react-native-reanimated';

const BudgetPlannerApp = () => {
  const [budget, setBudget] = useState<string>('');
  const [isValidBudget, setIsValidBudget] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showExpenseModal, setShowExpenseModal] = useState<boolean>(false);
  const [expense, setExpense] = useState<Expense>({} as Expense);
  const [filter, setFilter] = useState<string>('');
  const [filteredExpense, setfilteredExpense] = useState<Expense[]>([]);

  useEffect(() => {
    const getBudgetStorage = async () => {
      try {
        const budgetStorage =
          (await AsyncStorage.getItem('budget-planner')) ?? '';
        if (!budgetStorage) {
          return setIsValidBudget(false);
        }

        setBudget(budgetStorage);
        setIsValidBudget(true);
      } catch (err) {
        console.log(err);
      }
    };

    getBudgetStorage();
  }, []);

  useEffect(() => {
    if (isValidBudget) {
      const saveBudgetStorage = async () => {
        try {
          await AsyncStorage.setItem('budget-planner', budget);
        } catch (err) {
          console.log(err);
        }
      };
      saveBudgetStorage();
    }
  }, [isValidBudget]);

  useEffect(() => {
    const getExpensesStorage = async () => {
      try {
        const expensesStorage = await AsyncStorage.getItem('expenses-planner');
        if (!expensesStorage) {
          return setExpenses([]);
        }
        const setExpensesFromStorage: Expense[] = JSON.parse(expensesStorage);
        setExpenses(setExpensesFromStorage);
      } catch (err) {
        console.log(err);
      }
    };
    getExpensesStorage();
  }, []);

  useEffect(() => {
    const setExpensesStorage = async () => {
      try {
        await AsyncStorage.setItem(
          'expenses-planner',
          JSON.stringify(expenses),
        );
      } catch (err) {
        console.log(err);
      }
    };

    setExpensesStorage();
  }, [expenses]);

  const handlerNewBudget = (budget: string) => {
    if (!Number(budget)) {
      return Alert.alert('Error', 'The budget cannot be 0 o less', [
        { text: 'Ok' },
      ]);
    }

    setIsValidBudget(true);
  };

  const deleteExpense = (id: string) => {
    return Alert.alert(
      'Error',
      'Are you sure you want to delete the expense? this action is not reversible',
      [
        { text: 'Cancel' },
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

  const handleRebootApp = () => {

    const rebootApp = async () => {
      try {
        await AsyncStorage.clear();
        setBudget('');
        setExpenses([]);
        setFilter('');
        setfilteredExpense([]);
        setIsValidBudget(false);
      } catch (err) {
        console.log(err);
      }
    }

    Alert.alert('Do you want to delete the saved data?', 'This action will delete the budget and expenses', [{ text: 'Cancel' }, {
      text: 'Yes, delete', onPress: () => {
        rebootApp();
      }
    }])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidBudget ? (
            <ControlBudget budget={budget} Expense={expenses} handleRebootApp={handleRebootApp} />
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
    width: 60,
    height: 60,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
