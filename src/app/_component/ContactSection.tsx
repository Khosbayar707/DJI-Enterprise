import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-blue-600">Холбоо</span> барих
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Бидэнтэй холбогдохын тулд доорх мэдээллийг ашиглана уу
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Бидэнтэй холбогдох</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Нэр
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  И-мэйл
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Утас
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Мессеж
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Илгээх
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold">Холбоо барих мэдээлэл</h3>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaPhone className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Утас</h4>
                <p className="text-gray-600">+976 7011 2233</p>
                <p className="text-gray-600">+976 8811 4455</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaEnvelope className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">И-мэйл</h4>
                <p className="text-gray-600">info@engineer-geodesy.mn</p>
                <p className="text-gray-600">sales@engineer-geodesy.mn</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaMapMarkerAlt className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Хаяг</h4>
                <p className="text-gray-600">
                  Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Жуулчны гудамж
                  34-1, "Геодезийн төв" байр
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaClock className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Ажиллах цаг</h4>
                <p className="text-gray-600">Даваа-Баасан: 09:00 - 18:00</p>
                <p className="text-gray-600">Бямба-Ням: Амарна</p>
              </div>
            </div>

            <div className="pt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.063079710459!2d106.9172763156313!3d47.91848507920593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96925be2b18a8f%3A0x7580a8e7c6d6b5b1!2sSukhbaatar%20Square!5e0!3m2!1sen!2smn!4v1620000000000!5m2!1sen!2smn"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg shadow"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
