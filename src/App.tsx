import { Routing } from "routing"
import { BrowserRouter as Router } from "react-router-dom"

import { Navbar } from "components/Navbar"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="root-container">
        <Routing />
      </div>
    </Router>
  )
}

export default App
