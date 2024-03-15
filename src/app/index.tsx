import { FilterTypes, TaskType, ToDoList } from 'components/ToDoList';
import './index.scss';
import { useState } from 'react';
import { v1 } from 'uuid';

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
    { id: v1(), taskList: initTasks1, title: 'title1', filter: 'active' },
    { id: v1(), taskList: initTasks2, title: 'title2', filter: 'all' },
  ];

  const [todolists, setTodolists] = useState<TaskListType[]>(initTodolists);
  // const [tasks, setTasks] = useState<TaskType[]>(initTasks1);

  // function removeTask(id: string) {
  //   const updatedTasks = tasks.filter((t) => t.id !== id);
  //   setTasks(updatedTasks);
  // }

  function changeFilter(value: FilterTypes, todolistId: string) {
    const todolist = todolists.find((t) => t.id === todolistId);

    if (todolist) {
      todolist.filter = value;
    }
  }

  function addTask(value: string, todolistId: string) {
    const newTask = { id: v1(), task: value, isDone: false };

    const todolist = todolists.find((t) => t.id === todolistId);
    if (todolist) {
      const newTasksArray = [newTask, ...todolist?.taskList];

      todolist.taskList = newTasksArray;
    }

    // const updatedTodolists = todolists.map((todolist) => {
    //   if (todolist.id === todolistId) {
    //     return {
    //       ...todolist,
    //       taskList: [newTask, ...todolist.taskList],
    //     };
    //   }
    //   return todolist;
    // });

    // setTodolists(updatedTodolists.);
  }

  // function changeTaskStatus(taskId: string) {
  //   const task = tasks.find((t) => taskId === t.id);
  //   if (task) {
  //     task.isDone = !task.isDone;
  //   }
  //   setTasks([...tasks]);
  // }

  return (
    <div className="App">
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
            // removeTask={removeTask}
            title={ti.title}
            changeFilter={changeFilter}
            addTask={addTask}
            // changeTaskStatus={changeTaskStatus}
            filter={ti.filter}
          />
        );
      })}
    </div>
  );
};
