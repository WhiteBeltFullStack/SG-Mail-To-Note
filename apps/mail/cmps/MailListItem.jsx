import { OpenedMail } from './OpenedMail.jsx'

const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

export function MailListItem({
  mail,
  onRemoveMail,
  onChangRead,
  onSaveAsNote,
  expended,
  isExpended,
}) {
  //   const [isExpended, setIsExpended] = useState(false)
  const [isRead, setIsRead] = useState(false)
  const [currId, setCurrId] = useState(null)

  function removeMail(ev, mailId) {
    ev.stopPropagation()

    onRemoveMail(mailId)
  }

  function changRead(ev, mailId) {
    ev.stopPropagation()
    onChangRead(mailId)
  }

  function saveAsNote(ev, mailId) {
    ev.stopPropagation()
    onSaveAsNote(mailId)
  }

  return (
    <React.Fragment>
      <section
        className="mail-item "
        onClick={() => {
          expended(mail.id)
        }}
      >
        <div className="toggle-expand">
          <span>&#9733; </span>
          <span className="mail-from">{mail.from}</span>
          <div className="subject-body"></div>
          <span className="mail-subject">{mail.subject} - </span>
          <span className="mail-body">{mail.body}</span>

          <section className="mail-actions">
            <button
              className="btn btn-remove"
              onClick={ev => removeMail(ev, mail.id)}
            >
              x
            </button>
            <button
              className="btn btn-read"
              onClick={ev => changRead(ev, mail.id)}
            >
              {' '}
              r{' '}
            </button>
            <button
              className="btn btn-note"
              onClick={ev => saveAsNote(ev, mail.id)}
            >
              {' '}
              n{' '}
            </button>
          </section>
        </div>
      </section>
      {isExpended && <OpenedMail mail={mail} />}
    </React.Fragment>
  )
}
