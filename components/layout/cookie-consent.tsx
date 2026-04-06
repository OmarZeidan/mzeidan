"use client"

import { useState, useEffect } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Button } from "@/components/ui/button"
import { CookieIcon } from "@phosphor-icons/react"

const CONSENT_KEY = "cookie-consent"

export function CookieConsent({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    const delay = stored === "accepted" || stored === "declined" ? 0 : 600
    const t = setTimeout(() => {
      if (stored === "accepted") setConsent("accepted")
      else if (stored === "declined") setConsent("declined")
      else setVisible(true)
    }, delay)
    return () => clearTimeout(t)
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted")
    setConsent("accepted")
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined")
    setConsent("declined")
    setVisible(false)
  }

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics gaId={gaId} />}

      <div
        role="dialog"
        aria-label="إشعار ملفات تعريف الارتباط"
        aria-live="polite"
        className={[
          "fixed right-6 bottom-6 z-50 w-80",
          "rounded-2xl border border-border bg-background/95 backdrop-blur-md",
          "shadow-xl ring-1 ring-black/5 dark:ring-white/10",
          "transition-all duration-500 ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0",
        ].join(" ")}
      >
        {/* Header strip */}
        <div className="flex items-center gap-3 rounded-t-2xl bg-primary/8 px-5 py-4">
          <CookieIcon
            className="size-5 shrink-0 text-primary"
            weight="duotone"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-foreground">
            ملفات تعريف الارتباط
          </p>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            نستخدم Google Analytics لفهم كيفية تفاعل الزوار مع الموقع. البيانات
            مجهولة الهوية ولن تُشارك مع أي طرف ثالث.
          </p>

          <div className="mt-4 flex gap-2">
            <Button size="sm" className="flex-1" onClick={accept}>
              قبول
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={decline}
            >
              رفض
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
