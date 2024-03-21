import { ChangeEvent, useState, KeyboardEvent } from 'react';

type AddItemFormPropsType = {
  addItem: (value: string) => void;
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
      props.addItem(newTaskTitle);
      setNewTaskTitle('');
    }
  }
  function addTask() {
    const validTaskTitle = newTaskTitle.trim();
    if (validTaskTitle === '') {
      setError('Field is required');
      return;
    }
    props.addItem(validTaskTitle);
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
