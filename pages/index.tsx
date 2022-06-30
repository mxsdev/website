import type { NextPage } from "next"
import { Card } from "../component/Card"
import { MXSHeader } from "../component/MXSHeader"
import { SocialLinks } from "../component/SocialLinks"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>mxs</title>
      </Head>
      <div className="flex-col gap-6 flex justify-center w-full h-full">
        <div>
          <MXSHeader />
          <SocialLinks />
        </div>

        <div className="w-full flex justify-center bg-none mb-16">
          <a href="http://github.com/mxsdev/dotfiles">
            <Card>
              <span className="font-mono leading-none font-bold">dotfiles</span>
            </Card>
          </a>
        </div>
      </div>
    </>
  )
}

export default Home
