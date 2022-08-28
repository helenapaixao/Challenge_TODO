import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTaskWithThisName = tasks.findIndex((task) => task.title === newTaskTitle) > -1;

    if(hasTaskWithThisName) {
      Alert.alert(
        "Task já cadastrada",
         "Você não pode cadastrar uma task com o mesmo nome"
      )
    } else {
      setTasks([...tasks, {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }])
    }
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map((task) => {
      if(task.id === id) {
        return {
          ...task,
          done: !task.done
        }
      }

      return task
    })
    setTasks(newTasks)

    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    const newTask = tasks.filter((task) => task.id !== id)
    setTasks(newTask)
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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