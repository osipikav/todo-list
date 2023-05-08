import { FilterValueTypes } from 'app';
import './TodoList.scss';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

export type PropsType = {
  title: string;
  id: string;
  isDone: boolean;
};

type TodoListPropsType = {
  tasks: PropsType[];
  title: string;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValueTypes) => void;
  addTask: (title: string) => void;
  changeIsDone: (id: string) => void;
};

export const TodoList = (props: TodoListPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const AllClickHandler = () => {
    props.changeFilter('all');
  };

  const ActiveClickHandler = () => {
    props.changeFilter('active');
  };

  const CompletedClickHandler = () => {
    props.changeFilter('completed');
  };

  return (
    <div className="card">
      <h3 className="card__title">{props.title}</h3>
      <div className="card__input-line">
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onEnterKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul className="card__todo-items">
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id);
          };
          const onChangeHandler = () => {
            props.changeIsDone(task.id);
          };

          return (
            <li key={task.id} className="todo-item">
              <input className="todo-item__input" type="checkbox" onChange={onChangeHandler} />
              <span className="todo-item__text">{task.title}</span>
              <button className="todo-item__remove-button" onClick={onRemoveHandler}>
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div className="card__buttons">
        <button onClick={AllClickHandler}>all</button>
        <button onClick={ActiveClickHandler}>active</button>
        <button onClick={CompletedClickHandler}>completed</button>
      </div>
    </div>
  );
};
