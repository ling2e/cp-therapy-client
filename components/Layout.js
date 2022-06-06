import Nav from "./Nav"
import Footer from "./Footer"
import { UserProvider } from "../scripts/Provider/UserProvider"

const Layout = ({children}) => {
  return (
    <UserProvider>
        <Nav/>
        <main>
            {children}
        </main>
        <Footer/>
    </UserProvider>
  )
}

export default Layout