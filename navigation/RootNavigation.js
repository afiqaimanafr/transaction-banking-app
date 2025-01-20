import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

import TransactionsScreen from '../screens/TransactionsScreen'; 
import TransactionDetailsScreen from '../screens/TransactionDetailsScreen'; 

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen 
          name="TransactionsScreen" 
          component={TransactionsScreen} 
          options={{ 
            headerShown: false, 
          }} 
        />
        <Stack.Screen 
          name="TransactionDetailsScreen" 
          component={TransactionDetailsScreen} 
          options={{ 
            headerShown: false, 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;