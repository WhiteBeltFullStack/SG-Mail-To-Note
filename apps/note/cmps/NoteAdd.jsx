import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteAdd({ loadNotes }) {

    const [noteTxt, setNoteTxt] = useState('')    

    function handleChange({ target }) {        
        setNoteTxt(target.value)
    }

    function onAddNote(ev) {
        ev.preventDefault()
        if (!noteTxt.trim()) return

        const newNote = noteService.getEmptyNote()
        newNote.info.txt = noteTxt
        
        noteService.save(newNote)
            .then(() => {            
                setNoteTxt('')
                loadNotes()
                showSuccessMsg(`Note added successfully!`)
            })
            .catch(err => console.log('err:', err))
            
    }

    return (
        <section className="NoteAdd flex">
            <form onSubmit={onAddNote}>
                <input type="text" placeholder="Take a note..." value={noteTxt} onChange={handleChange}/>
                <button className="note-close-btn">Add</button>
            </form>
        </section>
    )
}