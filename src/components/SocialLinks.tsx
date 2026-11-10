import { FACEBOOK_URL, INSTAGRAM_URL } from '../data/contact'
import { cx } from '../utils/cx'
import ExternalLink from './ExternalLink'
import { FacebookIcon, InstagramIcon } from './icons/SocialIcons'
import './SocialLinks.css'

interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
  onDark?: boolean
}

const socials = [
  { name: 'Instagram', url: INSTAGRAM_URL, label: '@helvellacr', Icon: InstagramIcon },
  { name: 'Facebook', url: FACEBOOK_URL, label: 'Helvella', Icon: FacebookIcon },
] as const

export default function SocialLinks({
  size = 'md',
  showLabels = false,
  onDark = false,
}: SocialLinksProps) {
  return (
    <div className={cx('social-links', `social-links--${size}`, onDark && 'social-links--on-dark')}>
      {socials.map(({ name, url, label, Icon }) => (
        <ExternalLink key={name} href={url} className="social-link" aria-label={name}>
          <Icon />
          {showLabels && <span>{label}</span>}
        </ExternalLink>
      ))}
    </div>
  )
}
