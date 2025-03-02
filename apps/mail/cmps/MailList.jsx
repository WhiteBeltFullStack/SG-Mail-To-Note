import { MailListItem } from './MailListItem.jsx'

const { useState } = React

export function MailList({ onStarred,mails, onRemoveMail, onChangeRead, onSaveAsNote }) {
  const [currId, setCurrId] = useState(null)
  
  function expended(expendedId) {
    
    setCurrId(prevExpendedId =>
      prevExpendedId === expendedId ? null : expendedId
    )
  }
  
  return (
   
    <section className="mail-list-section">
      {console.log('list rendered',mails) }
     
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

