import { showErrorMsg } from '../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailDetails() {
  const [mail, setMail] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadMail()
  }, [params.mailId])

  function loadMail() {
    mailService
      .get(params.mailId)
      .then(setMail)
      .catch(err => {
        showErrorMsg('Couldnt get mail')
        navigate('/mail')
      })
  }

  if (!mail) return 'Loading Mail...'
  return (
    <section className="mail-details">
      <header className="mail-header">
        <h2 className="mail-title">{mail.title}</h2>
        <div className="mail-actions">
          {/* <button>Reply</button>
            <button>Delete</button> */}
        </div>
      </header>

      <div className="mail-info">
        <span className="mail-from">
          <strong>{mail.from}</strong>
        </span>
        <span className="mail-to">To: {mail.to}</span>
        <span className="mail-date">
          {new Date(mail.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="mail-body">
        <h3 className="mail-subject">{mail.subject}</h3>
        <p>{mail.body}</p>
      </div>

      <footer className="mail-footer">
        <Link to="/mail">
          <button>Back</button>
        </Link>

        {mail.status === 'draft' && (
          <Link to={`/mail/compose/${mail.id}`}>
            <button>Resume to draft edit</button>
          </Link>
        )}
      </footer>
    </section>
  )
}
