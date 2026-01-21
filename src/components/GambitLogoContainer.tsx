import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { GambitLogo } from './Icons';

function GambitLogoContainer() {
  const pathname = usePathname();
  const isFwdPage = pathname === "/fwd";

  return (
    <div className="top-15 w-fit left-(--space-x) absolute  h-[4em] z-999 _hide flex items-center">
        <Link
          href="/"
          className="flex items-center h-full"
          aria-label="Gambit Homepage"
        >
          {isFwdPage ? (
            <div className="dv_icon relative h-full z-20 opacity-0 -translate-y-5!">
              <Image
                src="/images/gambit-fwd-logo.svg"
                alt="Gambit FWD Logo"
                width={370}
                height={317}
                className="h-[7.31155rem] w-[10.62499rem]"
                priority
              />
            </div>
          ) : (
            <GambitLogo className="text-white w-44 flex items-center justify-center" />
          )}
        </Link>
      </div>
  )
}

export default GambitLogoContainer