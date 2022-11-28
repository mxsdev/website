import React, { FC } from "react"
import cl from "classnames"

type Props = {
    content: string
    setContent: (content: string) => void
    id?: string
    className?: string
    cols?: number
    rows?: number
}

export const TextArea: FC<Props> = ({ content, setContent, id, className, cols, rows }) => {
    return (
        <textarea 
            id={id} 
            className={cl("border-2 border-fg bg-bg text-sm", className)}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            cols={cols}
            rows={rows}
        />
    )
}