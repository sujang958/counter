import "../styles/globals.css"
import type { AppProps } from "next/app"
import {DefaultSeo} from "next-seo"

const DEFAULT_SEO = {
  title: "Title",
  description: "Description",
};

const App = ({ Component, pageProps }: AppProps) => {
  return (<>
  <DefaultSeo {...DEFAULT_SEO} />
  <Component {...pageProps} /></>)
}
export default App