import { mailService } from '../services/mail.service.js'

import { showErrorMsg } from '..apps/mail/services/event-bus.service.js'
import { showSuccessMsg } from '..apps/mail/services/event-bus.service.js'

const { useParams, useNavigate } = ReactRouterDOM

const { useState, useEffect } = React
export function MailCompose() {
  const [mailCompose, setMailCompose] = useState(mailService.createEmptyMail())

  const navigate = useNavigate()
  const { mailId } = useParams()

  useEffect(() => {
    if (mailId) loadMail()
  }, [mailId])

  function loadMail() {
    mailService.get(mailId).then(setMailCompose)
  }

  function onSaveCompose(ev, action) {
    if (ev) ev.preventDefault()

    if ((action === 'draft' && !mailCompose.to) || !mailCompose.subject) {
      navigate('/mail')
      return
    }
    if (!mailCompose.to || !mailCompose.subject) {
      showErrorMsg(`No Subject or Adress`)
      return
    }
    console.log('action:', action)
    const updateMail = {
      ...mailCompose,
      sentAt: Date.now(),
      createdAt: Date.now(),
      status: action === 'send' ? 'sent' : 'draft',
    }

    if (action === 'send') {
      mailService
        .save(updateMail)
        .then(() => showSuccessMsg('Mail has successfully saved!'))
        .catch(() => showErrorMsg(`couldn't save Mail`))
    } else {
      mailService
        .save(updateMail)
        .then(() => showSuccessMsg('Mail moved to Draft!'))
        .catch(() => showErrorMsg(`couldn't save Mail`))
    }
    navigate('/mail')
  }

  function onHandleChange({ target }) {
    let { value, type, name: field } = target

    switch (type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setMailCompose(prevMailCompose => ({ ...prevMailCompose, [field]: value }))
  }

  return (
    <section className="compose-section">
      <header className="compose-header">
        <h3 className="compose-new-message">New Message</h3>
        <span
          className="compose-close"
          onClick={ev => onSaveCompose(ev, 'draft')}
        >
          X
        </span>
      </header>

      <form action="" onSubmit={ev => onSaveCompose(ev, 'send')}>
        <label htmlFor="to"></label>
        <input
          type="email"
          placeholder="To"
          id="to"
          value={mailCompose.to}
          onChange={onHandleChange}
          name="to"
        ></input>

        <label htmlFor="subject"></label>
        <input
          type="text"
          id="subject"
          value={mailCompose.subject}
          onChange={onHandleChange}
          name="subject"
          placeholder="Subject"
        />

        <textarea
          name="body"
          cols="30"
          rows="10"
          value={mailCompose.body}
          onChange={onHandleChange}
          maxLength={'200'}
        ></textarea>

        <button className="compose-send-btn">Send</button>
      </form>
    </section>
  )
}

//                                   to:  ' ?' ,
//                               subject: 'Miss you!',
//                               body: 'Would love to catch up sometimes',
//
