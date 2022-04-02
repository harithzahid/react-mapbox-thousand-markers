import './App.css';
import { MapProvider } from 'react-map-gl';

import Map from 'src/components/Map.jsx';
import Sidebar from 'src/components/Sidebar.jsx';

function App() {
  return (
    <MapProvider>
      <div className="App">
        <div style={{ minWidth: 400, backgroundColor: '#EDF2F5' }}>
          <Sidebar />
        </div>
        <div style={{ width: '100%' }}>
          <Map />
        </div>
      </div>
    </MapProvider>
  );
}

export default App;
