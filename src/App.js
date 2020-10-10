import React from 'react';

// Components
// import CardList from './components/card-list/card-list.component'
import Board from './components/board/board.component';

// Styles
import './styles/style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="center">
          <Board />
        </div>
      </header>
    </div>
  );
}

export default App;
