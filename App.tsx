import React from 'react';
import { Text, View } from 'react-native';
import { Home } from './src/page/Home';
import { TaskProvider } from './src/Context/TasksContext';


const App = () => {

  return (
    <TaskProvider>
       <Home />
    </TaskProvider>
  );

};


export default App;
