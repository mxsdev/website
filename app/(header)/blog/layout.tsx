import styles from "./layout.module.scss"

function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="py-4 px-8">
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}

export default BlogLayout

