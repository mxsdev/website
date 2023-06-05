import fs from 'fs/promises'
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next"
import { MXSHeader } from "../component/MXSHeader"
import Head from "next/head"
import path from 'path'
import { compile, evaluate } from '@mdx-js/mdx'
import { Fragment } from 'react'
import { C } from 'ts-toolbelt'

export const getStaticProps = async () => {
  const root = path.join(process.cwd(), 'pages', 'blog')
  const dirFiles = await fs.readdir(root, {
    withFileTypes: true
  })

  // const m = await import("/Users/maxstoumen/Projects/personal/website/pages/blog/golang-cancelreader.mdx")
  // console.log(m.meta)

  // const source = await compile(await fs.readFile("/Users/maxstoumen/Projects/personal/website/pages/blog/golang-cancelreader.mdx"))

  // console.log(String(source))

  for (const file of dirFiles) {
    if (!file.name.endsWith('.mdx')) return

    // const res = await require(path.join(root, "golang-cancelreader.mdx"))
    try {
      const res = await compile(await fs.readFile(path.join(root, path.basename(file.name))))
      const code = String(res)

      const match = code.match(/export const meta = {([\s\S]*?)};/m)
      const metaStr = match?.[0]!

      const json = metaStr.slice("export".length).slice(0, -1)
      const meta = eval(json + "; meta")

      meta as { title?: string, created?: Date }
    } catch(e) { 
      console.log(file.name)
    }

      // const fileContent = fs.readFileSync(
      //   path.join(process.cwd(), 'pages', 'posts', file.name),
      //   'utf-8'
      // );
      // const { data, content } = matter(fileContent);

      // const slug = file.name.replace(/.mdx$/, '');
      // return { data, content, slug };
  }
  
  return {
    props: {
      
    }
  }
}

const Home: NextPage = ({ }: InferGetStaticPropsType<typeof getStaticProps>) => {
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

