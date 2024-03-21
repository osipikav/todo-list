import { FilterTypes, TaskType, ToDoList } from 'components/ToDoList';
import './index.scss';
import { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';

export interface TaskListType {
  id: string;
  taskList: TaskType[];
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

  const initTodolists: TaskListType[] = [
    { id: v1(), taskList: initTasks1, title: 'title1', filter: 'all' },
    { id: v1(), taskList: initTasks2, title: 'title2', filter: 'all' },
  ];

  const [todolists, setTodolists] = useState<TaskListType[]>(initTodolists);

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

  function removeTaskList(todolistId: string) {
    const updatedTodolists = todolists.filter((todolist) => todolist.id !== todolistId);
    setTodolists(updatedTodolists);
  }

  return (
    <div className="App">
      <AddItemForm
        addItem={(title) => {
          alert(title);
        }}
      />
      {todolists.map((ti) => {
        let tasksForToDoList = ti.taskList;
        if (ti.filter === 'complited') {
          tasksForToDoList = ti.taskList.filter((t) => t.isDone === true);
        }
        if (ti.filter === 'active') {
          tasksForToDoList = ti.taskList.filter((t) => t.isDone === false);
        }
        return (
          <ToDoList
            key={ti.id}
            id={ti.id}
            tasks={tasksForToDoList}
            removeTask={removeTask}
            title={ti.title}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={ti.filter}
            removeTaskList={removeTaskList}
          />
        );
      })}
    </div>
  );
};
