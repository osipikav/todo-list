import { TodolistType } from 'app';
// import { FilterTypes } from 'components/ToDoList';
// import { createStore } from 'redux';
// import { v1 } from 'uuid';

type ActionsTypes = RemoveTodolistActionType;
// | AddTodolistActionType
// | ChangeTodolistTitleActionType
// | ChangeTodolistFilterActionType;

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
// export type AddTodolistActionType = {
//   type: 'ADD-TODOLIST';
//   title: string;
// };
// export type ChangeTodolistTitleActionType = {
//   type: 'CHANGE-TODOLIST-TITLE';
//   id: string;
//   title: string;
// };
// export type ChangeTodolistFilterActionType = {
//   type: 'CHANGE-TODOLIST-FILTER';
//   id: string;
//   filter: FilterTypes;
// };

export const todolistReducer = (state: TodolistType[], action: ActionsTypes): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((todolist) => todolist.id !== action.id);
    }
    // case 'ADD-TODOLIST': {
    //   return [...state, { id: v1(), taskList: [], title: action.title, filter: 'all' }];
    // }
    // case 'CHANGE-TODOLIST-TITLE': {
    //   const todolist = state.find((todolist) => todolist.id === action.id);
    //   if (todolist) {
    //     todolist.title = action.title;
    //   }
    //   return [...state];
    // }
    // case 'CHANGE-TODOLIST-FILTER': {
    //   const todolist = state.find((todolist) => todolist.id === action.id);
    //   if (todolist) {
    //     todolist.title = action.filter;
    //   }
    //   return [...state];
    // }
    default:
      return state;
  }
};

export const removeTodolistActionCreator = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};
// export const addTodolistActionCreator = (title: string): AddTodolistActionType => {
//   return { type: 'ADD-TODOLIST', title: title };
// };
// export const changeTodolistTitleActionCreator = (
//   title: string,
//   id: string
// ): ChangeTodolistTitleActionType => {
//   return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: id };
// };
// export const changeTodolistFilterActionCreator = (
//   filter: FilterTypes,
//   id: string
// ): ChangeTodolistFilterActionType => {
//   return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id };
// };

// export const store = createStore(todolistReducer);
