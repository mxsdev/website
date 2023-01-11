import type { NextPage } from "next"
import { MXSHeader } from "../component/MXSHeader"
import Head from "next/head"
import { ProjectCards } from "../component/projects/ProjectCards"
import DyadicImage from "../public/projects/dyadic.png"
import TsExplorerImage from "../public/projects/type_explorer.png"
import PonychopperImage from "../public/projects/ponychopper.png"
import GraphDrawingImage from "../public/projects/graphdrawing.png"
import { getTailwindConfig } from "../util/tailwind"

const Home: NextPage = () => {
  const tailwindConfig = getTailwindConfig()
  
  return (
    <>
      <Head>
        <title>mxs</title>
      </Head>
      <div className="gap-6 md:max-w-screen-md sm:max-w-screen-sm h-screen mt-4 sm:mt-6 md:mt-10 mx-auto">
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <MXSHeader className="mx-auto h-44" includeSocials />
          </div>

        <ProjectCards 
            DyadicImage={DyadicImage}
            TsExplorerImage={TsExplorerImage}
            PonychopperImage={PonychopperImage}
            GraphDrawingImage={GraphDrawingImage}

            tailwindConfig={tailwindConfig}
          />
        </div>
      </div>
    </>
  )
}

export default Home

