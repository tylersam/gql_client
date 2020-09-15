import React from "react"
import { groupCasesByCourt } from "./utilities"

function CourtCases({ cases }) {
  const byCourt = groupCasesByCourt(cases)

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Court</th>
          <th>Cases</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(byCourt).map(({ court, cases }) => {
          return (
            <tr key={court.id}>
              <td>{court.name}</td>
              <td>{cases.length}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CourtCases
