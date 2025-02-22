export function NotePreview({ note }) {
    const {info: { txt },} = note

    return <div className="NotePreview">{txt}</div>
}
