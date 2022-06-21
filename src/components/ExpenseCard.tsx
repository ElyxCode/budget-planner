import React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import {formatAmount} from '../helpers/formatAmount';
import {formatDate} from '../helpers/formatDate';

import {Expense} from '../interface/interface';
import globalStyles from '../styles/styles';

const dictionaryCategoryImg: any = {
  saving: require('../assets/icono_ahorro.png'),
  food: require('../assets/icono_comida.png'),
  home: require('../assets/icono_casa.png'),
  bills: require('../assets/icono_gastos.png'),
  leisure: require('../assets/icono_ocio.png'),
  health: require('../assets/icono_salud.png'),
  subscription: require('../assets/icono_suscripciones.png'),
};

interface Props {
  expense: Expense;
  setShowExpenseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExpense: React.Dispatch<React.SetStateAction<Expense>>;
}

export const ExpenseCard = ({
  expense,
  setShowExpenseModal,
  setExpense,
}: Props) => {
  const {name, amount, category, date} = expense;

  const handleActions = () => {
    setShowExpenseModal(true);
    setExpense(expense);
  };

  return (
    <Pressable onLongPress={handleActions}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={dictionaryCategoryImg[category]}
            />

            <View style={styles.infoContainer}>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.date}>{formatDate(date)}</Text>
            </View>
          </View>

          <Text style={styles.amount}>{formatAmount(amount)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  category: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    color: '#64748B',
    marginBottom: 5,
  },
  date: {
    color: '#DB2777',
    fontWeight: '700',
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
});
