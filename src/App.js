import logo from './logo.svg';
import './App.css';
import Board from './Components/Board/Board';
import { UserContextProvider } from './Context/UserContext.jsx';

function App() {
  return (
    <UserContextProvider>
      <Board> </Board>
    </UserContextProvider>
  );
}

      export default App;
