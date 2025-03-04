import { MailHeaderFilter } from '../cmps/MailHeaderFilter.jsx'
import { MailFolderFilter } from '../cmps/MailFolderFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
// import { MailDetails } from './apps/mail/pages/MailDetails.jsx'

import { showErrorMsg } from '../services/event-bus.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { Link, useSearchParams, Outlet, useParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { filterBy, sortBy } =
    mailService.getFilterFromSearchParams(searchParams)

  const [mails, setMails] = useState(null)
  const [filter, setFilter] = useState(filterBy)
  const [isReadCounter, setIsReadCounter] = useState(0)
  const [sort, setSort] = useState(sortBy)
  const { mailId } = useParams()

  useEffect(() => {
    loadMails()
    setSearchParams({ ...filter, ...sort })
  }, [filter, sort])

  useEffect(() => {
    if (!mails) return
    const readCount = mails.reduce((count, mail) => {
      return count + (!mail.isRead ? 1 : 0)
    }, 0)
    setIsReadCounter(readCount)
  }, [mails])

  function loadMails() {
    mailService.query(filter).then(mails => setMails(mails))
  }

  function onRemoveMail(mailId, toTrash = true) {
    if (toTrash) {
      setMails(prevMails => {
        return prevMails.filter(mail => {
          console.log('entered return on onRemoveMail')
          if (mail.id === mailId) {
            const updatedMail = {
              ...mail,
              removedAt: Date.now(),
              status: 'trash',
            }

            mailService
              .save(updatedMail)
              .then(() => {
                console.log('then inside moving trash')
                showSuccessMsg('Mail move to Trash..')
              })
              .catch(() => showErrorMsg('Couldnt move to trash..'))
          } else {
            return mail
          }
        })
      })
    } else {
      mailService
        .remove(mailId)
        .then(() => {
          setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
          showSuccessMsg('mail has been finally removed!')
        })
        .catch(() => {
          showErrorMsg(`couldn't remove mail`)
        })
    }
  }

  function onChangeRead(mailId, isOpened = false) {
    setMails(prevMails => {
      return prevMails.map(mail => {
        if (mail.id !== mailId) return mail

        const updatedMail = { ...mail, isRead: isOpened ? true : !mail.isRead }

        mailService
          .save(updatedMail)
          .then(() => {
            if (!mail.isRead) showSuccessMsg('Mail is Read..')
          })
          .catch(() => showErrorMsg(`Mail isn't Read..`))

        return updatedMail
      })
    })
  }

  function onSaveAsNote(mailId) {
    console.log('send note')
  }

  function onStarred(mailId, moveToStarred) {
    setMails(prevMails => {
      if (filter.status === 'inbox') {
        return prevMails.map(mail => {
          if (mail.id === mailId) {
            const updatedMail = {
              ...mail,
              isStarred: !mail.isStarred,
              status: mail.isStarred ? 'inbox' : 'starred',
            }
            console.log('moveToStarred:', moveToStarred)
            mailService
              .save(updatedMail)
              .then(() => {
                showSuccessMsg(`Mail moved to ${updatedMail.status}..`)
              })
              .catch(() =>
                showErrorMsg(`Couldn't move to ${updatedMail.status}..`)
              )

            return updatedMail
          }
          return mail
        })
      } else if (filter.status === 'starred') {
        return prevMails.filter(mail => {
          if (mail.id === mailId) {
            const updatedMail = {
              ...mail,
              isStarred: false,
              status: 'inbox',
            }
            mailService
              .save(updatedMail)
              .then(() => {
                showSuccessMsg('Mail moved to Inbox..')
              })
              .catch(() => showErrorMsg("Couldn't move to Inbox.."))
            return false
          }
          return true
        })
      }

      return prevMails
    })
  }

  function onSetFilter(filter) {
    setFilter(filter)
  }

  if (!mails) return <p>Loading Mails ...</p>
  return (
    <section className="container-index">
      {/* Filter by search */}
      <MailHeaderFilter onSetFilter={onSetFilter} filter={filter} />

      {/* Filter by folder index/trash/draft/sent */}
      <section className="list-folders-container">
        <MailFolderFilter
          onSetFilter={onSetFilter}
          filter={filter}
          isReadCounter={isReadCounter}
        />

        {!mailId && (
          <MailList
            mails={mails}
            onRemoveMail={onRemoveMail}
            onChangeRead={onChangeRead}
            onSaveAsNote={onSaveAsNote}
            onStarred={onStarred}
          />
        )}

        <Outlet />
      </section>
    </section>
  )
}
