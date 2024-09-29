import { Link, Route, Switch } from "wouter";

import Navbar from "./components/Navbar";
import Example from "./page/Example";
import Gallery from "./page/Gallery";
import Landing from "./page/Landing";

function App() {

  return (
    <>
      <Navbar />
      
      <Switch>
        <Route path="/users/:name">
          {(params) => <>Hello, {params.name}!</>}
        </Route>

        <Route path="/example">
          <Example />
        </Route>


        <Route path="/gallery">
          <Gallery />
        </Route>

        <Route path="/gallery/item/:id">
          <Gallery />
        </Route>

        <Route path="/">
          <Landing />
        </Route>

        {/* Default route in a switch */}
        {/* <Route>404: No such page!</Route> */}
      </Switch>
    </>
  )
}

export default App
