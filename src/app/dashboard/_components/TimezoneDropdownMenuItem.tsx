import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { createURL } from "@/lib/utils";
import Link from 'next/link'

export function TimezoneDropdownMenuItem({
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  // Retrieve the user's timezone based on their system settings
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <DropdownMenuItem asChild>
      <Link
        href={createURL('/dashboard/analytics', searchParams, {
          timezone: userTimezone
        })}
      >
        {userTimezone}
      </Link>
    </DropdownMenuItem>
  )
}
