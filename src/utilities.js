import { WON, LOST, ONGOING } from "./constants"

export const groupCasesByStatus = (cases) => {
  let byStatus = {
    [WON]: { cases: [], value: 0 },
    [LOST]: { cases: [], value: 0 },
    [ONGOING]: { cases: [], value: 0 },
  }

  cases.forEach((c) => {
    byStatus[c.status].cases.push(c)
    byStatus[c.status].value += c.value
  })

  return byStatus
}

export const groupCasesByCourt = (cases) => {
  let byCourt = {}

  cases.forEach((c) => {
    if (byCourt[c.court.id]) {
      byCourt[c.court.id].cases.push(c)
    } else {
      byCourt[c.court.id] = { court: c.court, cases: [c] }
    }
  })

  return byCourt
}

export const groupCasesByClient = (cases) => {
  let byClient = {}

  cases.forEach((c) => {
    if (!byClient[c.client.id]) {
      byClient[c.client.id] = {
        client: c.client,
        cases: [],
        moneyWon: 0,
        moneyLost: 0,
        ongoingCount: 0,
      }
    }

    let clientTotal = byClient[c.client.id]
    clientTotal.cases.push(c)

    if (c.status === WON) {
      clientTotal.moneyWon += c.value
    } else if (c.status === LOST) {
      clientTotal.moneyLost -= c.value
    } else if (c.status === ONGOING) {
      clientTotal.ongoingCount += 1
    }
  })

  return byClient
}

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
