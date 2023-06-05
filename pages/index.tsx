import fs from 'fs/promises'
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next"
import { MXSHeader } from "../component/MXSHeader"
import Head from "next/head"
import path from 'path'
import { compile, evaluate } from '@mdx-js/mdx'
import { Fragment, useEffect, useState } from 'react'
import { C } from 'ts-toolbelt'
import { MDXMeta } from '../types/mdx'
import Link from 'next/link'

export const getStaticProps = async () => {
  const root = path.join(process.cwd(), 'pages', 'blog')
  const dirFiles = await fs.readdir(root, {
    withFileTypes: true
  })

  const posts: {
    title: string,
    created: number,
    slug: string,
  }[] = []

  for (const file of dirFiles) {
    if (!file.name.endsWith('.mdx')) return

    const slug = path.parse(file.name).name

    const res = await fs.readFile(path.join(root, path.basename(file.name)))
    const code = String(res)

    const match = code.match(/export const meta = {([\s\S]*?)\n}\n/m)
    const metaStr = match?.[0]!

    const json = metaStr.slice("export".length)
    const meta = eval(json + "; meta") as MDXMeta

    if (!meta.title || !meta.created) {
      throw new Error("Invalid metadata!")
    }

    posts.push({
      ...meta,
      created: meta.created.getTime(),
      slug,
    })
  }

  posts.sort((a, b) => b.created - a.created)
  
  return {
    props: {
      posts
    }
  }
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
      setHydrated(true);
  },[])
  
  return (
    <>
      <Head>
        <title>mxs</title>
      </Head>
      <div className="gap-6 md:max-w-screen-md sm:max-w-screen-sm h-screen mx-auto px-10">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mb-8">
            <MXSHeader className="mx-auto h-44" includeSocials />
          </div>

          <table className="border-spacing-y-10 border-separate max-w-[500px]">
            {hydrated && posts?.map(({ title, created, slug }) => (
              <tr key={title}>
                <td className="pr-20">
                  <Link href={`blog/${slug}`} className="hover:text-main hover:underline underline italic">
                        {title}
                  </Link>
                </td>

                <td className="pl-0 font-mono select-none opacity-50">
                  {new Date(created).toLocaleDateString('en-us', {})}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  )
}

export default Home

