"use client"

import React, { useContext, useCallback } from 'react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { loadingContext } from '@/src/contexts/LoadingContext'

interface LinkProps extends Omit<React.ComponentPropsWithoutRef<typeof NextLink>, 'href' | 'onClick'> {
  children: React.ReactNode
  href: string
  target?: string
  prefetch?: boolean
  handleClick?: () => void
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const EXTERNAL_URL_REGEX = /^(https?:|mailto:|tel:|wa\.me)/
const LOADING_DELAY = 1000

function Link({ 
  children, 
  href, 
  target, 
  handleClick, 
  prefetch = false,
  onClick,
  ...props 
}: LinkProps) {
  const { setIsPageFetched } = useContext(loadingContext)
  const router = useRouter()
  const pathname = usePathname()

  const isExternalUrl = EXTERNAL_URL_REGEX.test(href)
  const shouldUseCustomNavigation = target !== '_blank' && !isExternalUrl

  const handleNavigation = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call external onClick first if provided
    if (onClick) {
      onClick(e)
    }

    e.preventDefault()
    
    if (handleClick) {
      handleClick()
    }
    
    const normalizedTarget = href.replace(/\/+$/, '') || '/'
    const normalizedPathname = pathname.replace(/\/+$/, '') || '/'

    if (normalizedTarget !== normalizedPathname) {
      setIsPageFetched('loading')
      setTimeout(() => router.push(href), LOADING_DELAY)
    }
  }, [href, pathname, handleClick, onClick, setIsPageFetched, router])

  return (
    <NextLink 
      onClick={shouldUseCustomNavigation ? handleNavigation : onClick}
      href={href} 
      target={target} 
      prefetch={prefetch} 
      {...props}
    >
      {children}
    </NextLink>
  )
}

export default Link