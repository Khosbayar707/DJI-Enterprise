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
      <div className="container mx-auto px-4 max-w-6xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-26 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Бидэнтэй холбогдох</h3>
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
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
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
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
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
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
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
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                  startIcon={<FaPaperPlane />}
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
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold">Холбоо барих мэдээлэл</h3>{' '}
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaPhone className="text-blue-600" />{' '}
              </div>
              <div>
                <h4 className="font-medium">Утас</h4>{' '}
                <p className="text-gray-600">+976 7011 2233</p>{' '}
                <p className="text-gray-600">+976 8811 4455</p>{' '}
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaEnvelope className="text-blue-600" />{' '}
              </div>
              <div>
                <h4 className="font-medium">И-мэйл</h4>{' '}
                <p className="text-gray-600">info@engineer-geodesy.mn</p>{' '}
                <p className="text-gray-600">sales@engineer-geodesy.mn</p>{' '}
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaMapMarkerAlt className="text-blue-600" />{' '}
              </div>
              <div>
                <h4 className="font-medium">Хаяг</h4>{' '}
                <p className="text-gray-600">
                  Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52/3,
                  &quot;Инженер Геодези ХХК&quot; байр{' '}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaClock className="text-blue-600" />{' '}
              </div>
              <div>
                <h4 className="font-medium">Ажиллах цаг</h4>{' '}
                <p className="text-gray-600">Даваа-Баасан: 09:00 - 18:00</p>{' '}
                <p className="text-gray-600">Бямба-Ням: Амарна</p>{' '}
              </div>
            </div>
            <div className="pt-4">
              <iframe
                title="addess"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.063079710459!2d106.8920424!3d47.9183684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96eccc00000001:0xd9419ff8407d6f3c!2z0JjQvdC20LXQvdC10YAg0LPQtdC-0LTQtdC5INCR0JDQlyDQodCQ0JcgLyBFbmdpbmVlcmluZyBnZW9kZXN5IExMQw!5e0!3m2!1smn!2smn!4v1716115200000!5m2!1smn!2smn"
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
