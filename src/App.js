import './App.css';

import Map from 'src/components/Map.jsx';
import Sidebar from 'src/components/Sidebar.jsx';

function App() {
  return (
    <div className="App">
      <div style={{ minWidth: 400 }}>
        <Sidebar /> 
      </div>
      <div style={{ width: '100%' }}>
        <Map />
      </div>
    </div>
  );
}

export default App;
