import { DemoDetailEmail } from '../apps/mail/cmps/DemoDetailEmail.jsx'
import { showSuccessMsg } from '../services/event-bus.service.js'

export function Home() {
  const demoMails = [
    {
      id: 'mail1',
      title: 'Welcome to GS-Mail!',
      createdAt: Date.now(),
      subject: 'Introduction from Sasha & George',
      body: `Hey there, 
      
      We are Sasha and George, and we’re here to help you manage your emails and notes! Think of us as your personal assistants in the digital world. Whether it’s keeping your inbox organized or helping you stay on top of your important notes, we’ve got you covered. 
      
      Feel free to reach out anytime – we’re just an email or a note away! Your productivity is our priority!
      
      Best regards,
      Sasha & George`,
      isRead: false,
      isStarred: true,
      sentAt: new Date().toISOString(),
      removedAt: null,
      from: 'Sasha & George <support@gs-mail.com>',
      to: 'Alexander&George@appsus.com',
    },
    {
      id: 'mail2',
      title: 'Your Daily Note Update!',
      createdAt: Date.now() - 86400000, // 1 day ago
      subject: 'Reminder: Your Notes Are Waiting!',
      body: `Hello,
      
      Just a quick reminder that your notes are ready for review. As always, we’re here to ensure that your notes stay organized and easily accessible. Whether it's a last-minute memo or a long-term project, feel free to reach out to us anytime you need assistance.
      
      We’re Sasha and George – your go-to team for everything emails and notes. 😊
      
      Best,
      Sasha & George`,
      isRead: false,
      isStarred: false,
      sentAt: new Date().toISOString(),
      removedAt: null,
      from: 'Sasha & George <support@gs-mail.com>',
      to: 'Alexander&George@appsus.com',
    },
  ]

  return (
    <section className="container home">
      <div className="box-container">
        <div className="box1">
          <DemoDetailEmail mail={demoMails[0]} />
        </div>
        <div className="box2">
          <DemoDetailEmail mail={demoMails[1]} />
        </div>
      </div>
    </section>
  )
}
