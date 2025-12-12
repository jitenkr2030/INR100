import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Community", href: "/community" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
    Products: [
      { name: "Stocks", href: "/invest/stocks" },
      { name: "Mutual Funds", href: "/invest/mutual-funds" },
      { name: "Gold", href: "/invest/gold" },
      { name: "Global Assets", href: "/invest/global" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₹100</span>
              </div>
              <span className="text-2xl font-bold">INR100.com</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              India's leading micro-investing platform. Start your wealth journey with just ₹100. 
              Invest in stocks, mutual funds, gold, and global assets with AI-powered insights.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                />
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* App Download Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Get the INR100.com App</h4>
              <p className="text-gray-400">Invest on the go with our mobile app</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                <Gift className="mr-2 h-4 w-4" />
                App Store
              </Button>
              <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                <Gift className="mr-2 h-4 w-4" />
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 INR100.com. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>support@inr100.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>1800-100-1234</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              INR100.com is a SEBI registered investment platform. Investments in securities market are subject to market risks. 
              Read all the related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}