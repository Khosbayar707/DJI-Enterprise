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
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      phone: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactInfoSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/client/products/drone/contact-request', { ...values, id });
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
        if (res.data.success) setUser(res.data.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setResponse(undefined), 6000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <div
      id="contact-form"
      className="
        mt-20
        rounded-3xl
        bg-gradient-to-br from-white to-gray-50
        dark:from-slate-900 dark:to-slate-800
        border border-gray-200 dark:border-gray-800
        shadow-2xl dark:shadow-black/40
        transition-colors duration-300
      "
    >
      {response && <CustomSnackbar value={response} />}

      <div className="p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Бидэнтэй холбогдох
        </h2>

        <div className="grid lg:grid-cols-2 gap-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {['name', 'phone', 'description'].map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          {...field}
                          fullWidth
                          multiline={fieldName === 'description'}
                          rows={fieldName === 'description' ? 4 : undefined}
                          label={
                            fieldName === 'name'
                              ? 'Нэр'
                              : fieldName === 'phone'
                                ? 'Утасны дугаар'
                                : 'Нэмэлт тайлбар'
                          }
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '16px',
                              color: 'white',
                              backgroundColor: 'rgba(255,255,255,0.03)',
                              '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.15)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255,255,255,0.35)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#3b82f6',
                                boxShadow: '0 0 0 3px rgba(59,130,246,0.25)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255,255,255,0.6)',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#60a5fa',
                            },
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              ))}

              {loading ? (
                <LoadingText />
              ) : user ? (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                    sx={{
                      borderRadius: '16px',
                      padding: '14px',
                      background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                    }}
                  >
                    {form.formState.isSubmitting ? 'Илгээж байна...' : 'Илгээх'}
                  </Button>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    Нэвтэрсэн: {user.email}
                  </p>
                </>
              ) : (
                <Link
                  href={`/auth/login?redir=${pathname}`}
                  className="
                    block w-full py-4 text-center
                    rounded-2xl
                    bg-blue-600 hover:bg-blue-700
                    text-white font-semibold
                    transition
                  "
                >
                  Нэвтрэх
                </Link>
              )}
            </form>
          </Form>

          <div className="space-y-6">
            {[
              {
                title: 'Утас',
                icon: PhoneIcon,
                content: ['+976 9000 5559', '+976 9909 5839'],
              },
              {
                title: 'И-мэйл',
                icon: EnvelopeIcon,
                content: ['dji@geo-mongol.mn'],
              },
              {
                title: 'Ажиллах цаг',
                icon: ClockIcon,
                content: ['Даваа-Баасан: 09:00 - 18:00'],
              },
            ].map((section, i) => (
              <div
                key={i}
                className="
                  p-6 rounded-2xl
                  bg-gray-50 dark:bg-slate-800
                  border border-gray-200 dark:border-gray-700
                  hover:shadow-lg
                  transition-all duration-300
                "
              >
                <div className="flex items-center gap-3 mb-4">
                  <section.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                </div>

                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
              <iframe
                title="address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.063079710459!2d106.8920424!3d47.9183684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96eccc00000001:0xd9419ff8407d6f3c!2z0JjQvdC20LXQvdC10YAg0LPQtdC-0LTQtdC5INCR0JDQlyDQodCQ0JcgLyBFbmdpbmVlcmluZyBnZW9kZXN5IExMQw!5e0!3m2!1smn!2smn!4v1716115200000!5m2!1smn!2smn"
                width="100%"
                height="220"
                style={{ border: 0 }}
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
