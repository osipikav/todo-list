// import { HelloWorld } from 'components/HelloWorld';
import { useState } from 'react';
import { v1 } from 'uuid';
import './index.scss';
import { TodoList, PropsType } from 'components/TodoList/TodoList';

export type FilterValueTypes = 'all' | 'active' | 'completed';

export const App = () => {
  const initTasks: Array<PropsType> = [
    { id: v1(), title: 'first', isDone: true },
    { id: v1(), title: 'second', isDone: false },
    { id: v1(), title: 'third', isDone: false },
  ];

  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState<FilterValueTypes>('all');

  function removeTask(id: string) {
    const filtredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filtredTasks);
  }

  function changeFilter(filterValue: FilterValueTypes) {
    setFilter(filterValue);
  }

  function addTask(titleValue: string) {
    console.log('value :>> ', titleValue);
    const newTask: PropsType = { id: v1(), title: titleValue, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = !task.isDone;
    }
    setTasks([...tasks]);
  }

  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      {/* <HelloWorld /> */}
      <TodoList
        tasks={tasksForTodoList}
        title="Task Title"
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
};
