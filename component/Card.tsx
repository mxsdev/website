"use client"

import { PropsWithChildren } from "react"
import cl from "classnames"

type Props = {
  className?: string
  bgClassName?: string
}

export const Card = ({ className, children, bgClassName }: PropsWithChildren<Props>) => {
  return (
    <div 
      className={cl("relative ml-1.5 mt-1.5 inline-block group", className)}
    >
      <InternalCard hidden={false} secondary={true} className={bgClassName}> </InternalCard>
      <InternalCard hidden={false} secondary={false}>
        {children}
      </InternalCard>
    </div>
  )
}

const InternalCard = ({
  hidden,
  secondary,
  children,
  className
}: PropsWithChildren<{ hidden: boolean; secondary: boolean, className?: string }>) => {
  const primary = !secondary && !hidden

  return (
    <>
      <div
        className={cl(
          "inline-block backface-hidden bg-bg border-fg border-2 w-full",
          {
            ["z-20 relative"]: primary,
            ["-top-2 -left-2 absolute w-full h-full z-10"]: secondary,
            ["group-hover:-translate-y-2 duration-300"]: secondary || primary,
            ["transition"]: primary || secondary,
            ["delay-75"]: secondary,
          },
          className,
        )}
      >
        <div
          className={cl({
            ["invisible"]: hidden || secondary,
            ["select-none"]: hidden || secondary,
          })}
        >
          {children}
        </div>
      </div>
    </>
  )
}
