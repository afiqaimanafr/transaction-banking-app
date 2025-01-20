import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { colors } from '../theme'; 

const mockData = {  
  data: [  
    {  
      refId: "123ABC",  
      transferDate: "2024-10-15T12:34:56Z", // Mock transfer date in UTC  
      recipientName: "John Doe",  
      transferName: "Salary Payment",  
      amount: 1500.00  
    },  
    {  
      refId: "456DEF",  
      transferDate: "2024-09-21T09:12:45Z", // Mock transfer date in UTC  
      recipientName: "Jane Smith",  
      transferName: "Invoice Payment",  
      amount: 2300.75  
    },  
    {  
      refId: "789GHI",  
      transferDate: "2024-10-05T16:18:30Z", // Mock transfer date in UTC  
      recipientName: "Robert Brown",  
      transferName: "Refund",  
      amount: -500.00 // Negative amount for a refund  
    },  
    {  
      refId: "101JKL",  
      transferDate: "2024-08-30T11:47:22Z", // Mock transfer date in UTC  
      recipientName: "Emily Davis",  
      transferName: "Bonus Payment",  
      amount: 1200.00  
    }  
  ]  
};

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate fetching data from the API (using mock data)
    setTransactions(mockData.data); 
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.transactionItem} 
      onPress={() => navigation.navigate('TransactionDetailsScreen', { transaction: item })}
    >
      <View style={styles.transactionItemInner}> 
        <View style={styles.transactionDateContainer}>
          <Text style={styles.transactionDate}>{new Date(item.transferDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.transactionDetailsContainer}> 
          <Text style={styles.transactionName}>{item.transferName}</Text>
          <Text style={[styles.transactionAmount, item.amount > 0 ? { color: 'green' } : { color: 'red' }]}>{item.amount > 0 ? `+${item.amount.toFixed(2)}` : item.amount.toFixed(2)}</Text> 
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}> 
        <Text style={styles.screenTitle}>Transaction History</Text> 
        <FlatList 
          data={transactions} 
          renderItem={renderItem} 
          keyExtractor={(item) => item.refId} 
          contentContainerStyle={styles.flatListContent} 
          showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
  },
  contentContainer: {
    flex: 1, 
    paddingHorizontal: 24, 
    paddingVertical: 32, 
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text, 
  },
  flatListContent: {
    paddingBottom: 24, 
  },
  transactionItem: {
    backgroundColor: colors.background,
    borderRadius: 10, 
    padding: 16,
    marginBottom: 16, 
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, 
  },
  transactionItemInner: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  transactionDateContainer: {
    backgroundColor: '#F0F0F0', 
    borderRadius: 5, 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    marginRight: 10, // Added marginRight for better spacing
  },
  transactionDate: {
    color: colors.text,
    fontSize: 14, 
  },
  transactionDetailsContainer: { 
    flex: 1, 
  }, 
  transactionName: {
    fontWeight: 'bold',
    color: colors.text, 
    fontSize: 16, 
  },
  transactionAmount: {
    fontSize: 14, 
  },
});

export default TransactionsScreen;