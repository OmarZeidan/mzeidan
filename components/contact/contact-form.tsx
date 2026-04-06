"use client"

import { useActionState, useEffect, useState } from "react"
import { PaperPlaneTiltIcon, SpinnerGapIcon, LockSimpleIcon, CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { sendContactEmail } from "@/app/actions/contact"
import { sendGAEvent } from "@next/third-parties/google"

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
    error: null,
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true)
      sendGAEvent("event", "generate_lead", { form_name: "contact" })
    }
  }, [state.success])

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-background/60 px-8 py-14 text-center">
        <CheckCircleIcon className="size-12 text-primary" weight="duotone" aria-hidden="true" />
        <h2 className="text-xl font-bold">وصلت رسالتك!</h2>
        <p className="text-base text-foreground/70">شكراً على تواصلك، سأرد عليك في أقرب وقت.</p>
        <Button variant="outline" className="mt-2" onClick={() => setShowSuccess(false)}>
          إرسال رسالة أخرى
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate aria-label="نموذج التواصل" className="space-y-5">
      {/* Honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            الاسم <span aria-hidden="true" className="text-primary">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={100}
            placeholder="اسمك الكريم"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            البريد الإلكتروني <span aria-hidden="true" className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="hello@example.com"
            dir="ltr"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          الرسالة <span aria-hidden="true" className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={3000}
          placeholder="اكتب رسالتك هنا..."
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>

      <Alert className="border-border/60 bg-muted/40">
        <LockSimpleIcon aria-hidden="true" />
        <AlertDescription>
          بياناتك لن تُستخدم إلا للرد على رسالتك، ولن تُشارك مع أي طرف ثالث.
        </AlertDescription>
      </Alert>

      {state.error && (
        <Alert variant="destructive">
          <WarningCircleIcon aria-hidden="true" />
          <AlertTitle>{state.error}</AlertTitle>
          <AlertDescription>يرجى المحاولة مرة أخرى.</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? (
          <>
            <SpinnerGapIcon className="size-4 animate-spin" aria-hidden="true" />
            جارٍ الإرسال...
          </>
        ) : (
          <>
            <PaperPlaneTiltIcon className="size-4" aria-hidden="true" />
            إرسال الرسالة
          </>
        )}
      </Button>
    </form>
  )
}
