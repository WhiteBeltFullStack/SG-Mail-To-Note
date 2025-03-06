import { MailListItem } from './MailListItem.jsx'
import { MailSort } from './MailSort.jsx'
const { Link, useNavigate } = ReactRouterDOM
const { useState } = React

export function MailList({
  onStarred,
  mails,
  onRemoveMail,
  onChangeRead,
  onSaveAsNote,
  onSetSort,
  sort,
}) {
  const [currId, setCurrId] = useState(null)
  const navigate = useNavigate()

  function expended(expendedId, status) {
    console.log('status:', status)
    if (status === 'draft') {
      navigate(`/mail/compose/${expendedId}`)
      return
    }
    setCurrId(prevExpendedId =>
      prevExpendedId === expendedId ? null : expendedId
    )
  }

  return (
    <section className="mail-list-section">
      <header className="mail-list-header-filter">
        <MailSort onSetSort={onSetSort} sort={sort} />
      </header>

      <ul className="mail-list">
        {mails.map(mail => (
          <li className="mail-row" key={mail.id}>
            <MailListItem
              mail={mail}
              onRemoveMail={onRemoveMail}
              onChangeRead={onChangeRead}
              onSaveAsNote={onSaveAsNote}
              expended={expended}
              isExpended={currId === mail.id ? true : false}
              onStarred={onStarred}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
