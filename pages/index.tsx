import type { NextPage } from "next"
import { MXSHeader } from "../component/MXSHeader"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>mxs</title>
      </Head>
      <div className="gap-6 md:max-w-screen-md sm:max-w-screen-sm h-screen mx-auto">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mb-8">
            <MXSHeader className="mx-auto h-44" includeSocials />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

