const { useState, useEffect } = React

export function MailFolderFilter({ onSetFilter, filter, isReadCounter }) {
  const [filterToEdit, setFilterToEdit] = useState({ ...(filter || 'inbox') })
  const [readCount, setReadCount] = useState(isReadCounter)

  function onHandleClick(ev, folder) {
    setFilterToEdit(prevFilter => {
      if (prevFilter.status !== folder) {
        return { ...prevFilter, status: folder }
      }
      return prevFilter
    })
  }

  useEffect(() => {
    if (filter.status === 'inbox') {
      setReadCount(isReadCounter)
    }
  }, [filter.status, isReadCounter])

  const folders = ['inbox', 'sent', 'draft', 'starred', 'trash']

  useEffect(() => {
    onSetFilter(filterToEdit)
  }, [filterToEdit.status])

  return (
    <section className="folders-container">
      <div className="compose-container">
        <img src="assets/img/pencil.svg" alt="" />
        <span> Compose</span>
      </div>
      <ul>
        {folders.map(folder => (
          <li
            key={folder}
            className={filterToEdit.status === folder ? 'focus' : ''}
            onClick={ev => onHandleClick(ev, folder)}
          >
            <img src={`assets/img/${folder}.svg`} alt="Inbox" />
            {
              <span>
                {folder.charAt(0).toUpperCase() + folder.slice(1)}
                {folder === 'inbox' && <span> ({readCount}) </span>}
              </span>
            }
          </li>
        ))}
      </ul>
    </section>
  )
}
