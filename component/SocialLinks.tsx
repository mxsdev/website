"use client"

import { FaGithub, FaTwitter, FaYoutube } from "react-icons/fa"

const icsize = 25
const icons = [
  { Icon: FaGithub, href: "https://github.com/mxsdev", key: "github" },
  { Icon: FaTwitter, href: "https://twitter.com/maxStoumen", key: "twitter" },
  { Icon: FaYoutube, href: "https://www.youtube.com/channel/UCODvGzoB_aMDRlrDttkmCVQ", key: "yt" },
]

export const SocialLinks = (props: {}) => {
  return (
    <div className="flex gap-4 justify-center">
      {icons.map(({ Icon, href, key }) => (
        <>
          <a
            href={href}
            key={key}
            className="hover:text-main transition-colors duration-75 hover:shadow-lg shadow-main"
          >
            <Icon size={icsize} />
          </a>
        </>
      ))}
    </div>
  )
}
