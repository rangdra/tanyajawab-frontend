import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import DetailQuestion from './pages/DetailQuestion';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import User from './pages/User';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/auth/login" component={Login} exact />
        <Route path="/auth/register" component={Register} exact />
        <Route path="/create-post" component={CreatePost} exact />
        <Route path="/detail/:slug" component={DetailQuestion} exact />
        <Route path="/users/profile" component={Profile} exact />
        <Route path="/users/:username" component={User} exact />
      </Switch>
    </Router>
  );
}

export default App;
