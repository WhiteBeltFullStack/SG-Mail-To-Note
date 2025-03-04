import { OpenedMail } from './OpenedMail.jsx'

const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

export function MailListItem({
  mail,
  onRemoveMail,
  onChangeRead,
  onSaveAsNote,
  expended,
  isExpended,
  onStarred,
}) {
  function removeMail(ev, mailId) {
    ev.stopPropagation()
    if (mail.status === 'trash') {
      onRemoveMail(mailId, false)
    } else {
      onRemoveMail(mailId)
    }
  }

  function changRead(ev, mailId) {
    ev.stopPropagation()
    onChangeRead(mailId)
  }

  function saveAsNote(ev, mailId) {
    ev.stopPropagation()
    onSaveAsNote(mailId)
  }

  function starred(ev, mailId) {
    ev.stopPropagation()

    if (!mail.status || mail.status !== 'starred') {
      onStarred(mailId, true)
    } else {
      onStarred(mailId, !mail.status)
    }
  }

  function formatDate(date) {
    const now = new Date()
    const inputDate = new Date(date)
    const diffInMs = now - inputDate
    const diffInHours = diffInMs / (1000 * 60 * 60)

    switch (true) {
      case diffInHours < 24:
        return inputDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

      case inputDate.getFullYear() === now.getFullYear():
        return inputDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        })

      default:
        return inputDate.toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        })
    }
  }

  return (
    <React.Fragment>
      <section
        className={`mail-item ${mail.isRead ? 'mail-unread' : ' mail-read'}`}
        onClick={() => {
          expended(mail.id)
        }}
      >
        <div className="toggle-expand">
          <span onClick={ev => starred(ev, mail.id)}>
            <img src={`assets/img/${mail.isStarred ? 'yellow-star': 'starred'}.svg`} alt="" className="starred" />{' '}
          </span>
          <span className="mail-from">{mail.from}</span>
          <div className="subject-body">
            <span className="mail-subject">{mail.subject} - </span>
            <span className="mail-body">{mail.body}</span>
          </div>

          <div className="mail-list-time">{formatDate(mail.sentAt)}</div>

          <section className="mail-actions">
            <button
              className="btn btn-remove"
              onClick={ev => removeMail(ev, mail.id)}
            >
              <img src="assets\img\trash.svg" alt="" />
            </button>
            <button
              className="btn btn-read"
              onClick={ev => changRead(ev, mail.id)}
            >
              <img
                src={`assets/img/${
                  mail.isRead ? 'envelope-open' : 'envelope-close'
                }.svg`}
                alt=""
              />
            </button>
            <button
              className="btn btn-note"
              onClick={ev => saveAsNote(ev, mail.id)}
            >
              <img src="assets/img/note.svg" alt="" />
            </button>
          </section>
        </div>
      </section>
      {isExpended && <OpenedMail mail={mail} onChangeRead={onChangeRead} />}
    </React.Fragment>
  )
}
