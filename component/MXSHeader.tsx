"use client"

import cl from "classnames"
import React, { useEffect, useRef, useState } from "react"
import BezierEasing from "bezier-easing"
import { waitBefore, waitCycle } from "../util/anim"
import {
  PolyPoints,
  equilateralTriangleCenter,
  renderPoints,
  translateX,
  applyToPoints,
  assignPoints,
} from "../util/svg"
import { GithubIcon, TwitterIcon, YoutubeIcon } from "./icons/SocialIcons"

const TH = 130
const paddingX = 32
const paddingR = 0
const paddingY = 0

const width = 250
const height = 100

const poly1Pts = equilateralTriangleCenter([paddingX, paddingY], TH)
const poly2Pts = equilateralTriangleCenter(
  [width - paddingX - paddingR, height - paddingY],
  -TH
)

const duration = 1.6
const wait = 1
const delay = 0.35

const easing1 = BezierEasing(0.53, 0.09, 0.41, 1.01)
const easing2 = BezierEasing(0.68, 0.04, 0.41, 1.01)

export const MXSHeader = ({ className, includeSocials = false }: { className?: string, includeSocials?: boolean }) => {
  const svg = useRef<SVGSVGElement>(null)
  const poly1 = useRef<SVGPolygonElement>(null)
  const poly2 = useRef<SVGPolygonElement>(null)

  useEffect(() => {
    let cancelled = false
    let start: number | undefined, previousTimestamp: number
    let lastReversed = false

    const animate: FrameRequestCallback = (timestamp) => {
      if(svg.current && poly1.current && poly2.current) {
        if (start === undefined) {
          start = timestamp
        }

        if (previousTimestamp != timestamp) {
            const t = (timestamp - start) / 1000
    
            const reversed = Math.floor(t / (duration + wait)) % 2 == 1
    
            const fac1 = easing1(waitCycle(wait, duration)(t))
            const xfac1 = fac1 * (width - paddingX - 20)
    
            const fac2 = easing2(waitBefore(delay, waitCycle(wait, duration))(t))
            const xfac2 = -fac2 * (width - paddingX - 20)
    
            const points1 = applyToPoints(poly1Pts, translateX(xfac1))
            const points2 = applyToPoints(poly2Pts, translateX(xfac2))
    
            assignPoints(svg.current, poly1.current.points, points1)
            assignPoints(svg.current, poly2.current.points, points2)
    
            if (reversed !== lastReversed) {
              const parentNode = poly1.current!.parentNode!
              parentNode.appendChild(parentNode.firstChild!)
            }
    
            lastReversed = reversed
          }
      }

      if (!cancelled) {
        previousTimestamp = timestamp
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      cancelled = true
    }
  }, [])

  const iconFac = 1.4

  const iconWidth = 20 / iconFac
  const iconGap = 7.5 / iconFac
  
  const icons: {
    svg: JSX.Element,
    href: string,
  }[] = [
    {
      svg: GithubIcon,
      href: "https://github.com/mxsdev",
    },
    {
      svg: TwitterIcon,
      href: "https://twitter.com/maxStoumen",
    },
    {
      svg: YoutubeIcon,
      href: "https://www.youtube.com/channel/UCODvGzoB_aMDRlrDttkmCVQ",
    }
  ]
  const numIcons = icons.length

  const outerIconTransform = `translate(${width/2 - numIcons*(iconGap - 1 + iconWidth)/2} ${height - iconWidth * iconFac})`
  const innerIconTransform = (i: number) => `translate(${i * (iconGap + iconWidth)} 0) scale(${iconWidth / 512})`

  const [ _hoverState, _setHoverState ] = useState<Record<number, boolean>>({})
  const updateHoverState = (idx: number, val: boolean) => () => _setHoverState(s => ({ ...s, [idx]: val }))
  const getHoverState = (idx: number) => !!_hoverState[idx]

  const iconClassNames = (idx: number) => ({
    ["transition-transform"]: true,
    ["-translate-y-[2px]"]: getHoverState(idx),
  })

  return (
    <svg className={cl(className)}viewBox={`0 0 ${width} ${height}`} ref={svg}>
      <g id="bg" mask="url(#knockout-text)">
        <rect width="100%" height="100%" className="fill-fg" />
      </g>

      <g mask="url(#knockout-text)">
        <polygon
          ref={poly2}
          points={renderPoints(poly2Pts)}
          className="triangle2 fill-main"
        />
        <polygon
          ref={poly1}
          points={renderPoints(poly1Pts)}
          className="triangle1 fill-acc"
          id="poly1"
        />
      </g>

      { includeSocials &&
        <g transform={outerIconTransform}>
          { icons.map(({ href }, i) => (
            <a 
              key={href} href={href}
              onMouseEnter={updateHoverState(i, true)}
              onMouseLeave={updateHoverState(i, false)}
            >
              <g transform={innerIconTransform(i)}>
                <rect 
                  width="512" height="512"
                  opacity="0"
                />
              </g>
            </a>
          ))
          }
        </g>
      }

      <mask id="knockout-text">
        <rect width="100%" height="100%" fill="#000" x="0" y="0" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={cl(
            "font-extrabold italic font-header",
            { ["text-7xl"]: includeSocials },
            { ["text-9xl"]: !includeSocials },
          )}
          fill="#fff"
        >
          mxs
        </text>

        { includeSocials &&
          <g
            transform={outerIconTransform}
          >
            {
              icons.map(({ svg, href }, i) => (
                <g
                  className={cl(iconClassNames(i))}
                  key={href}
                >
                  <g 
                    fill="#fff" 
                    transform={innerIconTransform(i)}
                  >
                    {svg}
                  </g>
                </g>
              ))
            }
          </g>
        }
      </mask>
    </svg>
  )
}
