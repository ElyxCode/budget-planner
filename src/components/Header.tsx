import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const Header = () => {
  return (
    <View>
      <Text style={styles.text}>Expense planner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B82F6',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
  },
});
