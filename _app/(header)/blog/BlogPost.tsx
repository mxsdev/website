import React, { FunctionComponent } from "react"
import styles from "./layout.module.scss"
import {MDXComponents} from "mdx/types"
import { isUrl } from "../../../util/matchers"
import Link from "next/link"
import { slug } from "../../../util/slug"
import { BsLink45Deg } from "react-icons/bs"
import cl from "classnames"

const mdxComponents: MDXComponents = {
    "h1": headerComponent("h1"),
    "h2": headerComponent("h2"),
    "h3": headerComponent("h3"),
    "h4": headerComponent("h4"),
    "h5": headerComponent("h5"),
    "h6": headerComponent("h6"),

    "a": ({href = "", ...props}) => {
        const className = cl(props.className, styles.link)

        if(isUrl(href)) {
            return <a href={href} {...props} className={className} />
        } else {
            const { ref, ...linkProps } = props

            return (
                <Link 
                    href={href} 
                    {...linkProps}
                    className={className}
                />
            )
        }
    }
}

export function blogPost(post: typeof import("*.mdx")) {
    const { default: Content, meta } = post

    const Page = () => (
        <>
            <h1 className={styles.title}>{meta.title}</h1>
            <p 
                className="text-sm opacity-70 select-none"
            >
                {formatDate(meta.created)}
            </p>

            <div className={styles.content}>
                <Content 
                    components={mdxComponents}
                />
            </div>
        </>
    )

    return Page
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("default", {
        year: "numeric",
        day: "numeric",
        month: "long",
    }).format(date)
}

function headerComponent(Type: "h1"|"h2"|"h3"|"h4"|"h5"|"h6") {
    const Header = (props: JSX.IntrinsicElements[typeof Type]) => {
        const id = slug(props.children as string)
        
        return (
            <a className={cl(styles[Type], styles.heading, "relative")} href={`#${id}`}>
                <Type {...props} id={id} className={cl(props.className, styles['heading-text'])} />
                <BsLink45Deg
                    className={cl(
                        "absolute",
                        "top-[0.09em] left-[-1.4em]",
                        "opacity-0 translate-y-2 transition-all",
                        styles['header-link']
                    )}
                    size={"1.2em"}
                />
            </a>
        ) 
    }

    return Header
}