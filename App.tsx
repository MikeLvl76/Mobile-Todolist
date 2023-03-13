import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Todo' component={Todo}></Stack.Screen>
        <Stack.Screen name='Add' component={AddTodo}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
