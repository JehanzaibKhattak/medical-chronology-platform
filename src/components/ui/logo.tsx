import React from 'react'
import Image from 'next/image'
import logoImage from '@/assets/logo.png'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      <Image
        src={logoImage}
        alt="MedChron AI Logo"
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
