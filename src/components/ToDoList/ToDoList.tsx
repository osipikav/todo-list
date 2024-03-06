import React from 'react';

interface TaskType {
  id: number;
  task: string;
  checked: boolean;
}

export function ToDoList() {
  const tasks1: TaskType[] = [
    { id: 1, task: 'task 1', checked: true },
    { id: 2, task: 'task 2', checked: false },
    { id: 3, task: 'task 3', checked: false },
  ];

  return (
    <div className="container">
      <h2>What to do</h2>
      <div>
        <input />
        <button>+</button>
      </div>
      <ToDoListItem tasks={tasks1} />
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Complited</button>
      </div>
    </div>
  );
}

function ToDoListItem(props: { tasks: TaskType[] }) {
  return (
    <ul>
      {props.tasks.map((task) => (
        <li key={task.id}>
          <input type="checkbox" checked={task.checked} />
          <span>{task.task}</span>
          <button
            onClick={() => {
              console.log(task.id);
            }}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
