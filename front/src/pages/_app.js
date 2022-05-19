import '../styles/global.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head'
import SSRProvider from 'react-bootstrap/SSRProvider';
import wrapper from '../store/configureStore';




function App({ Component, pageProps }) {

    return (
      <>
        <Head>
          <title>커뮤니티</title>
          <meta charSet='utf-8' />
        </Head>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </>
    )
  }

export default wrapper.withRedux(App);
