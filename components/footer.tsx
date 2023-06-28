import styles from "./footer.module.css"
import packageJSON from "../package.json"

export default function Footer() {
  return (
    <footer className='footer footer-center p-4 text-base-content w-full bg-primary'>
      <hr />
      <ul className='w-full text-white'>
        
        <li className='mx-auto text-sm p-1'>
          <em>My Read List copyrigth &copy; {new Date().getFullYear()}.</em>
        </li>
      </ul>
    </footer>
  )
}
