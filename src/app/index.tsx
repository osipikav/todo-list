import { ToDoList } from 'components/ToDoList';
import './index.scss';

export const App = () => {
  return (
    <div className="App">
      <ToDoList />
      <ToDoList />
      <ToDoList />
    </div>
  );
};
