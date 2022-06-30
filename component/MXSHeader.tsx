import React from "react"

// Values for determining position of overlayed triangles
//  (tweaked until a good setting was found)
const f = 75
const p1 = [
  [0, 0],
  [1, 2],
  [2, 0],
]
  .map(([x, y]) => [x * f - 0.4 * f, y * f].join(","))
  .join(" ")
const c = 200
const d = -20
const p2 = [
  [0, 2],
  [1, 0],
  [2, 2],
]
  .map(([x, y]) => [x * f - 0.4 * f + c, y * f - 0.2 * f + d].join(","))
  .join(" ")

export const MXSHeader = (props: {}) => {
  return (
    <svg className="mx-auto h-28">
      <g id="bg" mask="url(#knockout-text)">
        <rect width="100%" height="100%" className="fill-fg" />
        exclusion
        <polygon
          points={p1}
          className="triangle1 mix-blend-multiply fill-acc" /* fill="#ff8fb6" */
        />
        <polygon
          points={p2}
          className="triangle2 mix-blend-darken fill-main" /* transform="translate(70%, 0%)" */ /* fill="#b6ff8f" */
        />
      </g>

      <mask id="knockout-text">
        <rect width="100%" height="100%" fill="#000" x="0" y="0" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-9xl font-extrabold italic font-header"
          fill="#fff"
        >
          mxs
        </text>
      </mask>
    </svg>
  )
}
