import Link from "next/link"
import { MXSHeader } from "../MXSHeader"
import { HeaderLinks } from "./HeaderLinks"

export function Header() {
    return (
        <div className={"flex flex-row items-center justify-between w-full p-2 mt-2"}>
            <Link href="/">
                <MXSHeader className={"h-8"} />
            </Link>

            {/* Links */}
            <HeaderLinks 
                links={
                    [
                        {
                            text: "home",
                            href: "/"
                        },
                        {
                            text: "about",
                            href: "/about"
                        },
                        {
                            text: "blog",
                            href: "/blog",
                            match: "/blog"
                        }
                    ]
                }
            />
        </div>
    )
}
