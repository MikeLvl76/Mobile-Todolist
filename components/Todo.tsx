import { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { update, deleteFrom, DB } from '../Database';

export default function Todo({ navigation }: any) {

  const [data, setData] = useState<any[]>([]);
  DB.transaction(tx => {
    tx.executeSql(`SELECT * FROM todo`, [], (_, { rows }) => {
      setData(rows._array.map((i: object) => Object.values(i)));
    }, (_, err) => {
      console.log(err)
      return false;
    });
  });

  return (
    <SafeAreaView>
      <View>
        <View style={styles.addButtonView}>
          <Button
            color={'#0094FF'}
            title='Add todo'
            onPress={() => navigation.navigate('Add')}
          />
        </View>
        <View style={styles.removeButtonView}>
          <Button
            color={'#FF0000'}
            title='Remove todo'
            onPress={() => deleteFrom('todo')}
          />
        </View>
        <Text style={styles.listTitle}>Pending</Text>
        <FlatList
          data={data.filter((r: any[]) => r[2] === 0)}
          renderItem={({ item }) => <View style={styles.listItemPending}><Text style={styles.itemText} onPress={() => update('todo', item[0], 1)}>{item[1]}</Text></View>}
        />
        <Text style={styles.listTitle}>Completed</Text>
        <FlatList
          data={data.filter((r: any[]) => r[2] === 1)}
          renderItem={({ item }) => <View style={styles.listItemCompleted}><Text style={styles.itemText} >{item[1]}</Text></View>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 4,
    marginRight: 4,
    marginVertical: 8
  },
  listItemPending: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000000',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 4,
    paddingVertical: 4
  },
  listItemCompleted: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#00FF00',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000000',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 4,
    paddingVertical: 4
  },
  itemText: {
    marginLeft: 4,
    marginRight: 4,
  },
  addButtonView: {
    marginBottom: 4,
    width: '95%',
    alignSelf: 'center',
  },
  removeButtonView: {
    marginBottom: 4,
    width: '95%',
    alignSelf: 'center',
  }
});
