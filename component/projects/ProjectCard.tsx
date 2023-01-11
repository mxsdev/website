"use client"

import React, { FC, useEffect, useState } from "react"
import cl from "classnames"
import { Card } from "../Card"
import Image, { StaticImageData } from "next/image"
import { getClosest } from "../../util/dom"
import { Framework, ProjectFrameworkIcon } from "./ProjectFrameworkIcon"
import { SiGithub } from "react-icons/si"
import { MdOutlineStarOutline } from "react-icons/md"

type Props = {
    className?: string
    imageClassName?: string

    img?: StaticImageData
    alt: string

    title: string
    description: string

    frameworks?: Framework[]

    href: string
    githubHref: string

    githubRepo?: string
    showStars?: boolean
}

export const ProjectCard: FC<Props> = ({ className, imageClassName, img, title, description, frameworks, href, githubHref, showStars = false, githubRepo }) => {
    const [imgRef, setImgRef] = useState<HTMLImageElement>()
    const [ transitionable, setTransitionable ] = useState(false)

    const [ stars, setStars ] = useState<number>()

    const hovered = useContainerHovered(imgRef)

    const onLoadingComplete = (img: HTMLImageElement) => {
        setInterval(() => setTransitionable(true), 300)
        setImgRef(img)
    }

    useEffect(() => {
        if(!githubRepo || !showStars) return

        const controller = new AbortController()

        fetch(`https://api.github.com/repos/${githubRepo}`, { signal: controller.signal })
            .then(async (res) => {
                const { stargazers_count } = await res.json() as { stargazers_count: number }
                setStars(stargazers_count)
            })

        return () => controller.abort()
    }, [githubRepo, showStars])

    return (
        <a href={href}>
            <Card
                className={cl(className, "w-full")}
                bgClassName="shadow-2xl shadow-fg/20 group-hover:shadow-fg/40"
            >
                <a href={githubHref}>
                    <div className="hover:scale-[108%] absolute right-2 bottom-2 z-10 bg-bg/25 p-1 rounded-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all">
                        <SiGithub size={24} />
                    </div>
                </a>

                <div
                    className="py-2 px-4 flex flex-col gap-2"
                >
                    <div
                        className="flex items-center justify-between gap-4"
                    >
                        <span className="font-bold text-xl">
                            {title}
                        </span>

                        {frameworks && (
                            <div className="flex gap-2">
                                {frameworks.map(framework => (
                                    <ProjectFrameworkIcon
                                        key={framework}
                                        framework={framework}
                                        size={20}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <p className="text-sm">
                        {description}
                    </p>

                    { img &&
                        <div
                            className="relative h-[200px] sm:h-[150px] overflow-hidden -mx-4 -mb-2 select-none"
                        >
                            <Image
                                src={img}
                                alt="dyadic.io"

                                onLoadingComplete={onLoadingComplete}

                                fill

                                className={cl(
                                    "object-cover select-none",
                                    { ["transition-all"]: transitionable },
                                    { ["transition-none"]: !transitionable},
                                    imageClassName,
                                    { ["duration-500"]: hovered },
                                    { ["duration-[1.5s]"]: !hovered },
                                )}
                            />
                        </div>
                    }

                    { showStars &&
                        <div
                            className="flex gap-2 items-center"
                        >
                            <MdOutlineStarOutline size={26} />
                            <span className="font-bold">{stars ?? "--"}</span>
                        </div>
                    }
                </div>
            </Card>
        </a>
    )
}

function useContainerHovered(imgRef?: HTMLImageElement) {
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        if (!imgRef) return

        const cardContainer = getClosest(imgRef, ".group")!

        const onMouseEnter = () => {
            setHovered(true)
        }

        const onMouseLeave = () => {
            setHovered(false)
        }

        cardContainer.addEventListener("mouseenter", onMouseEnter)
        cardContainer.addEventListener("mouseleave", onMouseLeave)

        return () => {
            cardContainer.removeEventListener("mouseenter", onMouseEnter)
            cardContainer.removeEventListener("mouseleave", onMouseLeave)
        }
    }, [imgRef])

    return hovered
}