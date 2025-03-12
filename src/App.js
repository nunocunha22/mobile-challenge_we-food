import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import RestaurantList from './Components/RestaurantList';
import RestaurantDetails from './Components/RestaurantDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
