import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr"

export function EditPostButton({ id }: { id: string }) {
  const docId = id.replace(/^drafts\./, "")
  const studioUrl = `http://localhost:3333/structure/post;${docId}`

  return (
    <a
      href={studioUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
    >
      <PencilSimpleIcon className="size-4" aria-hidden="true" />
      Edit in Studio
    </a>
  )
}
