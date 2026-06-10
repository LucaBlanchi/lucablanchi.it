function initLanguageTabs() {
  const tabs = Array.from(document.querySelectorAll("[data-lang-tab]"))
  const panels = Array.from(document.querySelectorAll("[data-lang-panel]"))

  if (!tabs.length || !panels.length) return

  function activate(lang) {
    for (const tab of tabs) {
      const selected = tab.dataset.langTab === lang
      tab.setAttribute("aria-selected", selected ? "true" : "false")
      tab.tabIndex = selected ? 0 : -1
    }

    for (const panel of panels) {
      panel.hidden = panel.dataset.langPanel !== lang
    }

    document.documentElement.lang = lang
  }

  for (const tab of tabs) {
    tab.addEventListener("click", () => activate(tab.dataset.langTab))
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return

      event.preventDefault()
      const index = tabs.indexOf(tab)
      const nextIndex = event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length
      tabs[nextIndex].focus()
      activate(tabs[nextIndex].dataset.langTab)
    })
  }

  activate("it")
}

document.addEventListener("DOMContentLoaded", initLanguageTabs)
