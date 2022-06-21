import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import globalStyles from '../styles/styles';
import {useForm} from '../hooks/useForm';
import {Expense} from '../interface/interface';
import {generateId} from '../helpers/idGenerator';

interface Props {
  setShowExpenseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  expenses: Expense[];
  setExpense: React.Dispatch<React.SetStateAction<Expense>>;
  expense: Expense;
  deleteExpense: (id: string) => void;
}

export const FormBudget = ({
  setShowExpenseModal,
  setExpenses,
  expenses,
  setExpense,
  expense,
  deleteExpense,
}: Props) => {
  const {form, setFormValue, id, name, amount, category, onChange} =
    useForm<Expense>({
      id: '',
      name: '',
      amount: '',
      category: '',
      date: 0,
    });

  useEffect(() => {
    if (expense?.id) {
      const editFormValues: Expense = {
        id: expense.id,
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
      };

      setFormValue(editFormValues);
    }
  }, [expense]);

  const handleAddExpense = (form: Expense) => {
    if ([name, amount, category].includes('')) {
      return Alert.alert('Error', 'All fields are required');
    }

    if (Number(amount) <= 0) {
      return Alert.alert('Error', 'The amount cannot be 0 o less');
    }

    if (id) {
      const updateExpense = expenses.map(expenseState =>
        expenseState.id === id ? form : expenseState,
      );
      setExpenses(updateExpense);
      setExpense({} as Expense);
    } else {
      form.id = generateId();
      form.date = Date.now();

      setExpenses(expense => [...expense, form]);
    }

    setFormValue(cleanInputs);

    setShowExpenseModal(false);
  };

  const cleanInputs: Expense = {
    id: '',
    name: '',
    amount: '',
    category: '',
    date: 0,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.btn, styles.btnCancel]}
          onPress={() => {
            setShowExpenseModal(false);
            setExpense({} as Expense);
          }}>
          <Text style={styles.btnText}>Cancel</Text>
        </Pressable>

        {expense.id && (
          <Pressable
            style={[styles.btn, styles.btnDelete]}
            onPress={() => {
              deleteExpense(id);
            }}>
            <Text style={styles.btnText}>Eliminar</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {expense?.id ? 'Edit expense' : 'New expense'}
        </Text>

        <View style={styles.expenseField}>
          <Text style={styles.expenseLabel}>Expense name</Text>
          <TextInput
            style={styles.expenseInput}
            placeholder="Expense name . Example: food"
            value={name}
            onChangeText={value => onChange(value, 'name')}
          />
        </View>

        <View style={styles.expenseField}>
          <Text style={styles.expenseLabel}>amount of expenses</Text>
          <TextInput
            style={styles.expenseInput}
            placeholder="Amount spent . Example: 300"
            keyboardType="numeric"
            value={amount}
            onChangeText={value => onChange(value, 'amount')}
          />
        </View>

        <View style={styles.expenseField}>
          <Text style={styles.expenseLabel}>Expenses category</Text>
          <Picker
            style={styles.expenseInput}
            selectedValue={category}
            onValueChange={itemValue => onChange(itemValue, 'category')}>
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

        <Pressable
          style={styles.btnSubmit}
          onPress={() => handleAddExpense(form)}>
          <Text style={styles.btnTextSubmit}>
            {expense?.id ? 'Edit expense' : 'Add expense'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E40AF',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
  },
  btnCancel: {
    backgroundColor: '#DB2777',
  },
  btnDelete: {
    backgroundColor: '#F00',
  },
  btnText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    ...globalStyles.container,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748B',
  },
  expenseField: {
    marginVertical: 10,
  },
  expenseLabel: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseInput: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnSubmit: {
    backgroundColor: '#3B82F6',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  btnTextSubmit: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
