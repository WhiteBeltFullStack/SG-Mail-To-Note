export function NotePreview({ note }) {
    const { txt } = note.info

    return (
        <div className="note-preview note-transition">
            {txt}
        </div>
    )
}
