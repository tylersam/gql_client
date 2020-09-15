import React from "react"
import { useQuery, gql } from "@apollo/client"
import { WON, LOST, ONGOING } from "./constants"
import { currency, groupCasesByStatus } from "./utilities"

const GET_LAWYERS = gql`
  query GetLawyers {
    lawyers {
      id
      name
      cases {
        id
        caseDate
        court {
          id
          name
        }
        status
        value
      }
    }
  }
`

const lawyerRows = (lawyers, selectLawyer, selectedLawyerId) => {
  return lawyers.map(({ id, name, cases }) => {
    let byStatus = groupCasesByStatus(cases)

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{cases.length}</td>
        <td>{byStatus[ONGOING].cases.length}</td>
        <td>{byStatus[WON].cases.length}</td>
        <td>{byStatus[LOST].cases.length}</td>
        <td>{currency.format(byStatus[WON].value)}</td>
        <td>{currency.format(byStatus[LOST].value)}</td>
        <td>
          {selectedLawyerId == id ? null : (
            <button
              className="button is-small"
              onClick={() => selectLawyer(id)}
            >
              View Details
            </button>
          )}
        </td>
      </tr>
    )
  })
}

function Lawyers({ selectLawyer, selectedLawyerId }) {
  const { loading, error, data } = useQuery(GET_LAWYERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Cases</th>
          <th>{ONGOING}</th>
          <th>{WON}</th>
          <th>{LOST}</th>
          <th>Earned</th>
          <th>Lost</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{lawyerRows(data.lawyers, selectLawyer, selectedLawyerId)}</tbody>
    </table>
  )
}

export default Lawyers
