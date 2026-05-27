import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Winder Enterprise</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium furniture delivered to your door across West Bengal and Durgapur.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {['Sofas', 'Beds', 'Chairs', 'Tables', 'Wardrobes'].map(cat => (
                <li key={cat}>
                  <Link href={`/products?category=${cat.toLowerCase()}`} className="hover:text-gray-900">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div id="contact">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Durgapur, West Bengal</li>
              <li>WhatsApp: +91 XXXXXXXXXX</li>
              <li>winderenterprise.admin@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Winder Enterprise. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
