import React from 'react';
import { Platform ,Text, TouchableOpacity, TextInput, View, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { TaskList } from '../../components/TaskList';
import { TaskContext, useTaskList } from '../../Context/TasksContext';

interface Task {
  id?: string;
  title?: string;
}

export const Home = () => {

  const [newTask, setNewTask] = React.useState('');
  //const { addTask } = React.useContext(TaskContext);
  const { addTask } = useTaskList();

  const handleAddNewTask = () => {

    if(newTask != '' || newTask != null) {
     const data = {
       id: String(new Date().getTime()), //para criar um id unico
       title: newTask
     }

     addTask(data);

     setNewTask(''); //zerando valor
    } else {
      return null;
    }

  };

  return (
    <SafeAreaView style={styleSheet.safeArea} >
     <View style={styleSheet.container} >

      <Text style={styleSheet.titleCustom} >Welcome, John!</Text>

      <TextInput
        onChangeText={setNewTask}
        placeholderTextColor='#555'
        placeholder="Nova Tarefa..."
        style={styleSheet.input}
      />

      <TouchableOpacity onPress={handleAddNewTask} activeOpacity={0.7} style={styleSheet.button}>
        <Text style={styleSheet.textButton}>
         Adicionar
        </Text>
      </TouchableOpacity>

      <Text style={styleSheet.titleTasks} >Minhas Tarefas</Text>

       <TaskList />

     </View>
    </SafeAreaView>
  );

};

/*  lista pequena - para situações menos performaticas

  <ScrollView>
        {tasks.map( task => (
          <TouchableOpacity key={task.id} style={styleSheet.itemList}>
            <Text style={styleSheet.description}>{task.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


*/

/*<Text style={{color:'#00CED1'}}>{newTask}</Text> */

const styleSheet = StyleSheet.create(
  {
    safeArea: {
      flex: 1,
      backgroundColor: '#121214'
    },
    container: {
      flex: 1,
      backgroundColor: '#121214',
      paddingHorizontal: 30, //laterais esquerda / direita
      paddingVertical: 50,
      //justifyContent: 'center',
      // alignItems: 'center'
    },
    titleCustom: {
      color: '#00CED1',
      fontSize: 24,
      fontWeight: 'bold'
    },
    input: {
      backgroundColor: '#29292e',
      color: '#f1f1f1',
      fontSize: 18,
      padding: Platform.OS === 'ios' ? 15 : 12,
      marginTop: 30,
      borderRadius: 7,
    },
    button: {
      backgroundColor: '#eba417',
      padding: 15,
      borderRadius: 7,
      alignItems: 'center',
      marginTop: 20,
    },
    textButton: {
      color: '#121214',
      fontSize: 18,
      fontWeight: 'bold'
    },
    titleTasks: {
      color: '#00CED1', //00CED1
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 50,
      marginBottom: 20
    },
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

