import './App.css';
import { BrowserRouter as Router, Routes} from 'react-router-dom';
import Layout from './components/layout/Layout';


function App() {
  return (
    <Router>
      <div className="App">
        <Layout />
        <Routes>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
