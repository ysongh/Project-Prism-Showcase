import { useState } from 'react';
import { Route, Switch } from "wouter";

import Navbar from "./components/Navbar";
import Example from "./page/Example";
import Gallery from "./page/Gallery";
import Landing from "./page/Landing";
import CreateProject from "./page/CreateProject";

function App() {
  const [ethAddress, setETHAddress] = useState('');

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
          <Gallery ethAddress={ethAddress} />
        </Route>

        <Route path="/gallery/item/:id">
          <Gallery ethAddress={ethAddress} />
        </Route>

        <Route path="/create-project">
          <CreateProject />
        </Route>

        <Route path="/">
          <Landing setETHAddress={setETHAddress} />
        </Route>

        {/* Default route in a switch */}
        {/* <Route>404: No such page!</Route> */}
      </Switch>
    </>
  )
}

export default App
