
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Main,Route,Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';


function App() {
  return (
    <div className="">
      <NoteState>
      <Main>
      <Navbar/>
       <Alert message ="This is a Alert "/>
    <div className='container'>
      <Routes>
     <Route exact path='/' element= { <Home/>}/>
     <Route exact path='About' element = {<About/>}/>
      </Routes>
      </div>
      </Main>
      </NoteState>
    </div>
  );
}

export default App;
