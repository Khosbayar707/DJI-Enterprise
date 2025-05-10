const footerLinks = [
  {
    title: "Products",
    links: [
      "Matrice Series",
      "Mavic Series",
      "Phantom Series",
      "Payloads",
      "Software",
    ],
  },
  {
    title: "Solutions",
    links: [
      "Public Safety",
      "Energy",
      "Agriculture",
      "Construction",
      "Infrastructure",
    ],
  },
  {
    title: "Support",
    links: [
      "Product Support",
      "Repair Services",
      "Firmware Updates",
      "Contact Us",
    ],
  },
  {
    title: "About DJI",
    links: ["Who We Are", "Newsroom", "Careers", "Compliance"],
  },
];

const socialLinks = [
  { name: "YouTube", href: "https://youtube.com", icon: "/icons/youtube.svg" },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "/icons/facebook.svg",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "/icons/linkedin.svg",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {footerLinks.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-8 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DJI. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="h-5 w-5 hover:opacity-75 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
