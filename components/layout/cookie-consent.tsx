"use client"

import { useState, useEffect } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Button } from "@/components/ui/button"
import { ShieldCheckIcon } from "@phosphor-icons/react"

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
          "fixed bottom-4 inset-x-4 z-50 mx-auto max-w-md",
          "rounded-2xl border border-border bg-background shadow-lg",
          "p-5 transition-all duration-500 ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="flex items-start gap-4">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheckIcon className="size-5" weight="duotone" />
          </span>

          <div className="flex-1 space-y-1">
            <p className="text-sm font-semibold text-foreground">
              نستخدم ملفات تعريف الارتباط
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              نستخدم Google Analytics لفهم كيفية تفاعل الزوار مع الموقع.
              البيانات مجهولة الهوية ولن تُشارك مع أي طرف ثالث.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={decline}>
            رفض
          </Button>
          <Button size="sm" onClick={accept}>
            قبول
          </Button>
        </div>
      </div>
    </>
  )
}
