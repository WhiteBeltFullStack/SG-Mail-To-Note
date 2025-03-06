const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailFolderFilter({
  toggleMenu,
  onSetFilter,
  filter,
  isReadCounter,
}) {
  console.log('toggleMenu:', toggleMenu)
  const [filterToEdit, setFilterToEdit] = useState({ ...(filter || 'inbox') })
  const [readCount, setReadCount] = useState(isReadCounter)

  const navigate = useNavigate()

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
    <section className={`folders-container ${toggleMenu ? 'collapse' : ''}`}>
      <Link to="/mail/compose">
        {' '}
        <div className={`compose-container ${toggleMenu ? 'collapse' : ''}`}>
          <button className="compose-btn">
            {' '}
            <img src="assets/img/pencil.svg" alt="" />{' '}
            <span className={`compose-text ${toggleMenu ? 'collapse' : ''}`}>
              Compose
            </span>
          </button>
        </div>
      </Link>
      <ul>
        {folders.map(folder => (
          <li
            key={folder}
            className={filterToEdit.status === folder ? 'focus' : ''}
            onClick={ev => onHandleClick(ev, folder)}
          >
            <img src={`assets/img/${folder}.svg`} alt="Inbox" />
            {
              <span className={`folder-name ${toggleMenu ? 'collapse' : ''}`}>
                {folder.charAt(0).toUpperCase() + folder.slice(1)}{' '}
                {/* IF TOGGLE TRUE NOT EXIST */}
                {folder === 'inbox' && <span> ({readCount}) </span>}
              </span>
            }
          </li>
        ))}
      </ul>
    </section>
  )
}
