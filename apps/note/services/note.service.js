import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
    query,
    add,
    getEmptyNote,
}

window.ns = noteService

const NOTE_KEY = 'noteDB'
_createDemoNotes()


function query() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            return notes
        })
}

function add(newNote) {
    return storageService.post(NOTE_KEY, newNote)
}

function getEmptyNote() {
    let note = {
        id: '',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff',
        },
        info: {
            txt: 'New note',
        },
    }

    return note
}

function _createDemoNotes() {    
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#fff',
                },
                info: {
                    txt: 'Fullstack Me Baby!',
                },
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me',
                },
                style: {
                    backgroundColor: '#fff',
                },
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 },
                    ],
                },
                style: {
                    backgroundColor: '#fff',
                },
            },
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}