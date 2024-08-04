'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function SideNav() {

    const pathname = usePathname()
    console.log(pathname)

    return (
        <nav id="sidenav">
            <Link href="/" className={(pathname == "/" || (pathname.startsWith("/locations/") && !pathname.endsWith("new"))) ? "active" : "" }>
                <i aria-hidden className="fa-solid fa-map fa-xl"></i>
                <span>Map</span>
            </Link>
            <Link href="/data" className={pathname == "/data" ? "active" : "" }>
                <i aria-hidden className="fa-solid fa-database fa-xl"></i>
                <span>Data</span>
            </Link>
            <Link href="/activity" className={pathname == "/activity" ? "active" : "" }>
                <i aria-hidden className="fa-solid fa-timeline fa-xl"></i>
                <span>Activity</span>
            </Link>
            <Link href="/locations/new" className={pathname == "/locations/new" ? "active" : "" }>
                <i aria-hidden className="fa-solid fa-add fa-xl"></i>
                <span>Add location</span>
            </Link>
            <Link href="/about" className={pathname == "/about" ? "active" : "" }>
                <i aria-hidden className="fa-solid fa-info fa-xl"></i>
                <span>About</span>
            </Link>
        </nav>
    )
}