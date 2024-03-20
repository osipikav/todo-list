import { ChangeEvent, useState, KeyboardEvent } from 'react';

type AddItemFormPropsType = {
  addTask: (value: string, todolistId: string) => void;
  id: string;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');
  function onNewTitleHandler(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(e.currentTarget.value);
    setError('');
  }
  function onNewTitleKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle('');
    }
  }
  function addTask() {
    const validTaskTitle = newTaskTitle.trim();
    if (validTaskTitle === '') {
      setError('Field is required');
      return;
    }
    props.addTask(validTaskTitle, props.id);
    setNewTaskTitle('');
  }
  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onNewTitleHandler}
        onKeyDown={onNewTitleKeyDownHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message"> {error}</div>}
    </div>
  );
}
