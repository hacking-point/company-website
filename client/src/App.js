
import './App.css';
import AllRoute from './routes/routes';
import { ThreeDBotton } from './components/Button';
import AnimatedInput from './components/AnimatedInput';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ProductCard from './components/ProductCard';
import ProductShowcase from './components/ProductDetail';

function App() {
  function onClick(val){
    console.log(val)

  }
  return (
    <>
      
      <AllRoute/>
    </>
  );
}

export default App;
