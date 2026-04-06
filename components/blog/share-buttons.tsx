"use client"

import { WhatsappLogoIcon, XLogoIcon, LinkIcon, CheckIcon, ShareNetworkIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { useEffect, useState } from "react"
import { sendGAEvent } from "@next/third-parties/google"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const { copied, copy } = useCopyToClipboard()
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator)
  }, [])

  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(`${title}\n${url}`)

  return (
    <div
      role="group"
      aria-label="مشاركة المقال"
      className="flex flex-wrap items-center gap-2"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="outline" size="icon-sm">
            <a
              href={`https://wa.me/?text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="مشاركة عبر واتساب"
              onClick={() => sendGAEvent("event", "share", { method: "whatsapp", content_type: "post", item_id: url })}
            >
              <WhatsappLogoIcon weight="regular" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>واتساب</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="outline" size="icon-sm">
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="مشاركة عبر X"
              onClick={() => sendGAEvent("event", "share", { method: "x", content_type: "post", item_id: url })}
            >
              <XLogoIcon weight="regular" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>X / تويتر</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={copied ? "تم النسخ" : "نسخ الرابط"}
            onClick={() => { copy(url); sendGAEvent("event", "share", { method: "copy_link", content_type: "post", item_id: url }) }}
          >
            {copied ? (
              <CheckIcon weight="regular" className="text-primary" />
            ) : (
              <LinkIcon weight="regular" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copied ? "تم النسخ!" : "نسخ الرابط"}</TooltipContent>
      </Tooltip>

      {canShare && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="مشاركة"
              onClick={() => { navigator.share({ title, url }).catch(() => null); sendGAEvent("event", "share", { method: "native", content_type: "post", item_id: url }) }}
            >
              <ShareNetworkIcon weight="regular" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>مشاركة</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
