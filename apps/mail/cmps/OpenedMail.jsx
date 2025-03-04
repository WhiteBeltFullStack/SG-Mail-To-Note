const { Link } = ReactRouterDOM

export function OpenedMail({ onChangeRead, mail }) {
  return (
    <section className="opened-mail">
      <div className="mail-header">
        <h2>{mail.title}</h2>
        <div className="mail-info">
          <span>From: {mail.from}</span>
          <span>To: {mail.to}</span>
          <span>Subject: {mail.subject}</span>
        </div>
      </div>

      <div className="mail-body">
        <p>{mail.body}</p>
      </div>

      <div className="mail-footer">
        <p>Sent At: {new Date(mail.sentAt).toLocaleString()}</p>
        {mail.isRead ? (
          <span className="read-status">Read</span>
        ) : (
          <span className="read-status">Unread</span>
        )}
        {mail.isStarred && <span className="starred-status">Starred</span>}

        <div className="preview-mail-btns">
          <Link to={`/mail/${mail.id}`}>
            <button onClick={() => onChangeRead(mail.id, true)}>
              Open E-Mail
            </button>
          </Link>
          {mail.status === 'draft' && (
            <Link to={`/mail/compose/${mail.id}`}>
              <button>Resume to draft edit</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
