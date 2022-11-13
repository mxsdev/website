"use client"

import Link from "next/link"
import { useScrollBreakpoint } from "../../util/useScrollBreakpoint"
import { MXSHeader } from "../MXSHeader"
import { HeaderLinks } from "./HeaderLinks"
import cl from "classnames"

export function Header() {
    const scrollBp = useScrollBreakpoint(25)

    return (
        <div 
            className={cl(
                "flex flex-row items-center justify-between p-2 py-4 sticky top-4 transition-all duration-300", 
                { ["-translate-y-full opacity-0"]: scrollBp }
            )}
        >
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
