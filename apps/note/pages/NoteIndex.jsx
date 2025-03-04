import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { noteService } from '../services/note.service.js'

import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [selectedNote, setSelectedNote] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => {
                setNotes(notes)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSelectedNote(note) {
        setSelectedNote(note)
    }

    function closeEdit() {
        loadNotes()
        setSelectedNote(null)
    }
    

    if (!notes) return <div>Loading notes...</div>
    
    return (
        <section className="NoteIndex container">
            <NoteAdd loadNotes={loadNotes} />
            <NoteFilter />
            <NoteList notes={notes} onSelectedNote={onSelectedNote} />
            {selectedNote && <NoteEdit selectedNote={selectedNote} onCloseEdit={closeEdit} />}
        </section>
    )
}
