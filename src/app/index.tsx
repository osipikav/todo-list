import { FilterTypes, TaskItemType, ToDoList } from 'components/ToDoList';
import './index.scss';
import { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export interface TodolistType {
  id: string;
  taskList: TaskItemType[];
  title: string;
  filter: FilterTypes;
}
export const App = () => {
  const initTasks1 = [
    { id: v1(), task: 'task 1', isDone: true },
    { id: v1(), task: 'task 2', isDone: false },
    { id: v1(), task: 'task 3', isDone: false },
  ];
  const initTasks2 = [
    { id: v1(), task: 'task 4', isDone: true },
    { id: v1(), task: 'task 5', isDone: false },
    { id: v1(), task: 'task 6', isDone: false },
  ];

  const initTodolists: TodolistType[] = [
    { id: v1(), taskList: initTasks1, title: 'title1', filter: 'all' },
    { id: v1(), taskList: initTasks2, title: 'title2', filter: 'all' },
  ];

  const [todolists, setTodolists] = useState<TodolistType[]>(initTodolists);

  function removeTask(id: string, todolistId: string) {
    const updatedTodolists = todolists.map((todolist) => {
      if (todolist.id === todolistId) {
        const updatedTasks = todolist.taskList.filter((task) => task.id !== id);
        return { ...todolist, taskList: [...updatedTasks] };
      }
      return todolist;
    });
    setTodolists(updatedTodolists);
  }

  function changeFilter(value: FilterTypes, todolistId: string) {
    const updatedTodolists = todolists.map((todolist) => {
      if (todolist.id === todolistId) {
        return {
          ...todolist,
          filter: value,
        };
      }
      return todolist;
    });
    setTodolists(updatedTodolists);
  }

  function addTask(value: string, todolistId: string) {
    const newTask = { id: v1(), task: value, isDone: false };
    const updatedTodolists = todolists.map((todolist) => {
      if (todolist.id === todolistId) {
        return {
          ...todolist,
          taskList: [newTask, ...todolist.taskList],
        };
      }
      return todolist;
    });
    setTodolists(updatedTodolists);
  }

  function changeTaskStatus(taskId: string, todolistId: string) {
    const updatedTodolists = todolists.map((todolist) => {
      if (todolist.id === todolistId) {
        const updatedTaskList = todolist.taskList.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone: !task.isDone };
          }
          return task;
        });
        return { ...todolist, taskList: updatedTaskList };
      }
      return todolist;
    });
    setTodolists(updatedTodolists);
  }

  function changeTaskTitle(taskId: string, todolistId: string, newTitle: string) {
    const updatedTodolists = todolists.map((todolist) => {
      if (todolist.id === todolistId) {
        const updatedTaskList = todolist.taskList.map((task) => {
          if (task.id === taskId) {
            return { ...task, task: newTitle };
          }
          return task;
        });
        return { ...todolist, taskList: updatedTaskList };
      }
      return todolist;
    });
    setTodolists(updatedTodolists);
  }

  function removeTodolist(todolistId: string) {
    const updatedTodolists = todolists.filter((todolist) => todolist.id !== todolistId);
    setTodolists(updatedTodolists);
  }

  function addTodolist(title: string) {
    const newTodolistItem: TodolistType = { id: v1(), taskList: [], title: title, filter: 'all' };
    const updatedTodolists = [newTodolistItem, ...todolists];
    setTodolists(updatedTodolists);
  }
  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find((todolist) => todolist.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton size="small" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODOLISTS
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ margin: '20px 0' }}>
          <AddItemForm addItem={(title) => addTodolist(title)} />
        </Grid>
        <Grid container spacing={5}>
          {todolists.map((ti) => {
            let tasksForToDoList = ti.taskList;
            if (ti.filter === 'complited') {
              tasksForToDoList = ti.taskList.filter((t) => t.isDone === true);
            }
            if (ti.filter === 'active') {
              tasksForToDoList = ti.taskList.filter((t) => t.isDone === false);
            }
            return (
              <Grid item key={ti.id}>
                <Paper elevation={3}>
                  <ToDoList
                    id={ti.id}
                    tasks={tasksForToDoList}
                    removeTask={removeTask}
                    title={ti.title}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={ti.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
