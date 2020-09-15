import React from "react"
import { currency, groupCasesByClient } from "./utilities"

function ClientCases({ cases }) {
  const byClient = groupCasesByClient(cases)

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Client</th>
          <th>Cases #</th>
          <th>$ Won</th>
          <th>$ Lost</th>
          <th>Ongoing #</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(byClient).map(
          ({ client, cases, moneyWon, moneyLost, ongoingCount }) => {
            return (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{cases.length}</td>
                <td>{currency.format(moneyWon)}</td>
                <td>{currency.format(moneyLost)}</td>
                <td>{ongoingCount}</td>
              </tr>
            )
          }
        )}
      </tbody>
    </table>
  )
}

export default ClientCases
