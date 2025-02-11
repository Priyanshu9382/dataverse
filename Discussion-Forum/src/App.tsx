import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Question from './pages/Question';
import Landing from './pages/Landing';
import Popular from './pages/Popular';
import Categories from './pages/Categories';
import Category from './pages/Category';
import { RecoilRoot } from 'recoil';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <RecoilRoot>
      <Router basename="/dataverse">  {/* Fix: Use BrowserRouter */}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/question/:id' element={<Question />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id' element={<Category />} />
          <Route path='/browse/:id' element={<Browse />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
