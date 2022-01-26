import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Create from "./pages/Create";
import PerBlog from "./pages/PerBlog";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Blogs />
          </Route>
          <Route exact path='/create'>
            <Create />
          </Route>
          <Route exact path='/:id'>
            <PerBlog />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
