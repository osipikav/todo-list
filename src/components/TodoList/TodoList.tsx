import { FilterValueTypes } from 'app';
import './TodoList.scss';

export type PropsType = {
  title: string;
  id: number;
  isDone: boolean;
};

type TodoListPropsType = {
  tasks: PropsType[];
  title: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  removeTask: (id: number) => void;
  changeFilter: (value: FilterValueTypes) => void;
};

export const TodoList = (props: TodoListPropsType) => {
  return (
    <div className="card">
      <h3 className="card__title">{props.title}</h3>
      <div className="card__input-line">
        <input />
        <button>+</button>
      </div>
      <ul className="card__todo-items">
        {props.tasks.map((t) => (
          <li key={t.id} className="todo-item">
            <input className="todo-item__input" type="checkbox" checked={t.isDone} />
            <span className="todo-item__text">{t.title}</span>
            <button
              className="todo-item__remove-button"
              onClick={() => {
                props.removeTask(t.id);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div className="card__buttons">
        <button onClick={() => props.changeFilter('all')}>all</button>
        <button onClick={() => props.changeFilter('active')}>active</button>
        <button onClick={() => props.changeFilter('completed')}>completed</button>
      </div>
    </div>
  );
};
