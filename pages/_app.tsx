import { AppProps } from "next/app";
import "../styles/globals.scss"
import { useEffect } from "react";
import { useMonaco } from "@monaco-editor/react";

export default function App({ Component, pageProps }: AppProps) {
    const monaco = useMonaco()
    
    useEffect(() => {
        monaco?.editor.defineTheme('dracula', draculaTheme())
        monaco?.editor.setTheme('dracula')
    }, [ monaco ])
    
    return (
        <Component {...pageProps} />
    )
}

function draculaTheme() {
    return {
        "inherit": true,
        "base": "vs-dark",
        "colors": {
          "foreground": "#9aa79d",
          "focusBorder": "#2d353b00",
          "widget.shadow": "#00000070",
          "selection.background": "#475258e0",
          "descriptionForeground": "#859289",
          "errorForeground": "#e67e80",
          "icon.foreground": "#83c092",
          "textLink.foreground": "#a7c080",
          "textLink.activeForeground": "#a7c080c0",
          "textCodeBlock.background": "#272e33",
          "textBlockQuote.background": "#272e33",
          "textBlockQuote.border": "#475258",
          "textPreformat.foreground": "#dbbc7f",
          "toolbar.hoverBackground": "#343f44",
          "button.background": "#a7c080",
          "button.hoverBackground": "#a7c080d0",
          "button.foreground": "#2d353b",
          "button.secondaryBackground": "#3d484d",
          "button.secondaryForeground": "#d3c6aa",
          "button.secondaryHoverBackground": "#475258",
          "checkbox.background": "#2d353b",
          "checkbox.foreground": "#e69875",
          "checkbox.border": "#4f585e",
          "dropdown.border": "#4f585e",
          "dropdown.background": "#2d353b",
          "dropdown.foreground": "#9aa79d",
          "input.border": "#4f585e",
          "input.background": "#2d353b00",
          "input.foreground": "#d3c6aa",
          "input.placeholderForeground": "#7f897d",
          "inputOption.activeBorder": "#83c092",
          "inputValidation.errorBorder": "#e67e80",
          "inputValidation.errorBackground": "#da6362",
          "inputValidation.errorForeground": "#d3c6aa",
          "inputValidation.infoBorder": "#7fbbb3",
          "inputValidation.infoBackground": "#5a93a2",
          "inputValidation.infoForeground": "#d3c6aa",
          "inputValidation.warningBorder": "#dbbc7f",
          "inputValidation.warningBackground": "#bf983d",
          "inputValidation.warningForeground": "#d3c6aa",
          "scrollbar.shadow": "#00000070",
          "scrollbarSlider.activeBackground": "#9aa79d",
          "scrollbarSlider.hoverBackground": "#4f585e",
          "scrollbarSlider.background": "#4f585e80",
          "badge.background": "#a7c080",
          "badge.foreground": "#2d353b",
          "progressBar.background": "#a7c080",
          "list.activeSelectionForeground": "#d3c6aa",
          "list.activeSelectionBackground": "#47525880",
          "list.inactiveSelectionForeground": "#9aa79d",
          "list.inactiveSelectionBackground": "#47525880",
          "list.dropBackground": "#343f4480",
          "list.focusForeground": "#d3c6aa",
          "list.focusBackground": "#47525880",
          "list.inactiveFocusBackground": "#47525860",
          "list.highlightForeground": "#a7c080",
          "list.hoverForeground": "#d3c6aa",
          "list.hoverBackground": "#2d353b00",
          "list.invalidItemForeground": "#da6362",
          "list.errorForeground": "#e67e80",
          "list.warningForeground": "#dbbc7f",
          "tree.indentGuidesStroke": "#7f897d",
          "activityBar.border": "#2d353b",
          "activityBar.background": "#2d353b",
          "activityBar.foreground": "#d3c6aa",
          "activityBar.inactiveForeground": "#859289",
          "activityBar.dropBackground": "#2d353b",
          "activityBar.activeBorder": "#a7c080d0",
          "activityBar.activeFocusBorder": "#a7c080",
          "activityBarBadge.background": "#a7c080",
          "activityBarBadge.foreground": "#2d353b",
          "sideBar.foreground": "#859289",
          "sideBar.background": "#2d353b",
          "sideBarSectionHeader.background": "#2d353b00",
          "sideBarTitle.foreground": "#9aa79d",
          "sideBarSectionHeader.foreground": "#9aa79d",
          "minimap.findMatchHighlight": "#569d7960",
          "minimap.selectionHighlight": "#4f585ef0",
          "minimap.errorHighlight": "#da636280",
          "minimap.warningHighlight": "#bf983d80",
          "minimapGutter.addedBackground": "#899c40a0",
          "minimapGutter.modifiedBackground": "#5a93a2a0",
          "minimapGutter.deletedBackground": "#da6362a0",
          "editorGroup.border": "#21272b",
          "editorGroupHeader.tabsBackground": "#2d353b",
          "editorGroupHeader.noTabsBackground": "#2d353b",
          "editorGroup.dropBackground": "#4f585e60",
          "tab.border": "#2d353b",
          "tab.activeBorder": "#a7c080d0",
          "tab.inactiveBackground": "#2d353b",
          "tab.hoverBackground": "#2d353b",
          "tab.hoverForeground": "#d3c6aa",
          "tab.activeBackground": "#2d353b",
          "tab.activeForeground": "#d3c6aa",
          "tab.inactiveForeground": "#7f897d",
          "tab.unfocusedActiveForeground": "#9aa79d",
          "tab.unfocusedActiveBorder": "#859289",
          "tab.unfocusedInactiveForeground": "#7f897d",
          "tab.unfocusedHoverForeground": "#d3c6aa",
          "tab.lastPinnedBorder": "#a7c080d0",
          "editor.background": "#2d353b",
          "editor.foreground": "#d3c6aa",
          "editorLineNumber.foreground": "#7f897da0",
          "editorLineNumber.activeForeground": "#9aa79de0",
          "editorCursor.foreground": "#d3c6aa",
          "editor.selectionBackground": "#475258c0",
          "editor.selectionHighlightBackground": "#47525860",
          "editor.inactiveSelectionBackground": "#47525860",
          "editor.wordHighlightBackground": "#47525858",
          "editor.wordHighlightStrongBackground": "#475258b0",
          "editor.hoverHighlightBackground": "#475258b0",
          "editor.findMatchBackground": "#d77f4840",
          "editor.findMatchHighlightBackground": "#899c4040",
          "editor.findRangeHighlightBackground": "#47525860",
          "editor.lineHighlightBorder": "#4f585e00",
          "editor.lineHighlightBackground": "#3d484d90",
          "editor.rangeHighlightBackground": "#3d484d80",
          "editor.symbolHighlightBackground": "#5a93a240",
          "editorLink.activeForeground": "#a7c080",
          "editorWhitespace.foreground": "#475258",
          "editorIndentGuide.background": "#9aa79d20",
          "editorIndentGuide.activeBackground": "#9aa79d50",
          "editorInlayHint.background": "#2d353b00",
          "editorInlayHint.foreground": "#7f897da0",
          "editorInlayHint.typeBackground": "#2d353b00",
          "editorInlayHint.typeForeground": "#7f897da0",
          "editorInlayHint.parameterBackground": "#2d353b00",
          "editorInlayHint.parameterForeground": "#7f897da0",
          "editorRuler.foreground": "#475258a0",
          "editorCodeLens.foreground": "#7f897da0",
          "editor.foldBackground": "#4f585e80",
          "editorBracketMatch.border": "#2d353b00",
          "editorBracketMatch.background": "#4f585e",
          "editorBracketHighlight.foreground1": "#e67e80",
          "editorBracketHighlight.foreground2": "#dbbc7f",
          "editorBracketHighlight.foreground3": "#a7c080",
          "editorBracketHighlight.foreground4": "#7fbbb3",
          "editorBracketHighlight.foreground5": "#e69875",
          "editorBracketHighlight.foreground6": "#d699b6",
          "editorBracketHighlight.unexpectedBracket.foreground": "#859289",
          "editorOverviewRuler.border": "#2d353b00",
          "editorOverviewRuler.findMatchForeground": "#569d79",
          "editorOverviewRuler.rangeHighlightForeground": "#569d79",
          "editorOverviewRuler.selectionHighlightForeground": "#569d79",
          "editorOverviewRuler.wordHighlightForeground": "#4f585e",
          "editorOverviewRuler.wordHighlightStrongForeground": "#4f585e",
          "editorOverviewRuler.modifiedForeground": "#5a93a2a0",
          "editorOverviewRuler.addedForeground": "#899c40a0",
          "editorOverviewRuler.deletedForeground": "#da6362a0",
          "editorOverviewRuler.errorForeground": "#e67e80",
          "editorOverviewRuler.warningForeground": "#dbbc7f",
          "editorOverviewRuler.infoForeground": "#d699b6",
          "editorOverviewRuler.currentContentForeground": "#5a93a2",
          "editorOverviewRuler.incomingContentForeground": "#569d79",
          "editorOverviewRuler.commonContentForeground": "#859289",
          "problemsErrorIcon.foreground": "#e67e80",
          "problemsWarningIcon.foreground": "#dbbc7f",
          "problemsInfoIcon.foreground": "#7fbbb3",
          "editorUnnecessaryCode.border": "#2d353b",
          "editorUnnecessaryCode.opacity": "#00000080",
          "editorError.foreground": "#da6362",
          "editorWarning.foreground": "#bf983d",
          "editorInfo.foreground": "#5a93a2",
          "editorHint.foreground": "#b87b9d",
          "editorError.background": "#da636200",
          "editorWarning.background": "#bf983d00",
          "editorInfo.background": "#5a93a200",
          "editorGutter.background": "#2d353b00",
          "editorGutter.modifiedBackground": "#5a93a2a0",
          "editorGutter.addedBackground": "#899c40a0",
          "editorGutter.deletedBackground": "#da6362a0",
          "editorGutter.commentRangeForeground": "#7f897d",
          "diffEditor.insertedTextBackground": "#569d7930",
          "diffEditor.removedTextBackground": "#da636230",
          "diffEditor.diagonalFill": "#4f585e",
          "editorSuggestWidget.background": "#3d484d",
          "editorSuggestWidget.foreground": "#d3c6aa",
          "editorSuggestWidget.highlightForeground": "#a7c080",
          "editorSuggestWidget.selectedBackground": "#475258",
          "editorSuggestWidget.border": "#3d484d",
          "editorWidget.background": "#2d353b",
          "editorWidget.foreground": "#d3c6aa",
          "editorWidget.border": "#4f585e",
          "editorHoverWidget.background": "#343f44",
          "editorHoverWidget.border": "#475258",
          "editorGhostText.background": "#2d353b00",
          "editorGhostText.foreground": "#7f897da0",
          "editorMarkerNavigation.background": "#343f44",
          "editorMarkerNavigationError.background": "#da636280",
          "editorMarkerNavigationWarning.background": "#bf983d80",
          "editorMarkerNavigationInfo.background": "#5a93a280",
          "peekView.border": "#475258",
          "peekViewEditor.background": "#343f44",
          "peekViewEditor.matchHighlightBackground": "#bf983d50",
          "peekViewEditorGutter.background": "#343f44",
          "peekViewResult.fileForeground": "#d3c6aa",
          "peekViewResult.lineForeground": "#9aa79d",
          "peekViewResult.matchHighlightBackground": "#bf983d50",
          "peekViewResult.selectionBackground": "#569d7950",
          "peekViewResult.selectionForeground": "#d3c6aa",
          "peekViewTitleDescription.foreground": "#d3c6aa",
          "peekViewTitleLabel.foreground": "#a7c080",
          "peekViewResult.background": "#343f44",
          "peekViewTitle.background": "#475258",
          "pickerGroup.border": "#a7c0801a",
          "terminal.foreground": "#d3c6aa",
          "terminalCursor.foreground": "#d3c6aa",
          "terminal.ansiBlack": "#343f44",
          "terminal.ansiBlue": "#7fbbb3",
          "terminal.ansiBrightBlack": "#859289",
          "terminal.ansiBrightBlue": "#7fbbb3",
          "terminal.ansiBrightCyan": "#83c092",
          "terminal.ansiBrightGreen": "#a7c080",
          "terminal.ansiBrightMagenta": "#d699b6",
          "terminal.ansiBrightRed": "#e67e80",
          "terminal.ansiBrightWhite": "#d3c6aa",
          "terminal.ansiBrightYellow": "#dbbc7f",
          "terminal.ansiCyan": "#83c092",
          "terminal.ansiGreen": "#a7c080",
          "terminal.ansiMagenta": "#d699b6",
          "terminal.ansiRed": "#e67e80",
          "terminal.ansiWhite": "#d3c6aa",
          "terminal.ansiYellow": "#dbbc7f",
          "debugToolBar.background": "#2d353b",
          "debugTokenExpression.name": "#7fbbb3",
          "debugTokenExpression.value": "#a7c080",
          "debugTokenExpression.string": "#dbbc7f",
          "debugTokenExpression.boolean": "#d699b6",
          "debugTokenExpression.number": "#d699b6",
          "debugTokenExpression.error": "#e67e80",
          "debugIcon.breakpointForeground": "#e67e80",
          "debugIcon.breakpointDisabledForeground": "#da6362",
          "debugIcon.breakpointUnverifiedForeground": "#9aa79d",
          "debugIcon.breakpointCurrentStackframeForeground": "#7fbbb3",
          "debugIcon.breakpointStackframeForeground": "#e67e80",
          "debugIcon.startForeground": "#83c092",
          "debugIcon.pauseForeground": "#dbbc7f",
          "debugIcon.stopForeground": "#e67e80",
          "debugIcon.disconnectForeground": "#d699b6",
          "debugIcon.restartForeground": "#83c092",
          "debugIcon.stepOverForeground": "#7fbbb3",
          "debugIcon.stepIntoForeground": "#7fbbb3",
          "debugIcon.stepOutForeground": "#7fbbb3",
          "debugIcon.continueForeground": "#7fbbb3",
          "debugIcon.stepBackForeground": "#7fbbb3",
          "debugConsole.infoForeground": "#a7c080",
          "debugConsole.warningForeground": "#dbbc7f",
          "debugConsole.errorForeground": "#e67e80",
          "debugConsole.sourceForeground": "#d699b6",
          "debugConsoleInputIcon.foreground": "#83c092",
          "merge.incomingHeaderBackground": "#569d7980",
          "merge.incomingContentBackground": "#569d7940",
          "merge.currentHeaderBackground": "#5a93a280",
          "merge.currentContentBackground": "#5a93a240",
          "merge.border": "#2d353b00",
          "panel.background": "#2d353b",
          "panel.border": "#2d353b",
          "panelInput.border": "#4f585e",
          "panelTitle.activeForeground": "#d3c6aa",
          "panelTitle.activeBorder": "#a7c080d0",
          "panelTitle.inactiveForeground": "#859289",
          "panelSection.border": "#21272b",
          "panelSectionHeader.background": "#2d353b",
          "imagePreview.border": "#2d353b",
          "statusBar.background": "#2d353b",
          "statusBar.foreground": "#9aa79d",
          "statusBar.border": "#2d353b",
          "statusBar.debuggingForeground": "#e69875",
          "statusBar.debuggingBackground": "#2d353b",
          "statusBar.noFolderBackground": "#2d353b",
          "statusBar.noFolderForeground": "#9aa79d",
          "statusBar.noFolderBorder": "#2d353b",
          "statusBarItem.hoverBackground": "#475258a0",
          "statusBarItem.activeBackground": "#47525870",
          "statusBarItem.prominentForeground": "#d3c6aa",
          "statusBarItem.prominentBackground": "#2d353b",
          "statusBarItem.prominentHoverBackground": "#475258a0",
          "statusBarItem.remoteBackground": "#2d353b",
          "statusBarItem.remoteForeground": "#9aa79d",
          "statusBarItem.errorBackground": "#2d353b",
          "statusBarItem.errorForeground": "#e67e80",
          "statusBarItem.warningBackground": "#2d353b",
          "statusBarItem.warningForeground": "#dbbc7f",
          "titleBar.activeBackground": "#2d353b",
          "titleBar.activeForeground": "#9aa79d",
          "titleBar.inactiveBackground": "#2d353b",
          "titleBar.inactiveForeground": "#7f897d",
          "titleBar.border": "#2d353b",
          "menubar.selectionBackground": "#2d353b",
          "menubar.selectionBorder": "#2d353b",
          "menu.foreground": "#9aa79d",
          "menu.background": "#2d353b",
          "menu.selectionForeground": "#d3c6aa",
          "menu.selectionBackground": "#343f44",
          "gitDecoration.addedResourceForeground": "#a7c080a0",
          "gitDecoration.modifiedResourceForeground": "#7fbbb3a0",
          "gitDecoration.deletedResourceForeground": "#e67e80a0",
          "gitDecoration.untrackedResourceForeground": "#dbbc7fa0",
          "gitDecoration.ignoredResourceForeground": "#4f585e",
          "gitDecoration.conflictingResourceForeground": "#d699b6a0",
          "gitDecoration.submoduleResourceForeground": "#e69875a0",
          "gitDecoration.stageDeletedResourceForeground": "#83c092a0",
          "gitDecoration.stageModifiedResourceForeground": "#83c092a0",
          "notificationCenterHeader.foreground": "#d3c6aa",
          "notificationCenterHeader.background": "#3d484d",
          "notifications.foreground": "#d3c6aa",
          "notifications.background": "#2d353b",
          "notificationLink.foreground": "#a7c080",
          "notificationsErrorIcon.foreground": "#e67e80",
          "notificationsWarningIcon.foreground": "#dbbc7f",
          "notificationsInfoIcon.foreground": "#7fbbb3",
          "extensionButton.prominentForeground": "#2d353b",
          "extensionButton.prominentBackground": "#a7c080",
          "extensionButton.prominentHoverBackground": "#a7c080d0",
          "extensionBadge.remoteBackground": "#a7c080",
          "extensionBadge.remoteForeground": "#2d353b",
          "extensionIcon.starForeground": "#83c092",
          "extensionIcon.verifiedForeground": "#a7c080",
          "extensionIcon.preReleaseForeground": "#e69875",
          "pickerGroup.foreground": "#d3c6aa",
          "quickInputTitle.background": "#343f44",
          "keybindingLabel.background": "#2d353b00",
          "keybindingLabel.foreground": "#d3c6aa",
          "keybindingLabel.border": "#272e33",
          "keybindingLabel.bottomBorder": "#21272b",
          "keybindingTable.headerBackground": "#3d484d",
          "keybindingTable.rowsBackground": "#343f44",
          "settings.headerForeground": "#9aa79d",
          "settings.numberInputBackground": "#2d353b",
          "settings.numberInputForeground": "#d699b6",
          "settings.numberInputBorder": "#4f585e",
          "settings.textInputBackground": "#2d353b",
          "settings.textInputForeground": "#7fbbb3",
          "settings.textInputBorder": "#4f585e",
          "settings.checkboxBackground": "#2d353b",
          "settings.checkboxForeground": "#e69875",
          "settings.checkboxBorder": "#4f585e",
          "settings.dropdownBackground": "#2d353b",
          "settings.dropdownForeground": "#83c092",
          "settings.dropdownBorder": "#4f585e",
          "settings.modifiedItemIndicator": "#7f897d",
          "settings.focusedRowBackground": "#343f44",
          "settings.rowHoverBackground": "#343f44",
          "editorLightBulb.foreground": "#dbbc7f",
          "editorLightBulbAutoFix.foreground": "#83c092",
          "welcomePage.progress.foreground": "#a7c080",
          "welcomePage.tileHoverBackground": "#343f44",
          "welcomePage.buttonBackground": "#343f44",
          "welcomePage.buttonHoverBackground": "#343f44a0",
          "walkThrough.embeddedEditorBackground": "#272e33",
          "breadcrumb.foreground": "#859289",
          "breadcrumb.focusForeground": "#d3c6aa",
          "breadcrumb.activeSelectionForeground": "#d3c6aa",
          "symbolIcon.colorForeground": "#d3c6aa",
          "symbolIcon.snippetForeground": "#d3c6aa",
          "symbolIcon.fieldForeground": "#d3c6aa",
          "symbolIcon.fileForeground": "#d3c6aa",
          "symbolIcon.folderForeground": "#d3c6aa",
          "symbolIcon.textForeground": "#d3c6aa",
          "symbolIcon.unitForeground": "#d3c6aa",
          "symbolIcon.keywordForeground": "#e67e80",
          "symbolIcon.operatorForeground": "#e69875",
          "symbolIcon.classForeground": "#dbbc7f",
          "symbolIcon.eventForeground": "#dbbc7f",
          "symbolIcon.interfaceForeground": "#dbbc7f",
          "symbolIcon.structForeground": "#dbbc7f",
          "symbolIcon.functionForeground": "#a7c080",
          "symbolIcon.keyForeground": "#a7c080",
          "symbolIcon.methodForeground": "#a7c080",
          "symbolIcon.stringForeground": "#a7c080",
          "symbolIcon.constantForeground": "#83c092",
          "symbolIcon.enumeratorMemberForeground": "#83c092",
          "symbolIcon.nullForeground": "#83c092",
          "symbolIcon.propertyForeground": "#83c092",
          "symbolIcon.typeParameterForeground": "#83c092",
          "symbolIcon.arrayForeground": "#7fbbb3",
          "symbolIcon.referenceForeground": "#7fbbb3",
          "symbolIcon.variableForeground": "#7fbbb3",
          "symbolIcon.booleanForeground": "#d699b6",
          "symbolIcon.constructorForeground": "#d699b6",
          "symbolIcon.enumeratorForeground": "#d699b6",
          "symbolIcon.moduleForeground": "#d699b6",
          "symbolIcon.namespaceForeground": "#d699b6",
          "symbolIcon.numberForeground": "#d699b6",
          "symbolIcon.objectForeground": "#d699b6",
          "symbolIcon.packageForeground": "#d699b6",
          "editor.snippetTabstopHighlightBackground": "#3d484d",
          "editor.snippetFinalTabstopHighlightBackground": "#899c4040",
          "editor.snippetFinalTabstopHighlightBorder": "#2d353b",
          "charts.red": "#e67e80",
          "charts.orange": "#e69875",
          "charts.yellow": "#dbbc7f",
          "charts.green": "#a7c080",
          "charts.blue": "#7fbbb3",
          "charts.purple": "#d699b6",
          "charts.foreground": "#d3c6aa",
          "ports.iconRunningProcessForeground": "#e69875",
          "sash.hoverBorder": "#475258",
          "notebook.cellBorderColor": "#4f585e",
          "notebook.cellStatusBarItemHoverBackground": "#343f44",
          "notebook.focusedCellBackground": "#2d353b",
          "notebook.cellHoverBackground": "#2d353b",
          "notebook.outputContainerBackgroundColor": "#272e33",
          "notebookStatusSuccessIcon.foreground": "#a7c080",
          "notebookStatusErrorIcon.foreground": "#e67e80",
          "notebookStatusRunningIcon.foreground": "#7fbbb3",
          "notebook.focusedCellBorder": "#4f585e",
          "notebook.focusedEditorBorder": "#4f585e",
          "notebook.selectedCellBorder": "#4f585e",
          "notebook.focusedRowBorder": "#4f585e",
          "notebook.inactiveFocusedCellBorder": "#4f585e",
          "notebook.cellToolbarSeparator": "#4f585e",
          "testing.iconFailed": "#e67e80",
          "testing.iconErrored": "#e67e80",
          "testing.iconPassed": "#83c092",
          "testing.runAction": "#83c092",
          "testing.iconQueued": "#7fbbb3",
          "testing.iconUnset": "#dbbc7f",
          "testing.iconSkipped": "#d699b6",
          "gitlens.gutterBackgroundColor": "#2d353b",
          "gitlens.gutterForegroundColor": "#d3c6aa",
          "gitlens.gutterUncommittedForegroundColor": "#7fbbb3",
          "gitlens.trailingLineForegroundColor": "#859289",
          "gitlens.lineHighlightBackgroundColor": "#343f44",
          "gitlens.lineHighlightOverviewRulerColor": "#a7c080",
          "gitlens.closedPullRequestIconColor": "#e67e80",
          "gitlens.openPullRequestIconColor": "#83c092",
          "gitlens.mergedPullRequestIconColor": "#d699b6",
          "gitlens.unpushlishedChangesIconColor": "#7fbbb3",
          "gitlens.unpublishedCommitIconColor": "#dbbc7f",
          "gitlens.unpulledChangesIconColor": "#e69875",
          "gitlens.decorations.addedForegroundColor": "#a7c080",
          "gitlens.decorations.copiedForegroundColor": "#d699b6",
          "gitlens.decorations.deletedForegroundColor": "#e67e80",
          "gitlens.decorations.ignoredForegroundColor": "#9aa79d",
          "gitlens.decorations.modifiedForegroundColor": "#7fbbb3",
          "gitlens.decorations.untrackedForegroundColor": "#dbbc7f",
          "gitlens.decorations.renamedForegroundColor": "#d699b6",
          "gitlens.decorations.branchAheadForegroundColor": "#83c092",
          "gitlens.decorations.branchBehindForegroundColor": "#e69875",
          "gitlens.decorations.branchDivergedForegroundColor": "#dbbc7f",
          "gitlens.decorations.branchUpToDateForegroundColor": "#d3c6aa",
          "gitlens.decorations.branchUnpublishedForegroundColor": "#7fbbb3",
          "gitlens.decorations.branchMissingUpstreamForegroundColor": "#e67e80",
          "issues.open": "#83c092",
          "issues.closed": "#e67e80",
          "rust_analyzer.inlayHints.foreground": "#7f897da0",
          "rust_analyzer.inlayHints.background": "#2d353b00",
          "rust_analyzer.syntaxTreeBorder": "#e67e80"
        },
        "rules": [
          {
            "foreground": "#e67e80",
            "token": "keyword"
          },
          {
            "foreground": "#e67e80",
            "token": " storage.type.function"
          },
          {
            "foreground": "#e67e80",
            "token": " storage.type.class"
          },
          {
            "foreground": "#e67e80",
            "token": " storage.type.enum"
          },
          {
            "foreground": "#e67e80",
            "token": " storage.type.interface"
          },
          {
            "foreground": "#e67e80",
            "token": " storage.type.property"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.operator.new"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.operator.expression"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.operator.new"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.operator.delete"
          },
          {
            "foreground": "#e67e80",
            "token": " storage.type.extends"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.other.debugger"
          },
          {
            "foreground": "#e69875",
            "token": "storage"
          },
          {
            "foreground": "#e69875",
            "token": " modifier"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.var"
          },
          {
            "foreground": "#e69875",
            "token": " entity.name.tag"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.control.case"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.control.switch"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.operator"
          },
          {
            "foreground": "#dbbc7f",
            "token": "string"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.definition.string.end"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.definition.string.begin"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.definition.string.template.begin"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.definition.string.template.end"
          },
          {
            "foreground": "#dbbc7f",
            "token": "entity.other.attribute-name"
          },
          {
            "foreground": "#a7c080",
            "token": "constant.character.escape"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.quasi.element"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.template-expression"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.section.embedded"
          },
          {
            "foreground": "#a7c080",
            "token": " storage.type.format"
          },
          {
            "foreground": "#a7c080",
            "token": " constant.other.placeholder"
          },
          {
            "foreground": "#a7c080",
            "token": " constant.other.placeholder"
          },
          {
            "foreground": "#a7c080",
            "token": " variable.interpolation"
          },
          {
            "foreground": "#a7c080",
            "token": "entity.name.function"
          },
          {
            "foreground": "#a7c080",
            "token": " support.function"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.function"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.function-call"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.definition.method"
          },
          {
            "foreground": "#83c092",
            "token": "keyword.control.at-rule"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.control.import"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.control.export"
          },
          {
            "foreground": "#83c092",
            "token": " storage.type.namespace"
          },
          {
            "foreground": "#83c092",
            "token": " punctuation.decorator"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.control.directive"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.preprocessor"
          },
          {
            "foreground": "#83c092",
            "token": " punctuation.definition.preprocessor"
          },
          {
            "foreground": "#83c092",
            "token": " punctuation.definition.directive"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.other.import"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.other.package"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.namespace"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.scope-resolution"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.other.using"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.package"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.import"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.map"
          },
          {
            "foreground": "#83c092",
            "token": "storage.type.annotation"
          },
          {
            "foreground": "#83c092",
            "token": "entity.name.label"
          },
          {
            "foreground": "#83c092",
            "token": " constant.other.label"
          },
          {
            "foreground": "#83c092",
            "token": "support.module"
          },
          {
            "foreground": "#83c092",
            "token": " support.node"
          },
          {
            "foreground": "#83c092",
            "token": " support.other.module"
          },
          {
            "foreground": "#83c092",
            "token": " support.type.object.module"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.module"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.class.module"
          },
          {
            "foreground": "#83c092",
            "token": " keyword.control.module"
          },
          {
            "foreground": "#7fbbb3",
            "token": "storage.type"
          },
          {
            "foreground": "#7fbbb3",
            "token": " support.type"
          },
          {
            "foreground": "#7fbbb3",
            "token": " entity.name.type"
          },
          {
            "foreground": "#7fbbb3",
            "token": " keyword.type"
          },
          {
            "foreground": "#7fbbb3",
            "token": "entity.name.type.class"
          },
          {
            "foreground": "#7fbbb3",
            "token": " support.class"
          },
          {
            "foreground": "#7fbbb3",
            "token": " entity.name.class"
          },
          {
            "foreground": "#7fbbb3",
            "token": " entity.other.inherited-class"
          },
          {
            "foreground": "#7fbbb3",
            "token": " storage.class"
          },
          {
            "foreground": "#d699b6",
            "token": "constant.numeric"
          },
          {
            "foreground": "#d699b6",
            "token": "constant.language.boolean"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.name.function.preprocessor"
          },
          {
            "foreground": "#d699b6",
            "token": "variable.language.this"
          },
          {
            "foreground": "#d699b6",
            "token": " variable.language.self"
          },
          {
            "foreground": "#d699b6",
            "token": " variable.language.super"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.other.this"
          },
          {
            "foreground": "#d699b6",
            "token": " variable.language.special"
          },
          {
            "foreground": "#d699b6",
            "token": " constant.language.null"
          },
          {
            "foreground": "#d699b6",
            "token": " constant.language.undefined"
          },
          {
            "foreground": "#d699b6",
            "token": " constant.language.nan"
          },
          {
            "foreground": "#d699b6",
            "token": "constant.language"
          },
          {
            "foreground": "#d699b6",
            "token": " support.constant"
          },
          {
            "foreground": "#d3c6aa",
            "token": "variable"
          },
          {
            "foreground": "#d3c6aa",
            "token": " support.variable"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.definition.variable"
          },
          {
            "foreground": "#d3c6aa",
            "token": "variable.object.property"
          },
          {
            "foreground": "#d3c6aa",
            "token": " support.variable.property"
          },
          {
            "foreground": "#d3c6aa",
            "token": " variable.other.property"
          },
          {
            "foreground": "#d3c6aa",
            "token": " variable.other.object.property"
          },
          {
            "foreground": "#d3c6aa",
            "token": " variable.other.enummember"
          },
          {
            "foreground": "#d3c6aa",
            "token": " variable.other.member"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.object-literal.key"
          },
          {
            "foreground": "#d3c6aa",
            "token": "punctuation"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.brace"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.delimiter"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.bracket"
          },
          {
            "foreground": "#e67e80",
            "fontStyle": "bold",
            "token": "heading.1.markdown"
          },
          {
            "foreground": "#e67e80",
            "fontStyle": "bold",
            "token": " markup.heading.setext.1.markdown"
          },
          {
            "foreground": "#e69875",
            "fontStyle": "bold",
            "token": "heading.2.markdown"
          },
          {
            "foreground": "#e69875",
            "fontStyle": "bold",
            "token": " markup.heading.setext.2.markdown"
          },
          {
            "foreground": "#dbbc7f",
            "fontStyle": "bold",
            "token": "heading.3.markdown"
          },
          {
            "foreground": "#a7c080",
            "fontStyle": "bold",
            "token": "heading.4.markdown"
          },
          {
            "foreground": "#7fbbb3",
            "fontStyle": "bold",
            "token": "heading.5.markdown"
          },
          {
            "foreground": "#d699b6",
            "fontStyle": "bold",
            "token": "heading.6.markdown"
          },
          {
            "foreground": "#859289",
            "fontStyle": "regular",
            "token": "punctuation.definition.heading.markdown"
          },
          {
            "foreground": "#d699b6",
            "fontStyle": "regular",
            "token": "string.other.link.title.markdown"
          },
          {
            "foreground": "#d699b6",
            "fontStyle": "regular",
            "token": " constant.other.reference.link.markdown"
          },
          {
            "foreground": "#d699b6",
            "fontStyle": "regular",
            "token": " string.other.link.description.markdown"
          },
          {
            "foreground": "#a7c080",
            "fontStyle": "underline",
            "token": "markup.underline.link.image.markdown"
          },
          {
            "foreground": "#a7c080",
            "fontStyle": "underline",
            "token": " markup.underline.link.markdown"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.definition.string.begin.markdown"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.string.end.markdown"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.italic.markdown"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.quote.begin.markdown"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.metadata.markdown"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.key-value.markdown"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.constant.markdown"
          },
          {
            "foreground": "#859289",
            "fontStyle": "regular",
            "token": "punctuation.definition.bold.markdown"
          },
          {
            "foreground": "#859289",
            "fontStyle": "bold",
            "token": "meta.separator.markdown"
          },
          {
            "foreground": "#859289",
            "fontStyle": "bold",
            "token": " punctuation.definition.constant.begin.markdown"
          },
          {
            "foreground": "#859289",
            "fontStyle": "bold",
            "token": " punctuation.definition.constant.end.markdown"
          },
          {
            "fontStyle": "italic",
            "token": "markup.italic"
          },
          {
            "fontStyle": "bold",
            "token": "markup.bold"
          },
          {
            "fontStyle": "italic bold",
            "token": "markup.bold markup.italic"
          },
          {
            "fontStyle": "italic bold",
            "token": " markup.italic markup.bold"
          },
          {
            "foreground": "#dbbc7f",
            "token": "punctuation.definition.markdown"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.definition.raw.markdown"
          },
          {
            "foreground": "#dbbc7f",
            "token": "fenced_code.block.language"
          },
          {
            "foreground": "#a7c080",
            "token": "markup.fenced_code.block.markdown"
          },
          {
            "foreground": "#a7c080",
            "token": " markup.inline.raw.string.markdown"
          },
          {
            "foreground": "#e67e80",
            "token": "punctuation.definition.list.begin.markdown"
          },
          {
            "foreground": "#e69875",
            "fontStyle": "bold",
            "token": "punctuation.definition.heading.restructuredtext"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.definition.field.restructuredtext"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.key-value.restructuredtext"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.directive.restructuredtext"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.constant.restructuredtext"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.italic.restructuredtext"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.table.restructuredtext"
          },
          {
            "foreground": "#859289",
            "fontStyle": "regular",
            "token": "punctuation.definition.bold.restructuredtext"
          },
          {
            "foreground": "#83c092",
            "token": "entity.name.tag.restructuredtext"
          },
          {
            "foreground": "#83c092",
            "token": " punctuation.definition.link.restructuredtext"
          },
          {
            "foreground": "#83c092",
            "token": " punctuation.definition.raw.restructuredtext"
          },
          {
            "foreground": "#83c092",
            "token": " punctuation.section.raw.restructuredtext"
          },
          {
            "foreground": "#d699b6",
            "token": "constant.other.footnote.link.restructuredtext"
          },
          {
            "foreground": "#e67e80",
            "token": "support.directive.restructuredtext"
          },
          {
            "foreground": "#a7c080",
            "token": "entity.name.directive.restructuredtext"
          },
          {
            "foreground": "#a7c080",
            "token": " markup.raw.restructuredtext"
          },
          {
            "foreground": "#a7c080",
            "token": " markup.raw.inner.restructuredtext"
          },
          {
            "foreground": "#a7c080",
            "token": " string.other.link.title.restructuredtext"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.definition.function.latex"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.function.tex"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.keyword.latex"
          },
          {
            "foreground": "#859289",
            "token": " constant.character.newline.tex"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.keyword.tex"
          },
          {
            "foreground": "#e67e80",
            "token": "support.function.be.latex"
          },
          {
            "foreground": "#e69875",
            "token": "support.function.section.latex"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.control.table.cell.latex"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.control.table.newline.latex"
          },
          {
            "foreground": "#dbbc7f",
            "token": "support.class.latex"
          },
          {
            "foreground": "#dbbc7f",
            "token": " variable.parameter.latex"
          },
          {
            "foreground": "#dbbc7f",
            "token": " variable.parameter.function.latex"
          },
          {
            "foreground": "#dbbc7f",
            "token": " variable.parameter.definition.label.latex"
          },
          {
            "foreground": "#dbbc7f",
            "token": " constant.other.reference.label.latex"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.preamble.latex"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.separator.namespace.xml"
          },
          {
            "foreground": "#e69875",
            "token": "entity.name.tag.html"
          },
          {
            "foreground": "#e69875",
            "token": " entity.name.tag.xml"
          },
          {
            "foreground": "#e69875",
            "token": " entity.name.tag.localname.xml"
          },
          {
            "foreground": "#dbbc7f",
            "token": "entity.other.attribute-name.html"
          },
          {
            "foreground": "#dbbc7f",
            "token": " entity.other.attribute-name.xml"
          },
          {
            "foreground": "#dbbc7f",
            "token": " entity.other.attribute-name.localname.xml"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.html"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.html"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.html"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.html"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.separator.key-value.html"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.xml"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.xml"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.xml"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.xml"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.tag.begin.html"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.tag.end.html"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.tag.xml"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.tag.xml"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.tag.preprocessor.xml"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.tag.other.html"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.tag.block.any.html"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.tag.inline.any.html"
          },
          {
            "foreground": "#d699b6",
            "token": "variable.language.documentroot.xml"
          },
          {
            "foreground": "#d699b6",
            "token": " meta.tag.sgml.doctype.xml"
          },
          {
            "foreground": "#dbbc7f",
            "token": "storage.type.proto"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.proto.syntax"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.proto.syntax"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.proto"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.proto"
          },
          {
            "foreground": "#83c092",
            "token": "entity.name.class.proto"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.class.message.proto"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.definition.entity.css"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.key-value.css"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.terminator.rule.css"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.list.comma.css"
          },
          {
            "foreground": "#e67e80",
            "token": "entity.other.attribute-name.class.css"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.other.unit"
          },
          {
            "foreground": "#dbbc7f",
            "token": "entity.other.attribute-name.pseudo-class.css"
          },
          {
            "foreground": "#dbbc7f",
            "token": " entity.other.attribute-name.pseudo-element.css"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.single.css"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.css"
          },
          {
            "foreground": "#a7c080",
            "token": " support.constant.property-value.css"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.property-value.css"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.css"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.css"
          },
          {
            "foreground": "#a7c080",
            "token": " constant.numeric.css"
          },
          {
            "foreground": "#a7c080",
            "token": " support.constant.font-name.css"
          },
          {
            "foreground": "#a7c080",
            "token": " variable.parameter.keyframe-list.css"
          },
          {
            "foreground": "#83c092",
            "token": "support.type.property-name.css"
          },
          {
            "foreground": "#7fbbb3",
            "token": "support.type.vendored.property-name.css"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.name.tag.css"
          },
          {
            "foreground": "#d699b6",
            "token": " entity.other.keyframe-offset.css"
          },
          {
            "foreground": "#d699b6",
            "token": " punctuation.definition.keyword.css"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.at-rule.keyframes.css"
          },
          {
            "foreground": "#d699b6",
            "token": " meta.selector.css"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.definition.entity.scss"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.key-value.scss"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.terminator.rule.scss"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.list.comma.scss"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.control.at-rule.keyframes.scss"
          },
          {
            "foreground": "#dbbc7f",
            "token": "punctuation.definition.interpolation.begin.bracket.curly.scss"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.definition.interpolation.end.bracket.curly.scss"
          },
          {
            "foreground": "#a7c080",
            "token": "punctuation.definition.string.begin.scss"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.scss"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.scss"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.scss"
          },
          {
            "foreground": "#a7c080",
            "token": " constant.character.css.sass"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.property-value.scss"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.at-rule.include.scss"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.at-rule.use.scss"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.at-rule.mixin.scss"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.at-rule.extend.scss"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.at-rule.import.scss"
          },
          {
            "foreground": "#d3c6aa",
            "token": "meta.function.stylus"
          },
          {
            "foreground": "#dbbc7f",
            "token": "entity.name.function.stylus"
          },
          {
            "foreground": "#d3c6aa",
            "token": "string.unquoted.js"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.accessor.js"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.key-value.js"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.label.js"
          },
          {
            "foreground": "#859289",
            "token": " keyword.operator.accessor.js"
          },
          {
            "foreground": "#e67e80",
            "token": "punctuation.definition.block.tag.jsdoc"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.js"
          },
          {
            "foreground": "#e69875",
            "token": " storage.type.function.arrow.js"
          },
          {
            "foreground": "#d3c6aa",
            "token": "JSXNested"
          },
          {
            "foreground": "#a7c080",
            "token": "punctuation.definition.tag.jsx"
          },
          {
            "foreground": "#a7c080",
            "token": " entity.other.attribute-name.jsx"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.tag.begin.js.jsx"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.tag.end.js.jsx"
          },
          {
            "foreground": "#a7c080",
            "token": " entity.other.attribute-name.js.jsx"
          },
          {
            "foreground": "#d3c6aa",
            "token": "entity.name.type.module.ts"
          },
          {
            "foreground": "#859289",
            "token": "keyword.operator.type.annotation.ts"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.accessor.ts"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.key-value.ts"
          },
          {
            "foreground": "#a7c080",
            "token": "punctuation.definition.tag.directive.ts"
          },
          {
            "foreground": "#a7c080",
            "token": " entity.other.attribute-name.directive.ts"
          },
          {
            "foreground": "#83c092",
            "token": "entity.name.type.ts"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.interface.ts"
          },
          {
            "foreground": "#83c092",
            "token": " entity.other.inherited-class.ts"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.alias.ts"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.class.ts"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.enum.ts"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.ts"
          },
          {
            "foreground": "#e69875",
            "token": " storage.type.function.arrow.ts"
          },
          {
            "foreground": "#e69875",
            "token": " storage.type.type.ts"
          },
          {
            "foreground": "#7fbbb3",
            "token": "entity.name.type.module.ts"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.import.ts"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.export.ts"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.type.namespace.ts"
          },
          {
            "foreground": "#d3c6aa",
            "token": "entity.name.type.module.tsx"
          },
          {
            "foreground": "#859289",
            "token": "keyword.operator.type.annotation.tsx"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.accessor.tsx"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.key-value.tsx"
          },
          {
            "foreground": "#a7c080",
            "token": "punctuation.definition.tag.directive.tsx"
          },
          {
            "foreground": "#a7c080",
            "token": " entity.other.attribute-name.directive.tsx"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.tag.begin.tsx"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.tag.end.tsx"
          },
          {
            "foreground": "#a7c080",
            "token": " entity.other.attribute-name.tsx"
          },
          {
            "foreground": "#83c092",
            "token": "entity.name.type.tsx"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.interface.tsx"
          },
          {
            "foreground": "#83c092",
            "token": " entity.other.inherited-class.tsx"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.alias.tsx"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.class.tsx"
          },
          {
            "foreground": "#83c092",
            "token": " entity.name.type.enum.tsx"
          },
          {
            "foreground": "#7fbbb3",
            "token": "entity.name.type.module.tsx"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.import.tsx"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.export.tsx"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.type.namespace.tsx"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.tsx"
          },
          {
            "foreground": "#e69875",
            "token": " storage.type.function.arrow.tsx"
          },
          {
            "foreground": "#e69875",
            "token": " storage.type.type.tsx"
          },
          {
            "foreground": "#e69875",
            "token": " support.class.component.tsx"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.function.coffee"
          },
          {
            "foreground": "#d3c6aa",
            "token": "meta.type-signature.purescript"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.other.double-colon.purescript"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.other.arrow.purescript"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.other.big-arrow.purescript"
          },
          {
            "foreground": "#dbbc7f",
            "token": "entity.name.function.purescript"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.single.purescript"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.purescript"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.purescript"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.purescript"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.triple.purescript"
          },
          {
            "foreground": "#a7c080",
            "token": " entity.name.type.purescript"
          },
          {
            "foreground": "#d699b6",
            "token": "support.other.module.purescript"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.dot.dart"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.primitive.dart"
          },
          {
            "foreground": "#dbbc7f",
            "token": "support.class.dart"
          },
          {
            "foreground": "#a7c080",
            "token": "entity.name.function.dart"
          },
          {
            "foreground": "#a7c080",
            "token": " string.interpolated.single.dart"
          },
          {
            "foreground": "#a7c080",
            "token": " string.interpolated.double.dart"
          },
          {
            "foreground": "#7fbbb3",
            "token": "variable.language.dart"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.other.import.dart"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.type.annotation.dart"
          },
          {
            "foreground": "#e67e80",
            "token": "entity.other.attribute-name.class.pug"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.function.pug"
          },
          {
            "foreground": "#83c092",
            "token": "entity.other.attribute-name.tag.pug"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.name.tag.pug"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.type.import.include.pug"
          },
          {
            "foreground": "#d3c6aa",
            "token": "meta.function-call.c"
          },
          {
            "foreground": "#d3c6aa",
            "token": " storage.modifier.array.bracket.square.c"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.function.definition.parameters.c"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.separator.dot-access.c"
          },
          {
            "foreground": "#859289",
            "token": " constant.character.escape.line-continuation.c"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.control.directive.include.c"
          },
          {
            "foreground": "#e67e80",
            "token": " punctuation.definition.directive.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.pragma.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.line.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.define.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.conditional.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.diagnostic.error.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.undef.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.conditional.ifdef.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.endif.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.conditional.ifndef.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.conditional.if.c"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.else.c"
          },
          {
            "foreground": "#e69875",
            "token": "punctuation.separator.pointer-access.c"
          },
          {
            "foreground": "#83c092",
            "token": "variable.other.member.c"
          },
          {
            "foreground": "#d3c6aa",
            "token": "meta.function-call.cpp"
          },
          {
            "foreground": "#d3c6aa",
            "token": " storage.modifier.array.bracket.square.cpp"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.function.definition.parameters.cpp"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.body.function.definition.cpp"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.separator.dot-access.cpp"
          },
          {
            "foreground": "#859289",
            "token": " constant.character.escape.line-continuation.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.control.directive.include.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " punctuation.definition.directive.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.pragma.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.line.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.define.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.conditional.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.diagnostic.error.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.undef.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.conditional.ifdef.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.endif.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.conditional.ifndef.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.conditional.if.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.else.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " storage.type.namespace.definition.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.other.using.directive.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": " storage.type.struct.cpp"
          },
          {
            "foreground": "#e69875",
            "token": "punctuation.separator.pointer-access.cpp"
          },
          {
            "foreground": "#e69875",
            "token": " punctuation.section.angle-brackets.begin.template.call.cpp"
          },
          {
            "foreground": "#e69875",
            "token": " punctuation.section.angle-brackets.end.template.call.cpp"
          },
          {
            "foreground": "#83c092",
            "token": "variable.other.member.cpp"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.other.using.cs"
          },
          {
            "foreground": "#dbbc7f",
            "token": "keyword.type.cs"
          },
          {
            "foreground": "#dbbc7f",
            "token": " constant.character.escape.cs"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.definition.interpolation.begin.cs"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.definition.interpolation.end.cs"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.cs"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.cs"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.cs"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.cs"
          },
          {
            "foreground": "#83c092",
            "token": "variable.other.object.property.cs"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.name.type.namespace.cs"
          },
          {
            "foreground": "#d3c6aa",
            "token": "keyword.symbol.fsharp"
          },
          {
            "foreground": "#d3c6aa",
            "token": " constant.language.unit.fsharp"
          },
          {
            "foreground": "#dbbc7f",
            "token": "keyword.format.specifier.fsharp"
          },
          {
            "foreground": "#dbbc7f",
            "token": " entity.name.type.fsharp"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.fsharp"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.fsharp"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.fsharp"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.fsharp"
          },
          {
            "foreground": "#7fbbb3",
            "token": "entity.name.section.fsharp"
          },
          {
            "foreground": "#d699b6",
            "token": "support.function.attribute.fsharp"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.separator.java"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.period.java"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.other.import.java"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.other.package.java"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.function.arrow.java"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.control.ternary.java"
          },
          {
            "foreground": "#83c092",
            "token": "variable.other.property.java"
          },
          {
            "foreground": "#d699b6",
            "token": "variable.language.wildcard.java"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.modifier.import.java"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.type.annotation.java"
          },
          {
            "foreground": "#d699b6",
            "token": " punctuation.definition.annotation.java"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.modifier.package.java"
          },
          {
            "foreground": "#d699b6",
            "token": " entity.name.type.module.java"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.other.import.kotlin"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.kotlin"
          },
          {
            "foreground": "#83c092",
            "token": "constant.language.kotlin"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.name.package.kotlin"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.type.annotation.kotlin"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.name.package.scala"
          },
          {
            "foreground": "#7fbbb3",
            "token": "constant.language.scala"
          },
          {
            "foreground": "#83c092",
            "token": "entity.name.import.scala"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.scala"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.scala"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.scala"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.scala"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.interpolated.scala"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.interpolated.scala"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.triple.scala"
          },
          {
            "foreground": "#dbbc7f",
            "token": "entity.name.class"
          },
          {
            "foreground": "#dbbc7f",
            "token": " entity.other.inherited-class.scala"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.declaration.stable.scala"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.other.arrow.scala"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.other.import.scala"
          },
          {
            "foreground": "#d3c6aa",
            "token": "keyword.operator.navigation.groovy"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.method.body.java"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.definition.method.groovy"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.definition.method.signature.java"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.separator.groovy"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.other.import.groovy"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.other.package.groovy"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.other.import.static.groovy"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.def.groovy"
          },
          {
            "foreground": "#a7c080",
            "token": "variable.other.interpolated.groovy"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.method.groovy"
          },
          {
            "foreground": "#83c092",
            "token": "storage.modifier.import.groovy"
          },
          {
            "foreground": "#83c092",
            "token": " storage.modifier.package.groovy"
          },
          {
            "foreground": "#d699b6",
            "token": "storage.type.annotation.groovy"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.type.go"
          },
          {
            "foreground": "#83c092",
            "token": "entity.name.package.go"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.import.go"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.package.go"
          },
          {
            "foreground": "#d3c6aa",
            "token": "entity.name.type.mod.rust"
          },
          {
            "foreground": "#859289",
            "token": "keyword.operator.path.rust"
          },
          {
            "foreground": "#859289",
            "token": " keyword.operator.member-access.rust"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.rust"
          },
          {
            "foreground": "#83c092",
            "token": "support.constant.core.rust"
          },
          {
            "foreground": "#d699b6",
            "token": "meta.attribute.rust"
          },
          {
            "foreground": "#d699b6",
            "token": " variable.language.rust"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.type.module.rust"
          },
          {
            "foreground": "#d3c6aa",
            "token": "meta.function-call.swift"
          },
          {
            "foreground": "#d3c6aa",
            "token": " support.function.any-method.swift"
          },
          {
            "foreground": "#83c092",
            "token": "support.variable.swift"
          },
          {
            "foreground": "#d3c6aa",
            "token": "keyword.operator.class.php"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.trait.php"
          },
          {
            "foreground": "#83c092",
            "token": "constant.language.php"
          },
          {
            "foreground": "#83c092",
            "token": " support.other.namespace.php"
          },
          {
            "foreground": "#7fbbb3",
            "token": "storage.type.modifier.access.control.public.cpp"
          },
          {
            "foreground": "#7fbbb3",
            "token": " storage.type.modifier.access.control.private.cpp"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.import.include.php"
          },
          {
            "foreground": "#d699b6",
            "token": " storage.type.php"
          },
          {
            "foreground": "#d3c6aa",
            "token": "meta.function-call.arguments.python"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.definition.decorator.python"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.period.python"
          },
          {
            "foreground": "#83c092",
            "token": "constant.language.python"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.import.python"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.import.from.python"
          },
          {
            "foreground": "#83c092",
            "token": "constant.language.lua"
          },
          {
            "foreground": "#7fbbb3",
            "token": "entity.name.class.lua"
          },
          {
            "foreground": "#d3c6aa",
            "token": "meta.function.method.with-arguments.ruby"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.separator.method.ruby"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.control.pseudo-method.ruby"
          },
          {
            "foreground": "#e69875",
            "token": " storage.type.variable.ruby"
          },
          {
            "foreground": "#a7c080",
            "token": "keyword.other.special-method.ruby"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.module.ruby"
          },
          {
            "foreground": "#d699b6",
            "token": " punctuation.definition.constant.ruby"
          },
          {
            "foreground": "#dbbc7f",
            "token": "string.regexp.character-class.ruby"
          },
          {
            "foreground": "#dbbc7f",
            "token": "string.regexp.interpolated.ruby"
          },
          {
            "foreground": "#dbbc7f",
            "token": "punctuation.definition.character-class.ruby"
          },
          {
            "foreground": "#dbbc7f",
            "token": "string.regexp.group.ruby"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.section.regexp.ruby"
          },
          {
            "foreground": "#dbbc7f",
            "token": " punctuation.definition.group.ruby"
          },
          {
            "foreground": "#7fbbb3",
            "token": "variable.other.constant.ruby"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.other.arrow.haskell"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.other.big-arrow.haskell"
          },
          {
            "foreground": "#e69875",
            "token": " keyword.other.double-colon.haskell"
          },
          {
            "foreground": "#dbbc7f",
            "token": "storage.type.haskell"
          },
          {
            "foreground": "#a7c080",
            "token": "constant.other.haskell"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.haskell"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.haskell"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.haskell"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.haskell"
          },
          {
            "foreground": "#7fbbb3",
            "token": "entity.name.function.haskell"
          },
          {
            "foreground": "#83c092",
            "token": "entity.name.namespace"
          },
          {
            "foreground": "#83c092",
            "token": " meta.preprocessor.haskell"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.control.import.julia"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.export.julia"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.storage.modifier.julia"
          },
          {
            "foreground": "#83c092",
            "token": "constant.language.julia"
          },
          {
            "foreground": "#d699b6",
            "token": "support.function.macro.julia"
          },
          {
            "foreground": "#d3c6aa",
            "token": "keyword.other.period.elm"
          },
          {
            "foreground": "#dbbc7f",
            "token": "storage.type.elm"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.other.r"
          },
          {
            "foreground": "#a7c080",
            "token": "entity.name.function.r"
          },
          {
            "foreground": "#a7c080",
            "token": " variable.function.r"
          },
          {
            "foreground": "#83c092",
            "token": "constant.language.r"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.namespace.r"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.separator.module-function.erlang"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.section.directive.begin.erlang"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.control.directive.erlang"
          },
          {
            "foreground": "#e67e80",
            "token": " keyword.control.directive.define.erlang"
          },
          {
            "foreground": "#dbbc7f",
            "token": "entity.name.type.class.module.erlang"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.erlang"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.erlang"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.erlang"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.erlang"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.directive.export.erlang"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.directive.module.erlang"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.directive.import.erlang"
          },
          {
            "foreground": "#d699b6",
            "token": " keyword.control.directive.behaviour.erlang"
          },
          {
            "foreground": "#83c092",
            "token": "variable.other.readwrite.module.elixir"
          },
          {
            "foreground": "#83c092",
            "token": " punctuation.definition.variable.elixir"
          },
          {
            "foreground": "#7fbbb3",
            "token": "constant.language.elixir"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.module.elixir"
          },
          {
            "foreground": "#d3c6aa",
            "token": "entity.name.type.value-signature.ocaml"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.other.ocaml"
          },
          {
            "foreground": "#83c092",
            "token": "constant.language.variant.ocaml"
          },
          {
            "foreground": "#e67e80",
            "token": "storage.type.sub.perl"
          },
          {
            "foreground": "#e67e80",
            "token": " storage.type.declare.routine.perl"
          },
          {
            "foreground": "#d3c6aa",
            "token": "meta.function.lisp"
          },
          {
            "foreground": "#e67e80",
            "token": "storage.type.function-type.lisp"
          },
          {
            "foreground": "#a7c080",
            "token": "keyword.constant.lisp"
          },
          {
            "foreground": "#83c092",
            "token": "entity.name.function.lisp"
          },
          {
            "foreground": "#a7c080",
            "token": "constant.keyword.clojure"
          },
          {
            "foreground": "#a7c080",
            "token": " support.variable.clojure"
          },
          {
            "foreground": "#a7c080",
            "token": " meta.definition.variable.clojure"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.global.clojure"
          },
          {
            "foreground": "#7fbbb3",
            "token": "entity.name.function.clojure"
          },
          {
            "foreground": "#d3c6aa",
            "token": "meta.scope.if-block.shell"
          },
          {
            "foreground": "#d3c6aa",
            "token": " meta.scope.group.shell"
          },
          {
            "foreground": "#dbbc7f",
            "token": "support.function.builtin.shell"
          },
          {
            "foreground": "#dbbc7f",
            "token": " entity.name.function.shell"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.shell"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.shell"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.shell"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.shell"
          },
          {
            "foreground": "#a7c080",
            "token": " string.unquoted.heredoc.shell"
          },
          {
            "foreground": "#d699b6",
            "token": "keyword.control.heredoc-token.shell"
          },
          {
            "foreground": "#d699b6",
            "token": " variable.other.normal.shell"
          },
          {
            "foreground": "#d699b6",
            "token": " punctuation.definition.variable.shell"
          },
          {
            "foreground": "#d699b6",
            "token": " variable.other.special.shell"
          },
          {
            "foreground": "#d699b6",
            "token": " variable.other.positional.shell"
          },
          {
            "foreground": "#d699b6",
            "token": " variable.other.bracket.shell"
          },
          {
            "foreground": "#e67e80",
            "token": "support.function.builtin.fish"
          },
          {
            "foreground": "#e69875",
            "token": "support.function.unix.fish"
          },
          {
            "foreground": "#7fbbb3",
            "token": "variable.other.normal.fish"
          },
          {
            "foreground": "#7fbbb3",
            "token": " punctuation.definition.variable.fish"
          },
          {
            "foreground": "#7fbbb3",
            "token": " variable.other.fixed.fish"
          },
          {
            "foreground": "#7fbbb3",
            "token": " variable.other.special.fish"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.fish"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.fish"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.fish"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.fish"
          },
          {
            "foreground": "#d699b6",
            "token": "constant.character.escape.single.fish"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.definition.variable.powershell"
          },
          {
            "foreground": "#dbbc7f",
            "token": "entity.name.function.powershell"
          },
          {
            "foreground": "#dbbc7f",
            "token": " support.function.attribute.powershell"
          },
          {
            "foreground": "#dbbc7f",
            "token": " support.function.powershell"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.single.powershell"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.powershell"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.powershell"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.powershell"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.heredoc.powershell"
          },
          {
            "foreground": "#83c092",
            "token": "variable.other.member.powershell"
          },
          {
            "foreground": "#d3c6aa",
            "token": "string.unquoted.alias.graphql"
          },
          {
            "foreground": "#e67e80",
            "token": "keyword.type.graphql"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.name.fragment.graphql"
          },
          {
            "foreground": "#e69875",
            "token": "entity.name.function.target.makefile"
          },
          {
            "foreground": "#dbbc7f",
            "token": "variable.other.makefile"
          },
          {
            "foreground": "#a7c080",
            "token": "meta.scope.prerequisites.makefile"
          },
          {
            "foreground": "#a7c080",
            "token": "string.source.cmake"
          },
          {
            "foreground": "#83c092",
            "token": "entity.source.cmake"
          },
          {
            "foreground": "#d699b6",
            "token": "storage.source.cmake"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.definition.map.viml"
          },
          {
            "foreground": "#e69875",
            "token": "storage.type.map.viml"
          },
          {
            "foreground": "#a7c080",
            "token": "constant.character.map.viml"
          },
          {
            "foreground": "#a7c080",
            "token": " constant.character.map.key.viml"
          },
          {
            "foreground": "#7fbbb3",
            "token": "constant.character.map.special.viml"
          },
          {
            "foreground": "#a7c080",
            "token": "constant.language.tmux"
          },
          {
            "foreground": "#a7c080",
            "token": " constant.numeric.tmux"
          },
          {
            "foreground": "#e69875",
            "token": "entity.name.function.package-manager.dockerfile"
          },
          {
            "foreground": "#dbbc7f",
            "token": "keyword.operator.flag.dockerfile"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.dockerfile"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.dockerfile"
          },
          {
            "foreground": "#83c092",
            "token": "constant.character.escape.dockerfile"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.name.type.base-image.dockerfile"
          },
          {
            "foreground": "#d699b6",
            "token": " entity.name.image.dockerfile"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.definition.separator.diff"
          },
          {
            "foreground": "#e67e80",
            "token": "markup.deleted.diff"
          },
          {
            "foreground": "#e67e80",
            "token": " punctuation.definition.deleted.diff"
          },
          {
            "foreground": "#e69875",
            "token": "meta.diff.range.context"
          },
          {
            "foreground": "#e69875",
            "token": " punctuation.definition.range.diff"
          },
          {
            "foreground": "#dbbc7f",
            "token": "meta.diff.header.from-file"
          },
          {
            "foreground": "#a7c080",
            "token": "markup.inserted.diff"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.inserted.diff"
          },
          {
            "foreground": "#7fbbb3",
            "token": "markup.changed.diff"
          },
          {
            "foreground": "#7fbbb3",
            "token": " punctuation.definition.changed.diff"
          },
          {
            "foreground": "#d699b6",
            "token": "punctuation.definition.from-file.diff"
          },
          {
            "foreground": "#e67e80",
            "token": "entity.name.section.group-title.ini"
          },
          {
            "foreground": "#e67e80",
            "token": " punctuation.definition.entity.ini"
          },
          {
            "foreground": "#e69875",
            "token": "punctuation.separator.key-value.ini"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.ini"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.ini"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.ini"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.ini"
          },
          {
            "foreground": "#83c092",
            "token": "keyword.other.definition.ini"
          },
          {
            "foreground": "#dbbc7f",
            "token": "support.function.aggregate.sql"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.single.sql"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.sql"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.sql"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.sql"
          },
          {
            "foreground": "#dbbc7f",
            "token": "support.type.graphql"
          },
          {
            "foreground": "#7fbbb3",
            "token": "variable.parameter.graphql"
          },
          {
            "foreground": "#83c092",
            "token": "constant.character.enum.graphql"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.support.type.property-name.begin.json"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.support.type.property-name.end.json"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.dictionary.key-value.json"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.string.begin.json"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.definition.string.end.json"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.dictionary.pair.json"
          },
          {
            "foreground": "#859289",
            "token": " punctuation.separator.array.json"
          },
          {
            "foreground": "#e69875",
            "token": "support.type.property-name.json"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.double.json"
          },
          {
            "foreground": "#859289",
            "token": "punctuation.separator.key-value.mapping.yaml"
          },
          {
            "foreground": "#a7c080",
            "token": "string.unquoted.plain.out.yaml"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.yaml"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.double.yaml"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.begin.yaml"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.string.end.yaml"
          },
          {
            "foreground": "#a7c080",
            "token": " string.unquoted.plain.in.yaml"
          },
          {
            "foreground": "#a7c080",
            "token": " string.unquoted.block.yaml"
          },
          {
            "foreground": "#83c092",
            "token": "punctuation.definition.anchor.yaml"
          },
          {
            "foreground": "#83c092",
            "token": " punctuation.definition.block.sequence.item.yaml"
          },
          {
            "foreground": "#e69875",
            "token": "keyword.key.toml"
          },
          {
            "foreground": "#a7c080",
            "token": "string.quoted.single.basic.line.toml"
          },
          {
            "foreground": "#a7c080",
            "token": " string.quoted.single.literal.line.toml"
          },
          {
            "foreground": "#a7c080",
            "token": " punctuation.definition.keyValuePair.toml"
          },
          {
            "foreground": "#7fbbb3",
            "token": "constant.other.boolean.toml"
          },
          {
            "foreground": "#d699b6",
            "token": "entity.other.attribute-name.table.toml"
          },
          {
            "foreground": "#d699b6",
            "token": " punctuation.definition.table.toml"
          },
          {
            "foreground": "#d699b6",
            "token": " entity.other.attribute-name.table.array.toml"
          },
          {
            "foreground": "#d699b6",
            "token": " punctuation.definition.table.array.toml"
          },
          {
            "foreground": "#859289",
            "fontStyle": "italic",
            "token": "comment"
          },
          {
            "foreground": "#859289",
            "fontStyle": "italic",
            "token": " string.comment"
          },
          {
            "foreground": "#859289",
            "fontStyle": "italic",
            "token": " punctuation.definition.comment"
          }
        ],
        "encodedTokensColors": []
      }
}