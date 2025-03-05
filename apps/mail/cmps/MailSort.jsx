const { useState, useEffect } = React
export function MailSort({ onSetSort, sort }) {
  const [sortEdit, setSortEdit] = useState({ ...sort })

  useEffect(() => {
    onSetSort(sortEdit)
  }, [sortEdit])

  function handleSortChange(ev) {
    const { name, value } = ev.target
    setSortEdit(prevSort => ({ ...prevSort, [name]: value }))
  }

  function onChangeDir(ev) {
    const { checked } = ev.target
    setSortEdit(prevSort => ({ ...prevSort, order: checked ? -1 : 1 }))
  }

  return (
    <section className="mail-sorting-cmp">
      <select
        className="mail-sort-by"
        name="field"
        id="sort-by"
        onChange={handleSortChange}
        value={sortEdit.field}
      >
        <option value="">Sort-By</option>
        <option value="from">A-z</option>
        <option value="sentAt">Date</option>
        <option value="isStarred">Starred</option>
        <option value="isRead">Read</option>
      </select>
      <label className="order-dir" htmlFor="order">
        ⇅
      </label>{' '}
      {/* ⇅ */}
      <input
        type="checkbox"
        className="mail-dir"
        name="order"
        id="order"
        checked={sortEdit.order === -1}
        onChange={onChangeDir}
      />
    </section>
  )
}

//      id: utilService.makeId(),
//       title: 'Alexander & George',
//       createdAt: Date.now(),
//       subject: '',
//       body: '',
//       isRead: false,
//       isStarred: false,
//       sentAt: null,
//       removedAt: null,
//       from: 'Alexander&George@appsus.com',
//       to: '',
