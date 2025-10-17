'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();

  const form = useForm<ContactRequestFromUserSchemaType>({
    resolver: zodResolver(ContactRequestFromUserSchema),
    mode: 'onTouched',
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
    if (!response) return;
    const timeout = setTimeout(() => setResponse(undefined), 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  const fadeIn = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-base sm:text-lg md:text-[1.05rem] lg:text-[1.1rem]">
      {response && <CustomSnackbar value={response} />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...(shouldReduceMotion
            ? {}
            : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } })}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-blue-600">Холбоо</span> барих
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Бидэнтэй холбогдохын тулд доорх мэдээллийг ашиглана уу
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-12 xl:gap-16 items-start">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.45 }}
            className="bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-xl ring-1 ring-gray-200/60 dark:ring-gray-800 p-5 sm:p-6 md:p-8 text-sm sm:text-base md:text-lg"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Бидэнтэй холбогдох
            </h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 sm:space-y-6"
                aria-busy={form.formState.isSubmitting}
              >
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
                          autoComplete="name"
                          inputProps={{ 'aria-label': 'Таны нэр' }}
                          {...field}
                          className="bg-gray-50 dark:bg-gray-800 rounded-xl text-sm sm:text-base md:text-lg"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs sm:text-sm mt-1" />
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
                          type="email"
                          fullWidth
                          autoComplete="email"
                          inputProps={{ 'aria-label': 'И-мэйл хаяг' }}
                          {...field}
                          className="bg-gray-50 dark:bg-gray-800 rounded-xl text-sm sm:text-base md:text-lg"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs sm:text-sm mt-1" />
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
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="+976 9000 0000"
                          inputProps={{ pattern: '[+0-9\s-]*', 'aria-label': 'Утасны дугаар' }}
                          {...field}
                          className="bg-gray-50 dark:bg-gray-800 rounded-xl text-sm sm:text-base md:text-lg"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs sm:text-sm mt-1" />
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
                          minRows={4}
                          maxRows={8}
                          fullWidth
                          autoComplete="off"
                          inputProps={{ 'aria-label': 'Таны зурвас' }}
                          {...field}
                          className="bg-gray-50 dark:bg-gray-800 rounded-xl text-sm sm:text-base md:text-lg"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs sm:text-sm mt-1" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                  startIcon={<FaPaperPlane />}
                  className="!w-full !py-3 !rounded-xl !shadow-md text-sm sm:text-base md:text-lg"
                  sx={{
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                  }}
                >
                  {form.formState.isSubmitting ? 'Илгээж байна…' : 'Илгээх'}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="space-y-6 text-sm sm:text-base md:text-lg"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Холбоо барих мэдээлэл
            </h3>

            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-xl ring-1 ring-gray-200/60 dark:ring-gray-800 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full flex-shrink-0">
                  <FaPhone className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    Утасны дугаар
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900/40 p-1 rounded-full">
                          <FaPhone className="text-blue-600 dark:text-blue-400 text-xs" />
                        </span>
                        Мэдээлэл авах
                      </p>
                      <ul className="space-y-2">
                        {['+976 9000 5559', '+976 9190 2989', '+976 9909 5839'].map((phone) => (
                          <li key={phone} className="truncate">
                            <a
                              href={`tel:${phone.replace(/\s/g, '')}`}
                              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                              {phone}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
                        <span className="bg-orange-100 dark:bg-orange-900/30 p-1 rounded-full">
                          <FaPhone className="text-orange-600 dark:text-orange-400 text-xs" />
                        </span>
                        Засвар үйлчилгээ
                      </p>
                      <a
                        href="tel:+97690006668"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                        +976 9000 6668
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-xl ring-1 ring-gray-200/60 dark:ring-gray-800 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full flex-shrink-0">
                  <FaEnvelope className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    И-мэйл
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900/40 p-1 rounded-full">
                          <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xs" />
                        </span>
                        Мэдээлэл авах
                      </p>
                      <ul className="space-y-2">
                        {['dji@geo-mongol.mn', 'dji.mongolia0@gmail.com'].map((email) => (
                          <li key={email} className="truncate">
                            <a
                              href={`mailto:${email}`}
                              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                              {email}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-900 dark:text-white font-medium mb-3 flex items-center gap-2">
                        <span className="bg-orange-100 dark:bg-orange-900/30 p-1 rounded-full">
                          <FaEnvelope className="text-orange-600 dark:text-orange-400 text-xs" />
                        </span>
                        Засвар үйлчилгээ
                      </p>
                      <a
                        href="mailto:dji_service@geo-mongol.mn"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                        dji_service@geo-mongol.mn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-xl ring-1 ring-gray-200/60 dark:ring-gray-800 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full flex-shrink-0">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Хаяг</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52-ын 3 тоот,
                    &quot;Инженер Геодези ХХК&quot; байр
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-xl ring-1 ring-gray-200/60 dark:ring-gray-800 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full flex-shrink-0">
                  <FaClock className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                    Ажиллах цаг
                  </h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                      <dt className="font-medium w-32">Даваа–Баасан:</dt>
                      <dd>09:00 – 18:00</dd>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                      <dt className="font-medium w-32">Бямба–Ням:</dt>
                      <dd>Амарна</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-xl ring-1 ring-gray-200/60 dark:ring-gray-800 overflow-hidden">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
                <iframe
                  title="address"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.063079710459!2d106.8920424!3d47.9183684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96eccc00000001:0xd9419ff8407d6f3c!2z0JjQvdC20LXQvdC10YAg0LPQtdC-0LTQtdC5INCR0JDQlyDQodCQ0JcgLyBFbmdpbmVlcmluZyBnZW9kZXN5IExMQw!5e0!3m2!1smn!2smn!4v1716115200000!5m2!1smn!2smn"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
