// import { TaskItemType } from 'components/ToDoList';

// type ActionsTypes = RemoveTaskActionType | ActionType2;

// export type RemoveTaskActionType = {
//   type: 'REMOVE-TASK';
//   todolistId: string;
//   taskId: string;
// };
// export type ActionType2 = {
//   type: '2';
//   title: string;
// };

// export const tasksReducer = (state: TaskItemType[], action: ActionsTypes): TaskItemType[] => {
//   switch (action.type) {
//     case 'REMOVE-TASK': {
//       const updatedState = state.map((todolist) => {
//         if (todolist.id === action.todolistId) {
//           // const updatedTasks = todolist.task.filter((task) => task.id !== action.taskId);
//           // return { ...todolist, tasks: updatedTasks };
//         }
//         return todolist;
//       });
//       return updatedState;
//     }

//     default:
//       return state;
//   }
// };

// export const removeTodolistActionCreator = (todolistId: string): RemoveTaskActionType => {
//   return { type: 'REMOVE-TASK', todolistId, taskId };
// };
