import React from 'react';
import { Platform ,Text, TouchableOpacity, TextInput, View, StyleSheet, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import { ITask, TaskContext, useTaskList } from '../../Context/TasksContext';

interface Task {
  id?: string;
  title?: string;
}

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = () => {

  //const { tasks } = React.useContext(TaskContext);
  const { tasks, removeTask } = useTaskList();

  const handleRemoveTask = (id: string) => {
    Alert.alert('Ação', 'Deseja excluir a tarefa?', [
     {
      text: 'Cancelar',
      onPress: () => {},
     },
     {
      text: 'Ok',
      onPress: () => {
        removeTask(id)
      },
     }
    ]);
  };

  return(
    <FlatList
    //data={props.tasks}
    data={tasks as ITask[]}
    keyExtractor={item => item.id!}
    renderItem={
      ({item}) => (
        <TouchableOpacity style={styleSheet.itemList} onPress={() => handleRemoveTask(item.id)}>
         <Text style={styleSheet.description}>{item.title}</Text>
        </TouchableOpacity>
      )}
   />
  );
};


const styleSheet = StyleSheet.create(
  {
    itemList: {
      //color: '#000000', black
      marginVertical: 8,
      backgroundColor: '#f1f1f1',
      //borderBottomColor: '#00CED1',
      //borderEndWidth: 2,
      padding: 12,
      borderRadius: 50,
      alignItems: 'center'
    },
    description: {
      fontSize: 18,
      fontWeight: '400'
    }
  }
);

