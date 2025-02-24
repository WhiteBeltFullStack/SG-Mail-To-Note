import { useEffect } from 'react'
import { MailListItem } from './MailListItem.jsx'

const { useState } = React

export function MailList({ mails, onRemoveMail, onChangRead, onSaveAsNote }) {
  const [currId, setCurrId] = useState(null)

  function expended(expendedId) {
    console.log('press')

    setCurrId(prevExpendedId =>
      prevExpendedId === expendedId ? null : expendedId
    )
  }

  return (
    <section className="mail-list-section">
      <h1>Mail List</h1>
      <ul className="mail-list">
        {mails.map(mail => (
          <li className="mail-row" key={mail.id}>
            <MailListItem
              mail={mail}
              onRemoveMail={onRemoveMail}
              onChangRead={onChangRead}
              onSaveAsNote={onSaveAsNote}
              expended={expended}
              isExpended={currId === mail.id ? true : false}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
