import { AddItemForm } from 'components/AddItemForm/AddItemForm';

export type FilterTypes = 'all' | 'active' | 'complited';

type PropsType = {
  id: string;
  title?: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filterValue: FilterTypes, todolistId: string) => void;
  addTask: (value: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, todolistId: string) => void;
  filter: FilterTypes;
  removeTaskList: (todolistId: string) => void;
};

export interface TaskType {
  id: string;
  task: string;
  isDone: boolean;
}

export function ToDoList(props: PropsType) {
  function onAllClickHandler() {
    props.changeFilter('all', props.id);
  }

  function onActiveClickHandler() {
    props.changeFilter('active', props.id);
  }

  function onComplitedClickHandler() {
    props.changeFilter('complited', props.id);
  }

  return (
    <div className="container">
      <h2>
        {props.title} <button onClick={() => props.removeTaskList(props.id)}>x</button>
      </h2>
      <AddItemForm addTask={props.addTask} id={props.id} />
      <ul>
        {props.tasks.map((task: TaskType) => {
          function onChangeHandler() {
            props.changeTaskStatus(task.id, props.id);
          }

          function removeTask() {
            props.removeTask(task.id, props.id);
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
