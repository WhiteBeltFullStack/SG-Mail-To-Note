import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

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

    if (!notes) return <div>Loading notes...</div>
    
    return (
        <section className="NoteIndex container">
            <NoteAdd loadNotes={loadNotes}/>
            <NoteFilter />
            <NoteList notes={notes} />
        </section>
    )
}
