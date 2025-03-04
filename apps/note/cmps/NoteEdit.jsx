import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteEdit({ selectedNote, onCloseEdit }) {

    const initialNote = {...selectedNote, info: {...selectedNote.info,txt: selectedNote.info.txt || '' } }
    
    const [noteToEdit, setNoteToEdit] = useState(initialNote)
    const contentEditableRef = useRef(null)

    useEffect(() => {
        function handleEscape(ev) {
            if (ev.key === "Escape") onSaveNote()
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [noteToEdit])

    useEffect(() => {
        if (contentEditableRef.current) {
            contentEditableRef.current.innerText = noteToEdit.info.txt
        }
    }, [])

    function handleChange(ev) {
        const value = ev.target.innerText
        setNoteToEdit(prevNote => ({ ...prevNote, info: { ...prevNote.info, txt: value } }))
    }

    function onSaveNote() {
        noteService.save(noteToEdit)
        .then(() => {
            showSuccessMsg("Note updated successfully")
            onCloseEdit()
        })
        .catch(err => console.log('err: ', err))
    }

    return (
        <div className="note-edit-modal" onClick={onSaveNote}>
            <div className="note-edit-main note-transition" onClick={(ev) => ev.stopPropagation()}>
                <div className="note-edit-content" contentEditable onInput={handleChange} ref={contentEditableRef}></div>
                <div className="note-edit-footer flex space-between justify-center align-center">
                    <div className="note-edit-icons">
                        <h1>Icons</h1>
                    </div>
                    <button className="note-close-btn" onClick={onSaveNote}>Close</button>
                </div>
            </div>
        </div>
    )
}