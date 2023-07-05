import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert } from "react-native";

interface IProps {
  children: React.ReactElement; //tipo children
}

export interface ITask {
  id: string;
  title: string;
}

export interface ITasksContext {
  tasks: ITask[];
  addTask(task: ITask): void;
  removeTask(id:string): void;
}

//chave asyncStorage
const tasksKey = '@myTasks:Tasks';

//{id:'1', title:'test'}
export const TaskContext = React.createContext<ITasksContext>({} as ITasksContext);

//passa generics do tipo interface IProps para ter acesso as propriedades passadas
//desestrutura para pegar o children
export const TaskProvider: React.FC<IProps> = ({children}) => {

  const [data, setData] = React.useState<ITask[]>([]);

  React.useEffect( () => {

    //metodo criado
    async function loadTask() { //React não permite colocar o async no inicio chamada useEffect precisa colocar dentro da função como esta aqui

      const taskListProcess = await AsyncStorage.getItem(tasksKey);

      if( taskListProcess ) {
        setData(JSON.parse(taskListProcess));
      }

    }

    //chamar metodo
    loadTask();

  }, []);

  const addTask = async (task: ITask) => {

    try {

      const newList = [...data, task];
      setData(newList);
      await AsyncStorage.setItem(tasksKey, JSON.stringify(newList));

    } catch (err) {
      console.log(err);
      throw new Error(err as string);
    }

    console.log('add task!');
  }

  const removeTask = async (id: string) => {
   const newList = data.filter(task => task.id !== id);
   setData(newList);
   await AsyncStorage.setItem(tasksKey, JSON.stringify(newList));
  }

  return (
    <TaskContext.Provider value={{tasks:data, addTask, removeTask}}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskList(): ITasksContext {
  const context = React.useContext(TaskContext);

  if(!context) {
    Alert.alert(
      'Aviso',
      'UseTaskList deve ser usado em um taskProvider',
      [
        {
          text: 'Ok',
          onPress: () => {}
        }
      ]
    );

    throw new Error('UseTaskList deve ser usado em um taskProvider');

  }

  return context;

}
