import { PropsWithChildren } from "react"
import cl from "classnames"

type Props = {}

export const Card = (props: PropsWithChildren<Props>) => {
  return (
    <div className="relative ml-1.5 mt-1.5 inline-block">
      <InternalCard hidden={false} secondary={false}>
        {props.children}
      </InternalCard>
      <InternalCard hidden={false} secondary={true}>
        {props.children}
      </InternalCard>
      <InternalCard hidden={true} secondary={false}>
        {props.children}
      </InternalCard>
    </div>
  )
}

const InternalCard = ({
  hidden,
  secondary,
  children,
}: PropsWithChildren<{ hidden: boolean; secondary: boolean }>) => {
  const primary = !secondary && !hidden

  return (
    <>
      <div
        className={cl(
          "inline-block backface-hidden bg-bg border-fg border-2 px-2 py-1",
          {
            ["z-10"]: !hidden && !secondary,
            ["invisible"]: hidden,
            ["absolute"]: !hidden,
            ["-top-1.5 -left-1.5"]: secondary,
            ["peer-hover:-translate-y-1 duration-300"]: secondary,
            ["peer hover:-translate-y-0.5 "]: primary,
            ["transition"]: primary || secondary,
            ["delay-75"]: secondary,
            // ["hover:shadow-lg hover:shadow-main/10"]: primary,
          }
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
