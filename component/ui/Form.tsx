import React, { FC, PropsWithChildren } from "react"

interface OwnProps  {
    
}

type Props = PropsWithChildren<OwnProps>

export const Form: FC<Props> = ({ children }) => {
    return (
        <div className="[&>*]:mt-6 p-2">
            {children}
        </div>
    )
}