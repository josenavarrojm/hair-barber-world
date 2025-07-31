import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CustomAppBar({ navigation }: { navigation?: any }) {
  return (
    <View style={styles.appBar}>
      <Text style={styles.title}>Salones</Text>

      <View style={styles.actions}>
        <Pressable
          onPress={() => Alert.alert('Snackbar', 'This is a snackbar')}
          style={styles.iconButton}
        >
          <Ionicons name="notifications-outline" size={24} color="white" />
        </Pressable>

        <Pressable
          onPress={() => {
            if (navigation) {
              navigation.navigate('NextPage');
            }
          }}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-forward-outline" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#6200EE',
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    marginLeft: 12,
  },
});
