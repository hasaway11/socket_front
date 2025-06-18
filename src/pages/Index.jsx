import { Link } from 'react-router-dom'

function Index() {
  return (
    <div>
      <ul>
        <li><Link to="/login">로그인(비로그인만 접근가능)</Link></li>
        <li><Link to="/private">private(로그인만 접근가능)</Link></li>
        <li><Link to="/user">user(유저만 접근가능)</Link></li>
        <li><Link to="/hospital">hospital(병원만 접근가능)</Link></li>
      </ul>
    </div>
  )
}

export default Index