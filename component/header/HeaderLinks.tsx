"use client"

import Link from "next/link";
import { FunctionComponent } from "react";
import { usePathname } from "next/navigation"
import cl from "classnames"
import styles from "./header.module.scss"

type Props = {
    links: {
        text: string,
        href: string,
        match?: string
    }[]
}

export const HeaderLinks: FunctionComponent<Props> = ({ links }) => {
    const pathname = usePathname()
    
    return (
        <div className={cl("flex gap-4 text-center leading-none", styles.root)}>
            {links.map(({ text, href, match }, index) => (
                <Link 
                    href={href} 
                    key={index} 
                    className={cl(
                        styles.link,
                        "hover:text-main",
                        {
                            [styles.matched]: 
                                match ? match.includes(href) : href === pathname 
                        }
                    )}
                >
                    <span>
                        {text}
                    </span>
                </Link>
            ))}
        </div>
    );
}