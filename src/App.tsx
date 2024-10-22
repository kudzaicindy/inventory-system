import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import RoomManagement from './components/RoomManagement';
import BillManagement from './components/BillManagement';
import InventoryManagement from './components/InventoryManagement';
import PenaltyManagement from './components/PenaltyManagement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-inventory-house bg-cover bg-fixed">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<RoomManagement />} />
            <Route path="/bills" element={<BillManagement />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/penalties" element={<PenaltyManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
