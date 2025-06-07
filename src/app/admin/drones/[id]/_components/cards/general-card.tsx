'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EditDroneGeneralInfo } from '../../utils/edit-drone-form';
import { CustomDrone, CustomSpec, ResponseType } from '@/lib/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import LoadingText from '@/app/_component/LoadingText';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import { DroneCategory, DroneModel, Spec } from '@/generated/prisma';
import { Badge } from '@/components/ui/badge';
import AddSpecDialog from '@/app/admin/_components/_dialogs/add-spec-category';
import { FaRegEdit } from 'react-icons/fa';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SpecEditInfo from './_components/spec-edit-general-info';
import SpecAddDescription from './_components/spec-edit-descriptions';
import { ImNewTab } from 'react-icons/im';
import Link from 'next/link';
import SpecAllDescriptions from './_components/spec-all-descriptions';

type Props = {
  drone: CustomDrone | undefined;
  droneCategories: DroneCategory[];
  specs: CustomSpec[];
  droneModels: DroneModel[];
  waitingCategories: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
};
const DroneInfoCard = ({
  drone,
  droneCategories,
  droneModels,
  waitingCategories,
  specs,
  refresh,
  setRefresh,
}: Props) => {
  const [response, setResponse] = useState<ResponseType>();
  const [cat1, setcat1] = useState<DroneCategory[]>(drone?.categories || []);
  const [cat2, setcat2] = useState<Spec[]>(drone?.specs || []);
  const [currentModel, setModel] = useState(drone?.modelId || '');
  const params = useParams();
  const { id } = params;
  const form = useForm<z.infer<typeof EditDroneGeneralInfo>>({
    resolver: zodResolver(EditDroneGeneralInfo),
    defaultValues: {
      name: drone?.name,
      description: drone?.description,
      price: drone?.price ? String(drone?.price) : '0',
      discount: String(drone?.discount) || '0',
      previewText: drone?.PreviewDescription,
      briefDescription: drone?.briefDescription,
      stock: String(drone?.stock),
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof EditDroneGeneralInfo>) => {
    try {
      const res = await axios.post('/api/product/drones/change-general-info', {
        ...values,
        id,
        cat1,
        cat2,
        currentModel,
        price: Number(values.price),
        discount: Number(values.discount),
        stock: Number(values.stock),
      });
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>
          <div className=" flex items-center w-full justify-between">
            <div>Дрон</div>
          </div>
        </CardTitle>
      </CardHeader>
      {response && <CustomSnackbar value={response} />}
      <CardContent className=" flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField variant="standard" label="Дроны нэр" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="briefDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField label="Богино тайлбар" {...field} variant="standard" />
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
                    <FormLabel>Дроны тухай дэлгэрэнгүй мэдээлэл</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={50} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previewText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preview дэлгэрэнгүй мэдээлэл</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={50} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex gap-4 items-center">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Үнэ</FormLabel>
                      <FormControl>
                        <TextField {...field} variant="standard" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Хямдрал</FormLabel>
                      <FormControl>
                        <TextField {...field} variant="standard" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" text-md">
                  Одоо зарагдаж байгаа үнэ(хямдралыг хасаад):{' '}
                  <span className=" text-green-500 text-2xl">
                    {(drone?.price ? drone.price - drone.discount : 0).toLocaleString()}₮
                  </span>
                </div>
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField {...field} variant="standard" label="Барааны үлдэгдэл" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {waitingCategories ? (
                <LoadingText />
              ) : (
                <div className=" flex flex-col gap-4">
                  <div className=" flex flex-col gap-3">
                    <div>
                      Категори
                      <span className=" text-xs text-gray-500 italic">*олныг сонгох боломжтой</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {droneCategories.length > 0 ? (
                        droneCategories.map((category) => {
                          const isSelected = cat1.some((item) => item.id === category.id);
                          return (
                            <Badge
                              key={category.id}
                              onClick={() => {
                                setcat1((prev) => {
                                  const exists = prev.some((item) => item.id === category.id);
                                  if (exists) {
                                    return prev.filter((item) => item.id !== category.id);
                                  } else {
                                    return [...prev, category];
                                  }
                                });
                              }}
                              className={`text-xs cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              {category.name}
                            </Badge>
                          );
                        })
                      ) : (
                        <div>Категори алга</div>
                      )}
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3">
                    <div>
                      Модел{' '}
                      <span className=" text-xs text-gray-500 italic">
                        *нэгийг л сонгох боломжтой
                      </span>
                      <Button onClick={() => setModel('')}>Арилгах</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {droneModels.length > 0 ? (
                        droneModels.map((model) => {
                          const isSelected = model.id === currentModel;
                          return (
                            <Badge
                              key={model.id}
                              onClick={() => setModel(model.id)}
                              className={`text-xs cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              {model.name}
                            </Badge>
                          );
                        })
                      ) : (
                        <div>Модел алга</div>
                      )}
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3">
                    <div className=" flex justify-between">
                      {' '}
                      <div>
                        Эд ангиуд{' '}
                        <span className=" text-xs text-gray-500 italic">
                          *олныг сонгох боломжтой
                        </span>
                      </div>
                      <div className="text-xs">
                        <AddSpecDialog refresh={refresh} setRefresh={setRefresh} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-5">
                      {specs.length > 0 ? (
                        specs.map((spec) => {
                          const isSelected = cat2.some((item) => item.id === spec.id);
                          return (
                            <div
                              key={spec.id}
                              className={`text-xs items-center cursor-pointer transition-all duration-200 flex justify-center`}
                            >
                              <Badge
                                className={`flex items-center justify-center ${
                                  isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                              >
                                <Dialog>
                                  <DialogTrigger>
                                    <FaRegEdit className=" text-lg cursor-pointer -top-1" />
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogTitle className="flex">
                                      <div className="truncate">
                                        Эд анги {spec.name} -г засах гэж байна!
                                      </div>
                                      <Link target="_blank" href={`/admin/specs/${spec.id}`}>
                                        <ImNewTab className="text-xs" />
                                      </Link>
                                    </DialogTitle>
                                    <div className="relative">
                                      <Tabs>
                                        <TabsList className=" w-full ">
                                          <TabsTrigger className=" cursor-pointer" value="general">
                                            Ерөнхий
                                          </TabsTrigger>
                                          <TabsTrigger
                                            className=" cursor-pointer"
                                            value="add-description"
                                          >
                                            Дэлгэрэнгүй мэдээлэл нэмэх
                                          </TabsTrigger>
                                          <TabsTrigger
                                            className=" cursor-pointer"
                                            value="descriptions"
                                          >
                                            Бүх дэлгэрэнгүй мэдээлэл
                                          </TabsTrigger>
                                        </TabsList>
                                        <SpecEditInfo setRefresh={setRefresh} spec={spec} />
                                        <SpecAddDescription spec={spec} setRefresh={setRefresh} />
                                        <SpecAllDescriptions spec={spec} setRefresh={setRefresh} />
                                      </Tabs>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <div
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => {
                                    setcat2((prev) => {
                                      const exists = prev.some((item) => item.id === spec.id);
                                      if (exists) {
                                        return prev.filter((item) => item.id !== spec.id);
                                      } else {
                                        return [...prev, spec];
                                      }
                                    });
                                  }}
                                >
                                  {spec.name}: {spec.detail}
                                </div>
                              </Badge>
                            </div>
                          );
                        })
                      ) : (
                        <div>Категори алга</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <Button
                type="submit"
                className=" w-full"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? <LoadingText /> : 'Өөрчлөх'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default DroneInfoCard;
