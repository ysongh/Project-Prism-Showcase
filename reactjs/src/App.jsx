import { Link, Route, Switch } from "wouter";

import Example from "./page/Example";
import Gallery from "./page/Gallery";

function App() {

  return (
    <>
      <h1>Project Prism Showcase</h1>
      {/* <Gallery /> */}

      <Link href="/users/bob">Profile</Link>
      <Link href="/example">Example</Link>
      <Link href="/gallery">Gallery</Link>

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

        {/* Default route in a switch */}
        {/* <Route>404: No such page!</Route> */}
      </Switch>
    </>
  )
}

export default App
