import React from 'react';

export type FilterTypes = 'all' | 'active' | 'complited';

type PropsType = {
  title?: string;
  tasks: TaskType[];
  removeTask: (taskId: number) => void;
  changeFilter: (filterValue: FilterTypes) => void;
};

export interface TaskType {
  id: number;
  task: string;
  isDone: boolean;
}

export function ToDoList(props: PropsType) {
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task: TaskType) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.task}</span>
            <button onClick={() => props.removeTask(task.id)}>x</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('complited')}>Complited</button>
      </div>
    </div>
  );
}
