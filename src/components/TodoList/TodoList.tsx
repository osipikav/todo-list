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
  changeTaskStatus: (id: string) => void;
  filter: FilterValueTypes;
};

export const TodoList = (props: TodoListPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    setError(null);
  };

  const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    } else setError('Title is required');
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
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      <ul className="card__todo-items">
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id);
          };
          const onChangeHandler = () => {
            props.changeTaskStatus(task.id);
          };
          return (
            <li key={task.id} className="todo-item">
              <input
                className="todo-item__input"
                type="checkbox"
                onChange={onChangeHandler}
                checked={task.isDone}
              />
              <span className={'todo-item__text' + (task.isDone === true ? ' is-done' : '')}>
                {task.title}
              </span>
              <button className="todo-item__remove-button" onClick={onRemoveHandler}>
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div className="card__buttons">
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={AllClickHandler}>
          all
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={ActiveClickHandler}
        >
          active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={CompletedClickHandler}
        >
          completed
        </button>
      </div>
    </div>
  );
};
