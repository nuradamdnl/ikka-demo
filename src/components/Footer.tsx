function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-6 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Left Section */}
          <div>
            <h3 className="font-bold text-yellow-400 mb-2">
              KEMENTERIAN DALAM NEGERI
            </h3>
            <p className="text-sm text-gray-300">
              Aras 6, Blok D1, Kompleks D,
              <br />
              Pusat Pentadbiran Kerajaan Persekutuan,
              <br />
              62546 Wilayah Persekutuan Putrajaya
            </p>
          </div>

          {/* Middle Section */}
          <div>
            <h3 className="font-bold text-yellow-400 mb-2">HUBUNGI KAMI</h3>
            <p className="text-sm text-gray-300">
              Tel: +603-8000 8000
              <br />
              Faks: +603-8888 8000
              <br />
              E-mel: info@kdn.gov.my
            </p>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="font-bold text-yellow-400 mb-2">PAUTAN PANTAS</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Portal Rasmi KDN
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Dasar Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Penafian
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-4 text-center text-sm text-gray-300">
          <p>
            Hakcipta Terpelihara © {currentYear} Kementerian Dalam Negeri Malaysia
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
