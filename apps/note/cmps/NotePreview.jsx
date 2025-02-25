export function NotePreview({ note }) {
    const { txt } = note.info

    return (
        <div className="NotePreview">
            {txt}
        </div>
    )
}
