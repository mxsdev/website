"use client"

import React, { FC } from "react"
import { ProjectCard } from "./ProjectCard"
import Masonry from "react-masonry-css"
import { StaticImageData } from "next/image"
import { TailwindConfig } from "../../util/tailwind"
import dynamic from "next/dynamic"

type Props = {
    DyadicImage: StaticImageData
    TsExplorerImage: StaticImageData
    PonychopperImage: StaticImageData
    GraphDrawingImage: StaticImageData

    tailwindConfig: TailwindConfig
}

const ProjectCardsInternal: FC<Props> = ({ DyadicImage, GraphDrawingImage, PonychopperImage, TsExplorerImage, tailwindConfig: { screens } }) => {
    return (
        <Masonry
            className="max-w-[300px] sm:max-w-full flex gap-6 [&>div>a>*]:mb-6 mx-auto"
            breakpointCols={{
                default: 3,
                [screens.lg]: 3,
                [screens.md]: 2,
                [screens.sm]: 1,
            }}
          >
            <ProjectCard 
              alt="dyadic"

              img={DyadicImage}

              title="Dyadic"
              description="The theoretical platform for learning theoretical math"

              imageClassName={"scale-[215%] translate-x-[-5%] translate-y-[15%] group-hover:translate-y-[-50%]"}

              frameworks={["react", "terraform", "nextjs"]}

              href="https://dyadic.io"
              githubHref="https://github.com/mxsdev/dyadic"
            />

            <ProjectCard 
              alt="typescript explorer"

              img={TsExplorerImage}

              title="TypeScript Explorer"
              description="VSCode Extension for examining TypeScript type information"

              frameworks={["typescript", "vscode"]}

              imageClassName={"scale-[120%] translate-x-[10%] translate-y-[10%] object-left-top group-hover:object-[0%_70%]"}

              href="https://github.com/mxsdev/ts-type-explorer"
              githubHref="https://github.com/mxsdev/ts-type-explorer"
            />

            <ProjectCard
              alt="ponychopper"

              img={PonychopperImage}

              title="Ponychopper"
              description="Productivity app for sample-based music genres"

              frameworks={["react", "electron"]}

              imageClassName={"scale-[130%] object-[50%_5%] group-hover:object-[50%_90%]"}
              
              href="https://www.chops.horse"
              githubHref="https://github.com/mxsdev/ponychopper"
            />

            <ProjectCard 
              alt="graphdrawing"

              title="graphdrawing-ts"
              description="Graph layout engine based on TikZ' graphdrawing"

              frameworks={["typescript"]}

              href="https://www.npmjs.com/package/graphdrawing-ts"
              githubHref="https://github.com/mxsdev/graphdrawing-ts"

              img={GraphDrawingImage}

              imageClassName={"scale-100 group-hover:scale-110"}
            />

            <ProjectCard 
              alt="nvim-dap-vscode-js"

              title="nvim-dap-vscode-js"
              description="VSCode JavaScript debugger integration for Neovim"

              frameworks={["lua", "neovim"]}

              href="https://github.com/mxsdev/nvim-dap-vscode-js"
              githubHref="https://github.com/mxsdev/nvim-dap-vscode-js"

              showStars={true}
              githubRepo="mxsdev/nvim-dap-vscode-js"
            />

            <ProjectCard 
              alt="riff-handle"

              title="riff-handle"
              description="RIFF parser capable of partial parsing via file handles"

              frameworks={["typescript"]}

              href="https://www.npmjs.com/package/riff-handle?activeTab=readme"
              githubHref="https://github.com/mxsdev/riff-handle"
            />
          </Masonry>
    )
}

export const ProjectCards = dynamic(() => Promise.resolve(ProjectCardsInternal), { ssr: false })