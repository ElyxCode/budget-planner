import React from 'react';
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';

import globalStyles from '../styles/styles';

interface Props {
  handlerNewBudget: (budget: string) => void;
  budget: string;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
}

export const NewBudget = ({ handlerNewBudget, budget, setBudget }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelBudget}>Define budget</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Add your budget. Example: 300"
        style={styles.inputBudget}
        onChangeText={value => setBudget(value)}
        value={budget.toString()}
      />
      <Pressable
        style={styles.btnBudget}
        onPress={() => handlerNewBudget(budget)}>
        <Text style={styles.textBtnBudget}>Add budget</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  inputBudget: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  labelBudget: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
  },
  btnBudget: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  textBtnBudget: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
