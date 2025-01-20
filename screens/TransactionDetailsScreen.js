import React from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Share,
  Alert,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { colors } from '../theme'; 
import { Ionicons } from '@expo/vector-icons'; 

const TransactionDetailsScreen = ({ route }) => {
  const { transaction } = route.params;
  const navigation = useNavigation();

  const handleShare = async () => { 
    try {
      await Share.share({
        message: `Transaction Details:\n\nRef ID: ${transaction.refId}\nDate: ${new Date(transaction.transferDate).toLocaleDateString()}\nRecipient: ${transaction.recipientName}\nAmount: ${transaction.amount}`,
      });
    } catch (error) {
      Alert.alert('Share Error', 'An error occurred while sharing the transaction.');
      console.error('Error sharing transaction:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.backButtonContainer} 
          onPress={() => navigation.goBack()} 
        >
          <Ionicons name="chevron-back-outline" size={24} color="white" /> 
        </TouchableOpacity>
        <Text style={styles.title}>Transaction Details</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Ref ID:</Text>
            <Text style={styles.detailValue}>{transaction.refId}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{new Date(transaction.transferDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Recipient:</Text>
            <Text style={styles.detailValue}>{transaction.recipientName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Amount:</Text>
            <Text style={[styles.detailValue, transaction.amount > 0 ? { color: 'green' } : { color: 'red' }]}>{transaction.amount}</Text> 
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <View style={styles.shareButtonInner}> 
          <Ionicons name="share-social-outline" size={20} color="white" /> 
          <Text style={styles.shareButtonText}> Share</Text> 
        </View>
      </TouchableOpacity>
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
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: colors.primary, 
    borderRadius: 50, 
    padding: 8, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text, 
  },
  detailsContainer: {
    marginVertical: 20, 
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    color: colors.text, 
    fontSize: 16, 
  },
  detailValue: {
    color: colors.text, 
    fontSize: 16, 
  },
  shareButton: {
    backgroundColor: colors.background,
    borderRadius: 50, 
    padding: 10, 
    alignItems: 'center',
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
  },
  shareButtonInner: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  shareButtonText: {
    fontWeight: 'bold',
    color: colors.text, 
    marginLeft: 5, 
  },
});

export default TransactionDetailsScreen;