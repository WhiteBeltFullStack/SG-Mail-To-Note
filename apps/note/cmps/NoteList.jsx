import { NotePreview } from './NotePreview.jsx'


export function NoteList({ notes, onSelectedNote }) {
    return (
        <ul className="NoteList">
            {notes.map(note =>
                <li key={note.id} 
                    style={{ backgroundColor: note.style.backgroundColor }}
                    onClick={() => onSelectedNote(note)}>
                    <NotePreview note={note} />
                </li>
            )}
        </ul>
    )
}
