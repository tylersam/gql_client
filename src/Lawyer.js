import React from "react"
import { useQuery, gql } from "@apollo/client"

import CourtCases from "./CourtCases"
import ClientCases from "./ClientCases"
import { WON, LOST, ONGOING } from "./constants"
import { groupCasesByStatus } from "./utilities"

const GET_LAWYER = gql`
  query GetLawyer($id: ID!) {
    lawyer(id: $id) {
      id
      name
      cases {
        id
        caseDate
        status
        value
        client {
          id
          name
        }
        court {
          id
          name
          address
        }
      }
    }
  }
`

function Lawyer({ id }) {
  const { loading, error, data } = useQuery(GET_LAWYER, {
    variables: { id },
  })

  if (id === undefined) return "Click View Details to see Lawyer Case Details"
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  const { lawyer } = data
  const byStatus = groupCasesByStatus(lawyer.cases)

  return (
    <div>
      <div className="is-size-4 has-text-centered">{lawyer.name}</div>

      <nav className="level mt-3">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Cases</p>
            <p className="title">{lawyer.cases.length}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Ongoing</p>
            <p className="title">{byStatus[ONGOING].cases.length}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Won</p>
            <p className="title">{byStatus[WON].cases.length}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Lost</p>
            <p className="title">{byStatus[LOST].cases.length}</p>
          </div>
        </div>
      </nav>

      <CourtCases cases={lawyer.cases} />
      <ClientCases cases={lawyer.cases} />
    </div>
  )
}

export default Lawyer
