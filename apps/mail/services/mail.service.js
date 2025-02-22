// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

// const INBOX_KEY = 'inboxDB'
// const SENT_KEY = 'sentDB'
// const DRAFT_KEY = 'draftDB'
// const TRASH_KEY = 'trashDB'

export const mailService = {
  query,
  get,
  remove,
  save,
  createEmptyMail,
  getDefaultFilterAndSorting,
  getFilterFromSearchParams,
}

const MAIL_KEY = 'mailDB'

const loggedInUser = {
  email: 'Alexander&George@appsus.com',
  fullname: 'George & Sasha ',
}
_createMails()

let gMails = []

function getDefaultFilterAndSorting() {
  const filterAndSort = {
    filterBy: {
      status: 'inbox', //inbox/sent/draft/trash
      txt: 'Alexander',
      isRead: true,
      isStarred: true,
      lables: [],
    },
    sortBy: {
      field: '',
      order: 1,
    },
  }
  return filterAndSort
}

function query(filterBy = {}, sortBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (!mails || !mails.length) {
      mails = gMails
    }

    if (filterBy.status) {
      const regExp = new RegExp(filterBy.status, 'i')
      mails = mails.filter((mail) => regExp.test(mail.status))
    }

    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      mails = mails.filter(
        (mail) => regExp.test(mail.body) || regExp.test(mail.subject)
      )
    }

    if (filterBy.isRead) {
      mails = mails.filter((mail) => mail.isRead === filterBy.isRead)
    }
    if (filterBy.isStarred) {
      mails = mails.filter((mail) => mail.isStarred === filterBy.isStarred)
    }
    if (filterBy.lables.length) {
      mails = mails.filter((mail) =>
        mail.lables.some((lable) => filterBy.lables.includes(lable))
      )
    }

    if (sortBy.field) {
      const { field, order } = sortBy

      mails = mails.sort((mail1, mail2) => {
        const value1 = mail1[field]
        const value2 = mail2[field]

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          return value1.localeCompare(value2) * (order === 1 ? 1 : -1)
        } else if (typeof value1 === 'number' && typeof value2 === 'number') {
          return (value1 - value2) * (order === 1) ? 1 : -1
        }
        return 0
      })
    }

    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function _createMails() {
  const storageMails = utilService.loadFromStorage(MAIL_KEY)
  if (!storageMails || storageMails.length === 0) {
    const mails = [
      _createMail((title = 'Puki'), (from = 'puki@puki.com')),
      _createMail((title = 'Kuki'), (from = 'kuki@kuki.com')),
      _createMail((title = 'Tuki'), (from = 'tuki@tuki.com')),
    ]

    utilService.saveToStorage(mails, MAIL_KEY)
    gMails = mails
  }
}

function _createMail(title, from) {
  const mail = {
    id: utilService.makeId(),
    title,
    createdAt: Date.now(),
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null,
    from,
    to: 'Alexander&George@appsus.com',
  }
}

function createEmptyMail() {
  const mail = {
    id: utilService.makeId(),
    title: '',
    createdAt: Date.now(),
    subject: '',
    body: '',
    isRead: false,
    isStarred: false,
    sentAt: null,
    removedAt: null,
    from: '',
    to: '',
  }
  return mail
}


function getFilterFromSearchParams(searchParams){

    const defaultFilter = getDefaultFilterAndSorting()
    const filterBy = {}
    for(const field in defaultFilter){
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    
}