'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import ContactRequestFromUserSchema, {
  ContactRequestFromUserSchemaType,
} from './utils/contact-request-schema';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponseType } from '@/lib/types';
import { CustomSnackbar } from '../admin/_components/snackbar';

export default function ContactSection() {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm({
    resolver: zodResolver(ContactRequestFromUserSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactRequestFromUserSchemaType) => {
    try {
      const res = await axios.post('/api/client/contact-request', values);
      setResponse(res.data);
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      {response && <CustomSnackbar value={response} />}
      <div className="container mx-auto px-2 max-w-8xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            <span className="text-blue-600">Холбоо</span> барих
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Бидэнтэй холбогдохын тулд доорх мэдээллийг ашиглана уу
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
              Бидэнтэй холбогдох
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          variant="outlined"
                          label="Нэр"
                          fullWidth
                          {...field}
                          className="bg-gray-50"
                          InputProps={{
                            style: {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          variant="outlined"
                          label="И-мэйл"
                          fullWidth
                          {...field}
                          className="bg-gray-50"
                          InputProps={{
                            style: {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          type="tel"
                          variant="outlined"
                          label="Утасны дугаар"
                          fullWidth
                          {...field}
                          className="bg-gray-50"
                          InputProps={{
                            style: {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          variant="outlined"
                          label="Зурвас"
                          multiline
                          rows={4}
                          fullWidth
                          {...field}
                          className="bg-gray-50"
                          InputProps={{
                            style: {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-xl shadow-md"
                  startIcon={<FaPaperPlane />}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                  }}
                >
                  {form.formState.isSubmitting ? 'Илгээж байна...' : 'Илгээх'}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 border-b pb-4">
              Холбоо барих мэдээлэл
            </h3>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <FaPhone className="text-blue-600 text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-lg mb-4 text-gray-800">Утасны дугаар</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="bg-blue-100 p-1 rounded-full mr-2">
                          <FaPhone className="text-blue-600 text-xs" />
                        </span>
                        Мэдээлэл авах
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['+976 9000 5559', '+976 9190 2989', '+976 9909 5839'].map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="bg-orange-100 p-1 rounded-full mr-2">
                          <FaPhone className="text-orange-600 text-xs" />
                        </span>
                        Засвар үйлчилгээ
                      </p>
                      <a
                        href="tel:+97690006668"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        +976 9000 6668
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <FaEnvelope className="text-blue-600 text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-lg mb-4 text-gray-800">И-мэйл</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="bg-blue-100 p-1 rounded-full mr-2">
                          <FaEnvelope className="text-blue-600 text-xs" />
                        </span>
                        Мэдээлэл авах
                      </p>
                      <div className="space-y-2">
                        {['dji@geo-mongol.mn', 'dji.mongolia0@gmail.com'].map((email) => (
                          <a
                            key={email}
                            href={`mailto:${email}`}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="bg-orange-100 p-1 rounded-full mr-2">
                          <FaEnvelope className="text-orange-600 text-xs" />
                        </span>
                        Засвар үйлчилгээ
                      </p>
                      <a
                        href="mailto:dji_service@geo-mongol.mn"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        dji_service@geo-mongol.mn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <FaMapMarkerAlt className="text-blue-600 text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-lg mb-3 text-gray-800">Хаяг</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52-ын 3 тоот,
                    &quot;Инженер Геодези ХХК&quot; байр
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <FaClock className="text-blue-600 text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-lg mb-3 text-gray-800">Ажиллах цаг</h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                      <span className="inline-block w-28 font-medium">Даваа-Баасан:</span>
                      <span>09:00 - 18:00</span>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="inline-block w-28 font-medium">Бямба-Ням:</span>
                      <span>Амарна</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-0 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <iframe
                title="address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.063079710459!2d106.8920424!3d47.9183684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96eccc00000001:0xd9419ff8407d6f3c!2z0JjQvdC20LXQvdC10YAg0LPQtdC-0LTQtdC5INCR0JDQlyDQodCQ0JcgLyBFbmdpbmVlcmluZyBnZW9kZXN5IExMQw!5e0!3m2!1smn!2smn!4v1716115200000!5m2!1smn!2smn"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
