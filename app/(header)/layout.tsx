import Link from "next/link"
import { Header } from "../../component/header/Header"
import { MXSHeader } from "../../component/MXSHeader"
import styles from "./layout.module.scss"

function HeaderLayout({ children }: { children: React.ReactNode }) {
    return <>
        <Header />
        {children}
    </>
}


export default HeaderLayout
