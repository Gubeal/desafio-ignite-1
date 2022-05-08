import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId:number; 
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithTheSameTitle = tasks.find(item => item.title === newTaskTitle);

    if (taskWithTheSameTitle) {
      return Alert.alert(
        "Task já cadastrada", 
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}));

    const taskToBeMarkedAsDone = updatedTasks.find(item => item.id === id);

    if (!taskToBeMarkedAsDone) {
      return
    }

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
    
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
          }
        }
      ]
    )  
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs){
    const updatedTasks = tasks.map(task => ({...task}));

    const taskToBeEditTitle = updatedTasks.find(item => item.id === taskId);
    
    if (!taskToBeEditTitle) {
      return;
    }

    const taskWithTheSameTitle = tasks.find(item => item.title === taskNewTitle);

    if (taskWithTheSameTitle) {
      return Alert.alert(
        "Alerta de título duplicado", 
        "Já existe uma task com este título");
    }

    taskToBeEditTitle.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})