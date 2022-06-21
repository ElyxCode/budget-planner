import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';

import CircularProgress from 'react-native-circular-progress-indicator';

import {formatAmount} from '../helpers/formatAmount';
import globalStyles from '../styles/styles';
import {Expense} from '../interface/interface';

interface Props {
  budget: string;
  Expense: Expense[];
}

export const ControlBudget = ({budget, Expense}: Props) => {
  const [budgetAvailable, setBudgetAvailable] = useState<number>(0);
  const [budgetSpent, setBudgetSpent] = useState<number>(0);
  const [porcentSpent, setPorcentSpent] = useState<number>(0);

  useEffect(() => {
    const totalSpent = Expense.reduce(
      (total, spent) => Number(spent.amount) + total,
      0,
    );

    const totalAvailable = Number(budget) - totalSpent;

    const porcentbudget =
      ((Number(budget) - totalAvailable) / Number(budget)) * 100;

    setPorcentSpent(porcentbudget);
    setBudgetAvailable(totalAvailable);
    setBudgetSpent(totalSpent);
  }, [Expense]);

  return (
    <View style={styles.container}>
      <View style={styles.graphicCenter}>
        <CircularProgress
          radius={120}
          value={porcentSpent}
          progressValueStyle={{
            alignSelf: 'center',
          }}
          duration={1000}
          valueSuffix="%"
          title={'Spent'}
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3B82F6"
          activeStrokeWidth={20}
          titleStyle={{fontWeight: 'bold', fontSize: 20, bottom: 20}}
          titleColor="#64748B"
        />
      </View>

      <View style={styles.infoBudgetContainer}>
        <Text style={styles.budgetInfo}>
          <Text style={styles.labelInfo}>Budget: </Text>
          {formatAmount(budget)}
        </Text>

        <Text style={styles.budgetInfo}>
          <Text style={styles.labelInfo}>Available: </Text>
          {formatAmount(budgetAvailable.toString())}
        </Text>

        <Text style={styles.budgetInfo}>
          <Text style={styles.labelInfo}>Spent: </Text>
          {formatAmount(budgetSpent.toString())}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  graphicCenter: {
    alignItems: 'center',
  },
  infoBudgetContainer: {
    marginTop: 50,
  },
  budgetInfo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  labelInfo: {
    fontWeight: '700',
    color: '#3B82F6',
  },
});
