import React from 'react'
import { PropsWithChildren } from 'react'
import './AnchorLink.scss'

interface CustomProps {
  href: string
};

type Props = PropsWithChildren<CustomProps>

export const AnchorLink:React.FC<Props> = React.memo(({ children, href }) => {
  return (
    <a href={href} className='AnchorLink'>
      {children}
    </a>
  )}
)
