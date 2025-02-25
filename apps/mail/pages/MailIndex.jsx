import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'

const { link, useSearchParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { filterBy, sortBy } =
    mailService.getFilterFromSearchParams(searchParams)

  const [mails, setMails] = useState(null)
  const [filter, setFilter] = useState(filterBy)
  const [sort, setSort] = useState(sortBy)

  useEffect(() => {
    setSearchParams({ ...filter, ...sort })
    loadMails()
  }, [filter, sort])


  function loadMails() {
    mailService.query(filter).then((mails) => setMails(mails))
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

  if (!mails) return <p>Loading Mails ...</p>
  return (
    <section className="container">
      {/* Filter by folder index/trash/draft/sent */}
      {/* Filter by search */}
      <MailList
        mails={mails}
        onRemoveMail={onRemoveMail}
        onChangRead={onChangRead}
        onSaveAsNote={onSaveAsNote}
      />
    </section>
  )
}
