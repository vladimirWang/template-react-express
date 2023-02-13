import React, {useState, useEffect} from 'react'
import Logo from '../img/logo.jpg'
function Footer() {
  const [num, setNum] = useState(0)

  useEffect(() => {
    
    return () => {}
  })
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>Made with ❤ and 
        <b>React.js</b>.
      </span>
    </footer>
  )
}
export default Footer;