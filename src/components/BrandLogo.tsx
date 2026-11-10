import { Link } from 'react-router-dom'
import { LOGO_URL, SITE_NAME } from '../data/site'
import { cx } from '../utils/cx'
import './BrandLogo.css'

interface BrandLogoProps {
  className?: string
  alt?: string
  onClick?: () => void
}

export default function BrandLogo({ className, alt = SITE_NAME, onClick }: BrandLogoProps) {
  return (
    <Link to="/" className={cx('brand-logo', className)} onClick={onClick}>
      <span className="brand-logo__mark">
        <img src={LOGO_URL} alt={alt} width={64} height={64} />
      </span>
      <span className="brand-logo__name">{SITE_NAME}</span>
    </Link>
  )
}
