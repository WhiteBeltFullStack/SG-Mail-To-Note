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
  loggedUser,
}

const MAIL_KEY = 'mailDB'
let gMails = []

_createMails()

function loggedUser() {
  const loggedInUser = {
    email: 'Alexander&George@appsus.com',
    fullname: 'George & Sasha ',
  }
  return loggedInUser
}

function getDefaultFilterAndSorting() {
  const filterAndSort = {
    filterBy: {
      status: 'inbox', //inbox/sent/draft/trash
      txt: '',
      isRead: false,
      isStarred: false,
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
  return storageService.query(MAIL_KEY).then(mails => {
    if (!mails || !mails.length) {
      mails = gMails
      // utilService.saveToStorage(mails, MAIL_KEY)
    }

    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      mails = mails.filter(
        mail =>
          regExp.test(mail.body) ||
          regExp.test(mail.title) ||
          regExp.test(mail.subject)
      )
    }

    // if (!filterBy.isRead) {
    //   mails = mails.filter(mail => mail.isRead === filterBy.isRead) // NOT NEEDED AT THE MOMENT MAYBE LATER
    // }
    if (filterBy.status) {
      const regExp = new RegExp(filterBy.status, 'i')
      mails = mails.filter(mail => regExp.test(mail.status || 'inbox'))
    }

    if (!filterBy.isStarred) {
      mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
    }

    if (filterBy.lables.length) {
      mails = mails.filter(mail =>
        mail.lables.some(lable => filterBy.lables.includes(lable))
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
          return (value1 - value2) * (order === 1 ? 1 : -1)
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
      _createMail(
        'Meeting Reminder',
        'alexander@example.com',
        "Don't forget about the meeting tomorrow at 10 AM. We will be discussing the upcoming projects and setting some deadlines for the team."
      ),
      _createMail(
        'Important Update',
        'george@example.com',
        'Please review the latest update on the project. The deadlines have shifted, and we need to reassess our progress.'
      ),
      _createMail(
        'Lunch Plans',
        'julia@example.com',
        "Let's grab lunch at 1 PM today. We can meet at the usual spot, or let me know if you want to try something new."
      ),
      _createMail(
        'Weekend Trip',
        'luke@example.com',
        "Are you coming to the weekend trip? It's going to be a fun time with lots of outdoor activities planned."
      ),
      _createMail(
        'Project Deadline',
        'anna@example.com',
        'The project deadline is fast approaching. Please update me on your progress and let me know if you need any help.'
      ),
      _createMail(
        'New Job Opening',
        'mike@example.com',
        "Check out this new job opening that might interest you. If you're interested, let me know, and I can forward the details."
      ),
      _createMail(
        'Team Outing',
        'sarah@example.com',
        'We have a team outing planned for next week. Be sure to join! There will be games, food, and fun activities.'
      ),
      _createMail(
        'Code Review',
        'dan@example.com',
        'Your code review is scheduled for this afternoon. Please make sure to go over your code one last time before the review.'
      ),
      _createMail(
        'Conference Invitation',
        'emma@example.com',
        "You're invited to the annual conference next month. It will feature various industry experts and exciting workshops."
      ),
      _createMail(
        'Thank You!',
        'liam@example.com',
        'Thank you for your help on the recent project. Your input and hard work made a huge difference.'
      ),
    ]

    utilService.saveToStorage(MAIL_KEY, mails)
    gMails = mails
  }
}

function _createMail(subject, from, body) {
  const mail = {
    id: utilService.makeId(),
    title: subject,
    createdAt: Date.now(),
    subject,
    body,
    isRead: false,
    isStarred: false,
    sentAt: _getRandomTimestamp(),
    removedAt: null,
    from,
    to: 'Alexander&George@appsus.com',
  }
  return mail
}

function _getRandomTimestamp() {
  const now = Date.now()
  const pastTime = now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000) // Random timestamp from the last 30 days
  return pastTime
}

// function _createMails() {
//   const storageMails = utilService.loadFromStorage(MAIL_KEY)
//   if (!storageMails || storageMails.length === 0) {
//     const mails = [
//       _createMail('Puki', 'puki@puki.com'),
//       _createMail('Kuki', 'kuki@kuki.com'),
//       _createMail('Tuki', 'tuki@tuki.com'),
//     ]

//     utilService.saveToStorage(MAIL_KEY, mails)
//     gMails = mails
//   }
// }

// function _createMail(title = 'Puki', from = 'puki@puki.com') {
//   const mail = {
//     id: utilService.makeId(),
//     title,
//     createdAt: Date.now(),
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     isStarred: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from,
//     to: 'Alexander&George@appsus.com',
//   }
//   return mail
// }

function createEmptyMail() {
  const mail = {
    // id: utilService.makeId(),
    title: 'Alexander & George',
    createdAt: Date.now(),
    subject: '',
    body: '',
    isRead: false,
    isStarred: false,
    sentAt: null,
    removedAt: null,
    from: 'Alexander&George@appsus.com',
    to: '',
  }
  return mail
}

function getFilterFromSearchParams(searchParams) {
  const defaultSettings = getDefaultFilterAndSorting()
  const filterBy = {}
  const sortBy = {}

  for (const field in defaultSettings.filterBy) {
    filterBy[field] = searchParams.get(field) || defaultSettings.filterBy[field]
  }

  for (const field in defaultSettings.sortBy) {
    sortBy[field] = searchParams.get(field) || defaultSettings.sortBy[field]
  }

  return { filterBy, sortBy }
}
