"use client";

import { ContactInfoItemProps } from "@/app/_types/types";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactInfoSchema } from "../utils/contact-info-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "@/generated/prisma";
import axios from "axios";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import LoadingText from "@/app/_component/LoadingText";
import { ResponseType } from "@/lib/types";
import { CustomSnackbar } from "@/app/admin/_components/snackbar";

const ContactForm = () => {
  const pathname = usePathname();
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm({
    resolver: zodResolver(ContactInfoSchema),
    defaultValues: {
      name: "",
      description: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactInfoSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/client/products/drone/contact-request",
        {
          ...values,
          id,
        }
      );
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/auth/current-user");
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
    <div
      id="contact-form"
      className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {response && <CustomSnackbar value={response} />}
      <div className="p-8 md:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Бидэнтэй холбогдох
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          variant="standard"
                          label="Нэр"
                          fullWidth
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                          variant="standard"
                          label="Утасны дугаар"
                          fullWidth
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                          variant="standard"
                          label="Нэмэлт тайлбар"
                          fullWidth
                          multiline
                          minRows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {loading ? (
                  <LoadingText />
                ) : user ? (
                  <div className=" flex justify-between">
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!form.formState.isValid}
                      className="w-fit"
                    >
                      Холбоо барих
                    </Button>
                    <div>{user.email}</div>
                  </div>
                ) : (
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login?redir=${process.env.NEXT_PUBLIC_BASE_URL + pathname}`}
                    className="w-fit"
                  >
                    Нэвтрэх
                  </Link>
                )}
              </form>
            </Form>
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
                allowFullScreen
                loading="lazy"
                className="rounded-lg shadow"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoItem = ({ icon, title, items }: ContactInfoItemProps) => (
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

export default ContactForm;
