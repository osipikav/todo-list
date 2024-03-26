import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = { title: string; onChangeTitle: (newTitle: string) => void };

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  function activateEditMode() {
    setTitle(props.title);
    setEditMode(true);
  }
  function activateViewMode() {
    setEditMode(false);
    setTitle;
    props.onChangeTitle(title);
  }

  function onTitleHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }

  return editMode ? (
    <TextField
      value={title}
      onBlur={activateViewMode}
      autoFocus
      onChange={onTitleHandler}
      id="outlined-size-small"
      size="small"
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
