import React, { FC, PropsWithChildren } from "react"
import styles from "./layout.module.scss"

interface OwnProps {
    subtitle?: string
}

type Props = PropsWithChildren<OwnProps>

export const BlogContent: FC<Props> = ({ subtitle, children }) => {
    return (
        <div className={styles["special-content"]}>
            { children }
        </div>
    )
}