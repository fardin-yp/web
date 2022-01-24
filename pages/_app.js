import '../styles/globals.css';
import '../styles/home.css';
import '../styles/routes.css';
import '../styles/responsive.css';
import { AuthContextProvider } from '../helpers/context/authContext'

function MyApp({ Component, pageProps }) {
  return <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
}

export default MyApp
