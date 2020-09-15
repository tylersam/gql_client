import React, { useState } from "react"
import "./App.css"
import Lawyers from "./Lawyers"
import Lawyer from "./Lawyer"

function App() {
  const [lawyerId, setLawyerId] = useState(0)

  return (
    <div className="columns">
      <div className="column">
        <Lawyers selectLawyer={setLawyerId} selectedLawyerId={lawyerId} />
      </div>

      <div className="column">
        <Lawyer id={lawyerId} />
      </div>
    </div>
  )
}

export default App
