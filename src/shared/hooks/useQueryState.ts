import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { usePathname, useRouter } from "@/shared/utils/navigation.ts";

export const useQueryState = <T extends string>(key: string, useId: boolean = true): [
    T | null | undefined,
  (value: T | null, replace?: boolean) => void,
] => {
  const [searchParams] = useSearchParams()
  const [queryId] = useState((Math.random() + 1).toString(36).substring(7))
  const keyId = useId ? `${key}_${queryId}` : `${key}`;
  const [keyValue, setKeyValue] = useState<T | null>(searchParams.get(keyId) as (T | null))
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setKeyValue(searchParams.get(keyId) as (T | null))
  }, [searchParams])

  const setValue = (value: T | null, replace = false) => {
    const currParams = new URLSearchParams(window.location.search)
    const currSearchParams = Object.assign({}, Object.fromEntries(currParams.entries()), { [keyId]: value })
    const path = `${pathname}?${new URLSearchParams(currSearchParams).toString()}`
    if (replace) {
      router.replace(path)
    } else {
      router.push(path)
    }
  }

  return [
    keyValue,
    setValue
  ]
}