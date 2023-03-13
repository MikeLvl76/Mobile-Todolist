import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { insertInto } from '../Database';

export default function AddTodo({ navigation }: any) {

    const [task, setTask] = useState<string>('');
    const confirm = (text: string): void => {
        if (text) insertInto('todo', { title: text, status: 0 });
        else console.log('Empty value');
        navigation.navigate('Todo');
    }

    const addAlert = (text: string) =>
        Alert.alert(
            'New todo added !',
            `Successfully added "${text}" !`,
            [
                {
                    text: "Ok",
                    onPress: () => confirm(text)
                },
            ]
        );

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.inputTitle}>Title</Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={(text) => setTask(text)}
                    placeholder='Task to do'
                />
                <View style={styles.confirmButtonView}>
                    <Button
                        color={'#0094FF'}
                        title='Add'
                        onPress={() => addAlert(task)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 4,
        marginRight: 4,
        marginVertical: 8
    },
    inputField: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 4,
        height: '25%',
    },
    confirmButtonView: {
        marginBottom: 4,
        width: '95%',
        alignSelf: 'center',
    }
});
