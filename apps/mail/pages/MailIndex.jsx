import { MailHeaderFilter } from '../cmps/MailHeaderFilter.jsx'
import { MailFolderFilter } from '../cmps/MailFolderFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
// import { MailDetails } from './apps/mail/pages/MailDetails.jsx'

const { link, useSearchParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { filterBy, sortBy } =
    mailService.getFilterFromSearchParams(searchParams)

  const [mails, setMails] = useState(null)
  const [filter, setFilter] = useState(filterBy)
  const [isReadCounter, setIsReadCounter] = useState(0)
  const [sort, setSort] = useState(sortBy)

  useEffect(() => {
    setSearchParams({ ...filter, ...sort })
    loadMails()
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

  function onRemoveMail(mailId) {
    console.log('Removed')
  }

  function onChangRead(mailId) {
    console.log('Read')
  }
  function onSaveAsNote(mailId) {
    console.log('send note')
  }
  function onStarred(mailId) {
    console.log('starred')
  }

  function onSetFilter(filter) {
    console.log('filter:',filter)
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

        <MailList
          mails={mails}
          onRemoveMail={onRemoveMail}
          onChangRead={onChangRead}
          onSaveAsNote={onSaveAsNote}
          onStarred={onStarred}
        />
      </section>
    </section>
  )
}
