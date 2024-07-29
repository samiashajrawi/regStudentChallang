import Students from "./features/StudentsList"
import Add from "./features/AddStudent"
import Header from "./features/atoms/Header"
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        
      <Routes>
          <Route exact path='/' element={<>
            <Students />
            <div className="buttons">
            <Link to="/add" className="button-15" >New User</Link>
            </div>
      </>}></Route>
                <Route exact path='/add' element={<>
            <Add />
            <div className="buttons">
            <Link to="/" className="button-15">Cancel</Link>
            </div>
      </>}></Route>
      </Routes>
          
      </div>
      </div>
  );
}

export default App;