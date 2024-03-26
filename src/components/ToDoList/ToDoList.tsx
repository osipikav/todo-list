import { Button } from '@mui/material';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => props.removeTaskList(props.id)}
        >
          delete
        </Button>
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
              <Button
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={removeTask}
              >
                delete
              </Button>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          variant={props.filter === 'all' ? 'outlined' : 'contained'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === 'active' ? 'outlined' : 'contained'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === 'complited' ? 'outlined' : 'contained'}
          onClick={onComplitedClickHandler}
        >
          Complited
        </Button>
      </div>
    </div>
  );
}
