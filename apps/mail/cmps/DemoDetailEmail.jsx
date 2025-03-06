const { Link } = ReactRouterDOM

export function DemoDetailEmail({ mail }) {
  return (
    <section className="demo-mail-details">
      <header className="demo-mail-header">
        <h2 className="demo-mail-title">{mail.title}</h2>
        <div className="demo-mail-actions">
          {/* <button>Reply</button>
                <button>Delete</button> */}
        </div>
      </header>

      <div className="demo-mail-info">
        <span className="demo-mail-from">
          <strong>{mail.from}</strong>
        </span>
        <span className="demo-mail-to">To: {mail.to}</span>
        <span className="demo-mail-date">
          {new Date(mail.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="demo-mail-body">
        <h3 className="demo-mail-subject">{mail.subject}</h3>
        <p>{mail.body}</p>
      </div>
      <footer className="visit-footer">
        {mail.id === 'mail1' ? (
          <Link to="/mail">
            <button className="visit-btn">Visit Me</button>{' '}
          </Link>
        ) : (
          <Link to="/note">
            <button className="visit-btn">Visit Me</button>{' '}
          </Link>
        )}
      </footer>
    </section>
  )
}
