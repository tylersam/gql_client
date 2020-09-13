import React from "react"
import { useQuery, gql } from "@apollo/client"

const GET_LAWYERS = gql`
  query GetLawyers {
    lawyers {
      id
      name
    }
  }
`

function Lawyers() {
  const { loading, error, data } = useQuery(GET_LAWYERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.lawyers.map(({ id, name }) => (
    <div key={id}>
      {name} ({id})
    </div>
  ))
}

export default Lawyers
