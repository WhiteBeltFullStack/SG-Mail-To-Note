import { mailService } from "../services/mail.service.js";

export function User(){
    const user= mailService.loggedUser()

    // const initials = user.fullname
    // .match(/\b[A-Z]/g) 
    // .join('') 

    const initials = user.fullname
    .split(" & ")
    .map(name => name[0])
    .join('')

    return (
        <section className="user-section">
       <span className="user">{initials}</span>
        </section>
    )
       
}