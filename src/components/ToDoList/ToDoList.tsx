import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

export type FilterTypes = 'all' | 'active' | 'complited';

type PropsType = {
  title?: string;
  tasks: TaskType[];
  removeTask: (taskId: string) => void;
  changeFilter: (filterValue: FilterTypes) => void;
  addTask: (value: string) => void;
  changeCheckMark: () => void;
};

export interface TaskType {
  id: string;
  task: string;
  isDone: boolean;
}

export function ToDoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function onNewTitleHandler(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(e.currentTarget.value);
  }
  function onNewTitleKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  }
  function addTask() {
    props.addTask(newTaskTitle);
    setNewTaskTitle('');
  }
  function onAllClickHandler() {
    props.changeFilter('all');
  }
  function onActiveClickHandler() {
    props.changeFilter('active');
  }
  function onComplitedClickHandler() {
    props.changeFilter('complited');
  }

  return (
    <div className="container">
      <h2>{props.title}</h2>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleHandler}
          onKeyDown={onNewTitleKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((task: TaskType) => {
          function removeTask() {
            props.removeTask(task.id);
          }
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e) => console.log(e.currentTarget)}
              />
              <span>{task.task}</span>
              <button onClick={removeTask}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onComplitedClickHandler}>Complited</button>
      </div>
    </div>
  );
}
