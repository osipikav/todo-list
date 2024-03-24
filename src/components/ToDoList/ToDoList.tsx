import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';

export type FilterTypes = 'all' | 'active' | 'complited';

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filterValue: FilterTypes, todolistId: string) => void;
  addTask: (value: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, todolistId: string) => void;
  filter: FilterTypes;
  removeTaskList: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
  changeTaskTitle: (taskId: string, todolistId: string, newTitle: string) => void;
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

  function addTask(title: string) {
    props.addTask(title, props.id);
  }

  function changeTodolistTitle(newTitle: string) {
    props.changeTodolistTitle(props.id, newTitle);
  }

  return (
    <div className="container">
      <h2>
        <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle} />
        <button onClick={() => props.removeTaskList(props.id)}>x</button>
      </h2>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((task: TaskType) => {
          function onChangeHandler() {
            props.changeTaskStatus(task.id, props.id);
          }

          function removeTask() {
            props.removeTask(task.id, props.id);
          }

          function changeTaskTitle(newTitle: string) {
            props.changeTaskTitle(task.id, props.id, newTitle);
          }
          return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input type="checkbox" checked={task.isDone} onChange={onChangeHandler} />
              <EditableSpan title={task.task} onChangeTitle={changeTaskTitle} />
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
