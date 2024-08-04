import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ height: "100%", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <h1>Page not found</h1>
      <Link href="/">Go back to map</Link>
    </div>
  )
}