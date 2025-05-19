"use client";

import { ContactInfoItemProps } from "@/app/_types/types";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      id="contact-form"
      className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-8 md:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Бидэнтэй холбогдох
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Нэр
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Утас
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Мессеж
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Илгээх
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <ContactInfoItem
              icon={<PhoneIcon className="h-6 w-6 text-blue-600" />}
              title="Утас"
              items={["+976 9999 9999", "+976 8888 8888"]}
            />
            <ContactInfoItem
              icon={<EnvelopeIcon className="h-6 w-6 text-blue-600" />}
              title="И-мэйл"
              items={["info@dronestore.mn", "sales@dronestore.mn"]}
            />
            <ContactInfoItem
              icon={<MapPinIcon className="h-6 w-6 text-blue-600" />}
              title="Хаяг"
              items={[
                "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Жуулчны гудамж 34-1",
              ]}
            />
            <div className="pt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.063079710459!2d106.8920424!3d47.9183684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96eccc00000001:0xd9419ff8407d6f3c!2z0JjQvdC20LXQvdC10YAg0LPQtdC-0LTQtdC5INCR0JDQlyDQodCQ0JcgLyBFbmdpbmVlcmluZyBnZW9kZXN5IExMQw!5e0!3m2!1smn!2smn!4v1716115200000!5m2!1smn!2smn"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg shadow"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContactInfoItem = ({ icon, title, items }: ContactInfoItemProps) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">{icon}</div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {items.map((item, index) => (
          <p key={index} className="text-gray-600">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
