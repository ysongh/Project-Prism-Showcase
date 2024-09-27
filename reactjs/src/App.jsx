import { Link, Route, Switch } from "wouter";

function App() {

  return (
    <>
      <h1>Project Prism Showcase</h1>
      <Link href="/users/bob">Profile</Link>
      <Switch>

        <Route path="/users/:name">
          {(params) => <>Hello, {params.name}!</>}
        </Route>

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
    </>
  )
}

export default App
