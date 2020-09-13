import React from "react"
import "./App.css"
import { ApolloProvider } from "@apollo/client"
import Lawyers from "./Lawyers"

function App({ client }) {
  return (
    <ApolloProvider client={client}>
      <div>
        <Lawyers />
      </div>
    </ApolloProvider>
  )
}

export default App
