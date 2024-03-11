import { FilterTypes, TaskType, ToDoList } from 'components/ToDoList';
import './index.scss';
import { useState } from 'react';
import { v1 } from 'uuid';

export const App = () => {
  const initTasks: TaskType[] = [
    { id: v1(), task: 'task 1', isDone: true },
    { id: v1(), task: 'task 2', isDone: false },
    { id: v1(), task: 'task 3', isDone: false },
  ];

  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState('all');

  function removeTask(id: string) {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  }

  function changeFilter(value: FilterTypes) {
    setFilter(value);
  }

  function addTask(value: string) {
    const newTask = { id: v1(), task: value, isDone: false };
    const newTasksArray = [newTask, ...tasks];
    setTasks(newTasksArray);
  }

  function changeCheckMark() {
    console.log('hi');
  }

  let tasksForToDoList = tasks;
  if (filter === 'complited') {
    tasksForToDoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === 'active') {
    tasksForToDoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <ToDoList
        tasks={tasksForToDoList}
        removeTask={removeTask}
        title={'title'}
        changeFilter={changeFilter}
        addTask={addTask}
        changeCheckMark={changeCheckMark}
      />
    </div>
  );
};
