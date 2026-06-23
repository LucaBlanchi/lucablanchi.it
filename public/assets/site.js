const LANGUAGE_STORAGE_KEY = "lucablanchi.preferredLanguage"
const SUPPORTED_LANGUAGES = new Set(["it", "en"])
const DATE_LOCALES = {
  en: "en-US",
  it: "it-IT",
}

function getStoredLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  } catch {
    return null
  }
}

function setStoredLanguage(lang) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  } catch {
    // Storage may be unavailable in private contexts; language tabs still work.
  }
}

function getRequestedLanguage() {
  const params = new URLSearchParams(window.location.search)
  const lang = params.get("lang")

  return SUPPORTED_LANGUAGES.has(lang) ? lang : null
}

function formatLocalizedDate(dateTime, lang) {
  const date = new Date(`${dateTime}T00:00:00`)

  return new Intl.DateTimeFormat(DATE_LOCALES[lang] || DATE_LOCALES.en, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

function updateLocalizedContent(lang) {
  for (const element of document.querySelectorAll("[data-l10n-text]")) {
    const value = element.dataset[`l10n${lang[0].toUpperCase()}${lang.slice(1)}`]

    if (value) {
      element.textContent = value
    }
  }

  for (const element of document.querySelectorAll("[data-l10n-date]")) {
    element.textContent = formatLocalizedDate(element.dataset.l10nDate, lang)
  }
}

function initLanguageSwitcher(switcher) {
  const tabs = Array.from(switcher.querySelectorAll("[data-lang-tab]"))
  const panels = tabs
    .map((tab) => document.getElementById(tab.getAttribute("aria-controls")))
    .filter(Boolean)

  if (!tabs.length || !panels.length) return

  function activate(lang, persist = true) {
    for (const tab of tabs) {
      const selected = tab.dataset.langTab === lang
      tab.setAttribute("aria-selected", selected ? "true" : "false")
      tab.tabIndex = selected ? 0 : -1
    }

    for (const panel of panels) {
      panel.hidden = panel.dataset.langPanel !== lang
    }

    document.documentElement.lang = lang
    updateLocalizedContent(lang)

    if (persist) {
      setStoredLanguage(lang)
    }
  }

  for (const tab of tabs) {
    tab.addEventListener("click", () => activate(tab.dataset.langTab))
    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab)
      const lastIndex = tabs.length - 1
      let nextIndex = currentIndex

      if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length
      else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
      else if (event.key === "Home") nextIndex = 0
      else if (event.key === "End") nextIndex = lastIndex
      else return

      event.preventDefault()
      tabs[nextIndex].focus()
      activate(tabs[nextIndex].dataset.langTab)
    })
  }

  const selectedLanguage =
    getRequestedLanguage() ||
    getStoredLanguage() ||
    switcher.dataset.defaultLang ||
    "en"

  activate(SUPPORTED_LANGUAGES.has(selectedLanguage) ? selectedLanguage : "en", false)
}

function initLanguageTabs() {
  for (const switcher of document.querySelectorAll("[data-language-switcher]")) {
    initLanguageSwitcher(switcher)
  }
}

function initSourceCopyButtons() {
  for (const button of document.querySelectorAll("[data-copy-source]")) {
    button.addEventListener("click", async () => {
      const disclosure = button.closest(".source-disclosure")
      const activePanel = disclosure?.querySelector(".source-panel:not([hidden]) pre")
      const sourceText = activePanel?.textContent || ""

      if (!sourceText) return

      try {
        await navigator.clipboard.writeText(sourceText)
        button.textContent = "Copied"
        window.setTimeout(() => {
          button.textContent = "Copy"
        }, 1600)
      } catch {
        button.textContent = "Copy failed"
        window.setTimeout(() => {
          button.textContent = "Copy"
        }, 1600)
      }
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageTabs()
  initSourceCopyButtons()
})
