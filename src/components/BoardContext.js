import { createContext } from 'react';

const BoardContext = createContext({
  updateTask: () => {},
  removeTask: () => {},
});

export default BoardContext;