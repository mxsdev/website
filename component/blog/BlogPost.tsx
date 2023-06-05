import type { MDXMeta } from '../../types/mdx'
import React, { Component, FunctionComponent, useEffect, useRef, useState } from "react"
import styles from "./layout.module.scss"
import {MDXComponents} from "mdx/types"
import { isUrl } from "../../util/matchers"
import Link from "next/link"
import { slug } from "../../util/slug"
import { BsLink45Deg, BsClipboard, BsClipboardCheck } from "react-icons/bs"
import cl from "classnames"
import BlogLayout from "./BlogLayout"
import { HeaderLayout } from "../header/Header"
import { MDXProvider } from '@mdx-js/react'
import { useColorizedCode } from '../../util/code'

const CodeComponent = ({ code, lang }: { code: string, lang?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const clipboardRef = useRef<HTMLDivElement>(null)
    const [ copyState, setCopyState ] = useState(false)
    
    const ClipboardIcon = copyState ? BsClipboardCheck : BsClipboard
    
    code = code.trim()
    
    const colorized = useColorizedCode(code, lang ?? '')

    useEffect(() => {
        const onHoverOff = () => {
            setCopyState(false)
        }

        const containerCurr = containerRef.current
        const clipboardCurr = clipboardRef.current

        if (containerCurr && clipboardCurr) {
            containerCurr.addEventListener('mouseleave', onHoverOff)
            clipboardCurr.addEventListener('mouseleave', onHoverOff)

            return () => { 
                containerCurr.removeEventListener('mouseleave', onHoverOff) 
                clipboardCurr.removeEventListener('mouseleave', onHoverOff)
            }
        }
    }, [colorized])

    if (colorized.length === 0) {
        return <code>{code}</code>
    }

    // const codeLines = colorized.flatMap((spans, line) => {
    //     if (spans.length === 1 && spans[0].text.trim() === '') {
    //         spans[0].text = ' '
    //     }
        
    //     let comps = spans.map(({ text, className }, i) => <span key={i} className={cl(className)}>{text}</span>)

    //     return (
    //         <span className={styles['code-tr']}>
    //             <span className={styles['code-th']}></span>
    //             <div> {comps} </div>
    //         </span>
    //     )
    // })

    // return <code className={styles['code-block-inner']}>{codeLines}</code>

    const onCopy = () => { 
        navigator.clipboard.writeText(code) 
        setCopyState(true)
    }

    const codeLines = colorized.flatMap((spans, line) => {
        if (spans.length === 1 && spans[0].text.trim() === '') {
            spans[0].text = ' '
        }
        
        let comps = spans.map(({ text, className }, i) => <span key={i} className={cl(className)}>{text}</span>)

        return (
            <span className={styles['code-line']}>
                <div>
                    {comps}
                </div>
            </span>
        )
    })

    const codeNums = colorized.map((_, i) => <span key={i} className={styles['code-num']}>{i}</span>)

    return <div className={(styles['code-block-inner-wrapper'])}><div className={styles['code-block-inner']} ref={containerRef}>
        <div>
            {codeNums}
        </div>
        <code className={styles['code-block-content']}>{codeLines}</code>
    </div>
    <div className={cl(styles['code-copy'])} onClick={onCopy} ref={clipboardRef}>
        <ClipboardIcon size={"1.2em"} />
    </div>
    </div>
}

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
    },

    "pre": ({ children }) => {
        if ('props' in (children as any)) {
            const c = (children as unknown as Component).props as any

            const code = c.children;
            // const lang = c.className.splice('language-'.length, -1);
            const lang = c.className?.slice('language-'.length);

            return <pre className={styles['code-block']}><CodeComponent lang={lang} code={code} /></pre>
        }
        
        return <pre>{children}</pre>
    },

    "code": ({ children, lang,  }) => {
        if (typeof children === 'string') {
            return <code className={styles['code-inline']}>{children}</code>
        }
        
        return <code>{children}</code>
    }
}

export function blogPage(Content: JSX.Element, meta: MDXMeta) {
    return (<HeaderLayout>
        <BlogLayout>
            <MDXProvider
                components={mdxComponents}
            >
                <div className="mb-5">
                    <h1 className={styles.title}>{meta.title}</h1>
                    <p 
                        className="text-sm opacity-70 select-none"
                    >
                        {formatDate(meta.created)}
                    </p>
                </div>

                <div className={styles.content}>
                    {Content}
                </div>
            </MDXProvider>
        </BlogLayout>
    </HeaderLayout>)
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