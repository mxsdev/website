import { FC, PropsWithChildren } from "react";
import { Label } from "./Label";

interface OwnProps {
    id: string;
    text: string;
}

type Props = PropsWithChildren<OwnProps>

export const FormEntry: FC<Props> = ({ id, text, children }) => (
    <div className="flex flex-wrap gap-6 items-center">
        <Label 
            htmlFor={id}
            text={text}
            className="w-[20%]"
        />
        {children}
    </div>
)