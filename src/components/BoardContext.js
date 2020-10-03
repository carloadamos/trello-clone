import { createContext } from 'react';

const BoardContext = createContext({
  editingTask: false,
  updateTask: () => {},
});

export default BoardContext;