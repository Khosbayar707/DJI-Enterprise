'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ContactInfoSchema } from '../utils/contact-info-schema';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import z from 'zod';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '@/generated/prisma';
import axios from 'axios';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import LoadingText from '@/app/_component/LoadingText';
import { ResponseType } from '@/lib/types';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/solid';

const ContactForm = () => {
  const pathname = usePathname();
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm({
    resolver: zodResolver(ContactInfoSchema),
    defaultValues: {
      name: '',
      description: '',
      phone: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactInfoSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/client/products/drone/contact-request', {
        ...values,
        id,
      });
      setResponse(res.data);
      form.reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/auth/current-user');
        if (res.data.success) {
          setUser(res.data.data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 7000);

    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mt-16">
      {response && <CustomSnackbar value={response} />}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Бидэнтэй холбогдох</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          className="bg-gray-50 rounded-lg"
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
                          variant="outlined"
                          label="Утасны дугаар"
                          fullWidth
                          type="tel"
                          {...field}
                          className="bg-gray-50 rounded-lg"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          variant="outlined"
                          label="Нэмэлт тайлбар"
                          fullWidth
                          multiline
                          rows={4}
                          {...field}
                          className="bg-gray-50 rounded-lg"
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

                {loading ? (
                  <LoadingText />
                ) : user ? (
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={!form.formState.isValid || form.formState.isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md"
                    >
                      {form.formState.isSubmitting ? 'Илгээж байна...' : 'Илгээх'}
                    </Button>
                    <p className="text-gray-500 text-sm mt-2">Нэвтэрсэн: {user.email}</p>
                  </div>
                ) : (
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login?redir=${process.env.NEXT_PUBLIC_BASE_URL + pathname}`}
                    className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg shadow-md transition-colors"
                  >
                    Нэвтрэх
                  </Link>
                )}
              </form>
            </Form>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <PhoneIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Утасны дугаар</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Мэдээлэл авах:</p>
                  <ul className="space-y-1 pl-4">
                    {['+976 9000 5559', '+976 9190 2989', '+976 9909 5839'].map((phone, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                        <a
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="text-blue-600 hover:underline"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Засвар үйлчилгээ:</p>
                  <ul className="space-y-1 pl-4">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      <a href="tel:+97690006668" className="text-blue-600 hover:underline">
                        +976 9000 6668
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">И-мэйл</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Мэдээлэл авах:</p>
                  <ul className="space-y-1 pl-4">
                    {['dji@geo-mongol.mn', 'dji.mongolia0@gmail.com'].map((email, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                        <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Засвар үйлчилгээ:</p>
                  <ul className="space-y-1 pl-4">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      <a
                        href="mailto:dji_service@geo-mongol.mn"
                        className="text-blue-600 hover:underline"
                      >
                        dji_service@geo-mongol.mn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPinIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Хаяг</h3>
              </div>
              <p className="text-gray-600 pl-4">
                Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52/3, "Инженер
                Геодези ХХК" байр
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <ClockIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Ажиллах цаг</h3>
              </div>
              <div className="space-y-1 pl-4">
                <p className="text-gray-600">Даваа-Баасан: 09:00 - 18:00</p>
                <p className="text-gray-600">Бямба-Ням: Амарна</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <iframe
                title="address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.063079710459!2d106.8920424!3d47.9183684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96eccc00000001:0xd9419ff8407d6f3c!2z0JjQvdC20LXQvdC10YAg0LPQtdC-0LTQtdC5INCR0JDQlyDQodCQ0JcgLyBFbmdpbmVlcmluZyBnZW9kZXN5IExMQw!5e0!3m2!1smn!2smn!4v1716115200000!5m2!1smn!2smn"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
