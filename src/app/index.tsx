import { FilterTypes, TaskType, ToDoList } from 'components/ToDoList';
import './index.scss';
import { useState } from 'react';

export const App = () => {
  const initTasks: TaskType[] = [
    { id: 1, task: 'task 1', isDone: true },
    { id: 2, task: 'task 2', isDone: false },
    { id: 3, task: 'task 3', isDone: false },
  ];

  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState('all');

  function removeTask(id: number) {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  }

  function changeFilter(value: FilterTypes) {
    setFilter(value);
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
      />
    </div>
  );
};
