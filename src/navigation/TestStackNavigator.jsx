import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/CustomHeader';
import TestListScreen from '../Screens/TestListScreen';
import TestDetailScreen from '../Screens/TestDetailScreen';

const TestStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Tests" screenOptions={{
        headerShown:false,
        headerStyle: { backgroundColor: '#F8EDE3' },
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen name="Tests" component={TestListScreen} />
      <Stack.Screen name="TestDetail" component={TestDetailScreen} options={{headerBackVisible: false}}/>
    </Stack.Navigator>
  );
};

export default TestStackNavigator;