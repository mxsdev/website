import { useEffect } from "react"
import { useState } from "react"
import { useMonaco } from "@monaco-editor/react"

export type CodeLines = { text: string, className: string }[][]

export const useColorizedCode = (text: string, language: string) => {
    const [colorized, setColorized] = useState<CodeLines>(text.split("\n").map((line) => [{ text: line, className: '' }]))
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      let curr: CodeLines[number] = []

      monaco.editor.colorize(text, language, {
      }).then((val: any) => {
        const data: CodeLines = []

        const root = document.createElement(`div`)
        root.innerHTML = val

        for (let i = 0; i < root.children.length; i++) {
          const child = root.children[i]

          if (child.tagName === 'SPAN') {
            for (let j = 0; j < child.children.length; j++) {
              const subchild = child.children[j]

              curr.push({ text: subchild.textContent || '', className: subchild.className })
            }
          } else if (child.tagName === 'BR') {
            data.push(curr)
            curr = []
          }
        }

        setColorized(data)
      })
    }
  }, [monaco, text, language])

  if (!monaco) {
    return []
  }

  return colorized
}
