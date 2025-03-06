import { User } from './User.jsx'

const { useState, useEffect } = React

export function MailHeaderFilter({ onSetFilter, filter ,
  onSetToggleMenu}) {
  const [editFilter, setEditFilter] = useState({ ...filter })

  useEffect(() => {
    onSetFilter({...editFilter,status:filter.status})
  }, [editFilter])

  function onHandleChange(ev) {
    let { value, name, type } = ev.target

    setEditFilter(prevFilter => ({ ...prevFilter, [name]: value,status:prevFilter.status }))
  }

  function onSubmitForm(ev) {
    ev.preventDefault()
    onSetFilter(editFilter)
  }

  return (
    <header className="search-filter-header">
      <section className='gmail-logo-hamburger'>
        <button className='collapse-btn' onClick={onSetToggleMenu}><img src="assets/img/hamburger.svg" alt="" /></button>
        <div className='logo'>GS-Mail</div>
        </section>
     

      <section className="search-filter">
        <form action=""  onSubmit={onSubmitForm}>
          <button type="submit" className="search-btn">
            <img className="search-btn-svg" src="assets/img/search-svg.svg" alt="" />
          </button>
          <label htmlFor="search-input">
            
          </label>
          <input
            type="text"
            id="search-input"
            name="txt"
            onChange={onHandleChange}
            value={editFilter.txt || ''}
            placeholder="Search"
          />
        </form>
      </section>

      <section className="logged-acc">
        <User />
      </section>


    </header>
  )
}
