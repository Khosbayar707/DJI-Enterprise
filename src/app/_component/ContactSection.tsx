'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaHeadset,
  FaCheckCircle,
  FaRegClock,
  FaMapMarkedAlt,
  FaBuilding,
  FaMobile,
  FaEnvelopeOpenText,
} from 'react-icons/fa';
import ContactRequestFromUserSchema, {
  ContactRequestFromUserSchemaType,
} from './utils/contact-request-schema';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { ResponseType } from '@/lib/types';
import { CustomSnackbar } from '../admin/_components/snackbar';

type PhoneContactItem = {
  type: string;
  numbers: string[];
  color: 'blue' | 'orange';
  bgClass: string;
  icon: React.ReactNode;
};

type EmailContactItem = {
  type: string;
  emails: string[];
  color: 'blue' | 'orange';
  bgClass: string;
  icon: React.ReactNode;
};

type ContactItem = PhoneContactItem | EmailContactItem;

type ContactSection = {
  id: string;
  icon: React.ReactNode;
  title: string;
  items: ContactItem[];
};

export default function ContactSection() {
  const [response, setResponse] = useState<ResponseType>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const form = useForm<ContactRequestFromUserSchemaType>({
    resolver: zodResolver(ContactRequestFromUserSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactRequestFromUserSchemaType) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post('/api/client/contact-request', values);
      setResponse(res.data);
      form.reset();
    } catch (err) {
      const error = err as AxiosError<ResponseType>;
      setResponse({
        success: false,
        message:
          error.response?.data?.message || 'Хүсэлт илгээхэд алдаа гарлаа. Та дахин оролдоно уу.',
        code: error.response?.data?.code || 'REQUEST_FAILED',
        data: error.response?.data?.data || null,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!response) return;
    const timeout = setTimeout(() => setResponse(undefined), 6000);
    return () => clearTimeout(timeout);
  }, [response]);

  // Animation variants
  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildrenVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const animationProps = shouldReduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-50px' },
        variants: fadeInUpVariants,
      };

  const noAnimationProps = {
    initial: 'visible',
    animate: 'visible',
  };

  const isPhoneItem = (item: ContactItem): item is PhoneContactItem => {
    return 'numbers' in item;
  };

  const isEmailItem = (item: ContactItem): item is EmailContactItem => {
    return 'emails' in item;
  };

  const contactInfo: ContactSection[] = [
    {
      id: 'phones',
      icon: React.createElement(FaHeadset, { className: 'text-xl' }),
      title: 'Утасны дугаар',
      items: [
        {
          type: 'Мэдээлэл авах',
          numbers: ['+976 9000 5559', '+976 9190 2989', '+976 9909 5839'],
          color: 'blue',
          bgClass: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
          icon: React.createElement(FaPhone, { className: 'text-blue-600 dark:text-blue-400' }),
        },
        {
          type: 'Засвар үйлчилгээ',
          numbers: ['+976 9000 6668'],
          color: 'orange',
          bgClass:
            'from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20',
          icon: React.createElement(FaMobile, {
            className: 'text-orange-600 dark:text-orange-400',
          }),
        },
      ],
    },
    {
      id: 'emails',
      icon: React.createElement(FaEnvelope, { className: 'text-xl' }),
      title: 'И-мэйл',
      items: [
        {
          type: 'Мэдээлэл авах',
          emails: ['dji@geo-mongol.mn', 'dji.mongolia0@gmail.com'],
          color: 'blue',
          bgClass: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
          icon: React.createElement(FaEnvelope, { className: 'text-blue-600 dark:text-blue-400' }),
        },
        {
          type: 'Засвар үйлчилгээ',
          emails: ['dji_service@geo-mongol.mn'],
          color: 'orange',
          bgClass:
            'from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20',
          icon: React.createElement(FaEnvelopeOpenText, {
            className: 'text-orange-600 dark:text-orange-400',
          }),
        },
      ],
    },
  ];

  const getItemCount = (section: ContactSection): number => {
    return section.items.reduce((acc, item) => {
      if (isPhoneItem(item)) {
        return acc + (item.numbers?.length || 0);
      }
      if (isEmailItem(item)) {
        return acc + (item.emails?.length || 0);
      }
      return acc;
    }, 0);
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/20 bg-[size:40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-indigo-50/50 to-transparent dark:from-indigo-950/20 pointer-events-none" />

      {response && <CustomSnackbar value={response} />}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...(shouldReduceMotion ? noAnimationProps : animationProps)}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/50 dark:border-blue-800/30 shadow-sm mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              Contact
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
              Холбоо
            </span>
            <span className="text-gray-900 dark:text-white"> барих</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Бидэнтэй холбогдож таны хэрэгцээнд тохирсон шийдлийг аваарай. Таны асуулт, санал
            хүсэлтийг 24 цагийн дотор хариуцна.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
          <motion.div
            {...(shouldReduceMotion ? noAnimationProps : animationProps)}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-gray-200/80 dark:ring-gray-800/80 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200/60 dark:border-gray-800/60">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <FaPaperPlane className="text-white text-xl transform -rotate-12" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                    Хүсэлт илгээх
                  </h3>
                  <div className="flex items-center gap-2">
                    <FaRegClock className="text-xs text-gray-400 dark:text-gray-500" />
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Бид 24 цагийн дотор хариу өгөх болно
                    </p>
                  </div>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                  aria-busy={isSubmitting}
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
                            placeholder="Таны нэр"
                            fullWidth
                            autoComplete="name"
                            error={!!form.formState.errors.name}
                            disabled={isSubmitting}
                            {...field}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '14px',
                                backgroundColor:
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(17, 24, 39, 0.8)'
                                    : 'rgba(249, 250, 251, 0.8)',
                                transition: 'all 0.2s',
                                '& fieldset': {
                                  borderColor:
                                    theme.palette.mode === 'dark'
                                      ? 'rgba(55, 65, 81, 0.8)'
                                      : 'rgba(209, 213, 219, 0.8)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#3b82f6',
                                },
                                '&.Mui-focused fieldset': {
                                  borderWidth: '2px',
                                  borderColor: '#3b82f6',
                                },
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: isMobile ? '0.875rem' : '0.9375rem',
                                color:
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(156, 163, 175, 0.9)'
                                    : 'rgba(75, 85, 99, 0.9)',
                              },
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1 font-medium" />
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
                            placeholder="your@email.com"
                            type="email"
                            fullWidth
                            autoComplete="email"
                            error={!!form.formState.errors.email}
                            disabled={isSubmitting}
                            {...field}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '14px',
                                backgroundColor:
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(17, 24, 39, 0.8)'
                                    : 'rgba(249, 250, 251, 0.8)',
                                transition: 'all 0.2s',
                                '& fieldset': {
                                  borderColor:
                                    theme.palette.mode === 'dark'
                                      ? 'rgba(55, 65, 81, 0.8)'
                                      : 'rgba(209, 213, 219, 0.8)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#3b82f6',
                                },
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: isMobile ? '0.875rem' : '0.9375rem',
                              },
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1 font-medium" />
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
                            placeholder="+976 9000 0000"
                            fullWidth
                            autoComplete="tel"
                            error={!!form.formState.errors.phone}
                            disabled={isSubmitting}
                            {...field}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '14px',
                                backgroundColor:
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(17, 24, 39, 0.8)'
                                    : 'rgba(249, 250, 251, 0.8)',
                                transition: 'all 0.2s',
                                '& fieldset': {
                                  borderColor:
                                    theme.palette.mode === 'dark'
                                      ? 'rgba(55, 65, 81, 0.8)'
                                      : 'rgba(209, 213, 219, 0.8)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#3b82f6',
                                },
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: isMobile ? '0.875rem' : '0.9375rem',
                              },
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1 font-medium" />
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
                            placeholder="Танд ямар тусламж хэрэгтэй вэ?"
                            multiline
                            rows={4}
                            fullWidth
                            error={!!form.formState.errors.message}
                            disabled={isSubmitting}
                            {...field}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '14px',
                                backgroundColor:
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(17, 24, 39, 0.8)'
                                    : 'rgba(249, 250, 251, 0.8)',
                                transition: 'all 0.2s',
                                '& fieldset': {
                                  borderColor:
                                    theme.palette.mode === 'dark'
                                      ? 'rgba(55, 65, 81, 0.8)'
                                      : 'rgba(209, 213, 219, 0.8)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#3b82f6',
                                },
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: isMobile ? '0.875rem' : '0.9375rem',
                              },
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1 font-medium" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!form.formState.isValid || isSubmitting}
                    className="relative w-full py-4 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
                    sx={{
                      textTransform: 'none',
                      fontSize: isMobile ? '0.9375rem' : '1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 20px -8px rgba(37, 99, 235, 0.4)',
                      },
                      '&:disabled': {
                        background:
                          theme.palette.mode === 'dark'
                            ? 'rgba(75, 85, 99, 0.5)'
                            : 'rgba(156, 163, 175, 0.5)',
                      },
                    }}
                    startIcon={
                      isSubmitting ? (
                        <FaRegClock className="animate-spin text-sm sm:text-base" />
                      ) : (
                        <FaPaperPlane className="text-sm sm:text-base transform -rotate-12" />
                      )
                    }
                  >
                    {isSubmitting ? 'Илгээж байна...' : 'Хүсэлт илгээх'}
                  </Button>

                  <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-200/60 dark:border-gray-800/60">
                    <div className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-500 text-xs sm:text-sm" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Нууцлалтай</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-500 text-xs sm:text-sm" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">24/7 дэмжлэг</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-500 text-xs sm:text-sm" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Шуурхай хариу
                      </span>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>

          <motion.div
            {...(shouldReduceMotion
              ? noAnimationProps
              : {
                  initial: 'hidden',
                  whileInView: 'visible',
                  viewport: { once: true, margin: '-50px' },
                  variants: staggerChildrenVariants,
                })}
          >
            <div className="space-y-6">
              {contactInfo.map((section) => (
                <motion.div
                  key={section.id}
                  {...(shouldReduceMotion
                    ? noAnimationProps
                    : {
                        variants: fadeInUpVariants,
                      })}
                  className="relative"
                >
                  <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-gray-200/80 dark:ring-gray-800/80 p-6 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
                          {section.icon}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">
                            {getItemCount(section)}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          {section.title}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {section.items.map((item, idx) => (
                            <div
                              key={idx}
                              className={`p-4 rounded-xl bg-gradient-to-br ${item.bgClass} border ${
                                item.color === 'blue'
                                  ? 'border-blue-200/50 dark:border-blue-800/30'
                                  : 'border-orange-200/50 dark:border-orange-800/30'
                              } transition-all duration-300 hover:scale-[1.02]`}
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <div
                                  className={`w-6 h-6 rounded-lg ${
                                    item.color === 'blue'
                                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                                      : 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400'
                                  } flex items-center justify-center`}
                                >
                                  {item.icon}
                                </div>
                                <p
                                  className={`text-xs font-semibold ${
                                    item.color === 'blue'
                                      ? 'text-blue-700 dark:text-blue-300'
                                      : 'text-orange-700 dark:text-orange-300'
                                  }`}
                                >
                                  {item.type}
                                </p>
                              </div>

                              <ul className="space-y-2">
                                {isPhoneItem(item) &&
                                  item.numbers?.map((num) => (
                                    <li key={num}>
                                      <a
                                        href={`tel:${num.replace(/\s/g, '')}`}
                                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm ${
                                          item.color === 'blue'
                                            ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400'
                                        } hover:underline transition-colors break-all`}
                                      >
                                        <span
                                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                            item.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                                          }`}
                                        />
                                        {num}
                                      </a>
                                    </li>
                                  ))}

                                {isEmailItem(item) &&
                                  item.emails?.map((email) => (
                                    <li key={email}>
                                      <a
                                        href={`mailto:${email}`}
                                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm ${
                                          item.color === 'blue'
                                            ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400'
                                        } hover:underline transition-colors break-all`}
                                      >
                                        <span
                                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                            item.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                                          }`}
                                        />
                                        {email}
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                {...(shouldReduceMotion
                  ? noAnimationProps
                  : {
                      variants: fadeInUpVariants,
                    })}
                className="relative"
              >
                <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-gray-200/80 dark:ring-gray-800/80 p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Хаяг
                      </h3>
                      <div className="flex items-start gap-3">
                        <FaBuilding className="text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0" />
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          Улаанбаатар хот, Баянгол дүүрэг, 16-р хороо, Амарсанаагийн гудамж 52-ын 3
                          тоот, &quot;Инженер Геодези ХХК&quot; байр
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...(shouldReduceMotion
                  ? noAnimationProps
                  : {
                      variants: fadeInUpVariants,
                    })}
                className="relative"
              >
                <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-gray-200/80 dark:ring-gray-800/80 p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
                      <FaClock className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Ажиллах цаг
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                            Даваа - Баасан
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                            09:00 - 18:00
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                            Бямба - Ням
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-red-500 dark:text-red-400">
                            Амарна
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...(shouldReduceMotion
                  ? noAnimationProps
                  : {
                      variants: fadeInUpVariants,
                    })}
                className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-200/80 dark:ring-gray-800/80"
              >
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center gap-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <FaMapMarkedAlt className="text-blue-600 dark:text-blue-400 text-sm" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Байршил
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[300px]">
                  <iframe
                    title="Байршил"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.063079710459!2d106.8920424!3d47.9183684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96eccc00000001:0xd9419ff8407d6f3c!2z0JjQvdC20LXQvdC10YAg0LPQtdC-0LTQtdC5INCR0JDQlyDQodCQ0JcgLyBFbmdpbmVlcmluZyBnZW9kZXN5IExMQw!5e0!3m2!1smn!2smn!4v1716115200000!5m2!1smn!2smn"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=47.9183684,106.8920424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 z-20 px-5 py-2.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg text-xs sm:text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border border-gray-200/80 dark:border-gray-800/80"
                >
                  <span className="flex items-center gap-2">
                    <FaMapMarkedAlt className="text-blue-600 dark:text-blue-400" />
                    Google Maps-ээр нээх
                  </span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
