// import { HelloWorld } from 'components/HelloWorld';
import { useState } from 'react';
import './index.scss';
import { TodoList, PropsType } from 'components/TodoList/TodoList';

export type FilterValueTypes = 'all' | 'active' | 'completed';

export const App = () => {
  const initTasks: Array<PropsType> = [
    { id: 1, title: 'first', isDone: true },
    { id: 2, title: 'second', isDone: false },
    { id: 3, title: 'third', isDone: false },
  ];

  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState<FilterValueTypes>('all');

  function removeTask(id: number) {
    const filtredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filtredTasks);
  }

  function changeFilter(value: FilterValueTypes) {
    console.log('value :>> ', value);
    setFilter(value);
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
      />
    </div>
  );
};
