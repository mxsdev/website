import { FaGithub, FaYoutube } from "react-icons/fa"

const icsize = 25
const icons = [
  { Icon: FaGithub, href: "https://github.com/mxsdev", key: "github" },
  { Icon: FaYoutube, href: "", key: "yt" },
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
