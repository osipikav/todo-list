import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

export type FilterTypes = 'all' | 'active' | 'complited';

type PropsType = {
  title?: string;
  tasks: TaskType[];
  removeTask: (taskId: string) => void;
  changeFilter: (filterValue: FilterTypes) => void;
  addTask: (value: string) => void;
  changeTaskStatus: (taskId: string) => void;
  filter: FilterTypes;
};

export interface TaskType {
  id: string;
  task: string;
  isDone: boolean;
}

export function ToDoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');

  function onNewTitleHandler(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(e.currentTarget.value);
    setError('');
  }
  function onNewTitleKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  }
  function addTask() {
    const validTaskTitle = newTaskTitle.trim();
    if (validTaskTitle === '') {
      setError('Field is required');
      return;
    }
    props.addTask(validTaskTitle);
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
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message"> {error}</div>}
      </div>

      <ul>
        {props.tasks.map((task: TaskType) => {
          function onChangeHandler() {
            props.changeTaskStatus(task.id);
          }

          function removeTask() {
            props.removeTask(task.id);
          }
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} onChange={onChangeHandler} />
              <span className={task.isDone ? 'is-done' : ''}>{task.task}</span>
              <button onClick={removeTask}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'complited' ? 'active-filter' : ''}
          onClick={onComplitedClickHandler}
        >
          Complited
        </button>
      </div>
    </div>
  );
}
