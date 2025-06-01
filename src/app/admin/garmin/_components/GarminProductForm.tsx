"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import axios from "axios";
import { TextField } from "@mui/material";
import { CustomSnackbar } from "@/app/admin/_components/snackbar"; // Та энэ компонентыг тодорхойлсон гэж үзлээ
import { TrashIcon } from "lucide-react";
import {
  AddGarminProductSchema,
  AddGarminProductSchemaType,
} from "../utlis/add-garmin-product-schema";

interface GarminProductFormProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
  productId?: string;
  initialData?: AddGarminProductSchemaType;
}

export default function GarminProductForm({
  onSubmitSuccess,
  onCancel,
  productId,
  initialData,
}: GarminProductFormProps) {
  const router = useRouter();
  const [response, setResponse] = useState<{
    success: boolean;
    message?: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddGarminProductSchemaType>({
    resolver: zodResolver(AddGarminProductSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      price: 0,
      description: "",
      imageUrl: "",
      features: "",
      isNew: false,
      rating: 0,
    },
  });

  const onSubmit = async (data: AddGarminProductSchemaType) => {
    setIsSubmitting(true);
    try {
      const featuresArray = data.features
        ? data.features.split("\n").filter((f) => f.trim() !== "")
        : [];
      const payload = {
        ...data,
        features: featuresArray,
        specifications: [],
      };

      let res;
      if (productId) {
        res = await axios.put(`/api/garmin/${productId}`, payload);
      } else {
        res = await axios.post("/api/garmin", payload);
      }

      setResponse({ success: res.data.success, message: res.data.message });
      if (res.data.success) {
        form.reset();
        router.refresh();
        if (onSubmitSuccess) onSubmitSuccess();
      }
    } catch (err) {
      setResponse({ success: false, message: "Алдаа гарлаа" });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!productId) return;
    if (confirm("Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?")) {
      try {
        const res = await axios.delete(`/api/garmin/${productId}`);
        setResponse({ success: res.data.success, message: res.data.message });
        if (res.data.success) {
          router.refresh();
          if (onSubmitSuccess) onSubmitSuccess();
        }
      } catch (err) {
        setResponse({ success: false, message: "Устгахад алдаа гарлаа" });
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setResponse(undefined), 3000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <Card className="shadow-2xl border border-gray-200">
      {response && <CustomSnackbar value={response} />}
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {productId
            ? "Garmin Бүтээгдэхүүн засварлах"
            : "Шинэ Garmin бүтээгдэхүүн нэмэх"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      disabled={isSubmitting}
                      label="Бүтээгдэхүүний нэр"
                      variant="standard"
                      {...field}
                      placeholder="Жишээ: Garmin Fenix 7X"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      disabled={isSubmitting}
                      label="Ангилал"
                      variant="standard"
                      {...field}
                      placeholder="Жишээ: Ухаалаг цаг"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      disabled={isSubmitting}
                      label="Үнэ ($)"
                      type="number"
                      variant="standard"
                      {...field}
                      placeholder="0.00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      disabled={isSubmitting}
                      label="Үнэлгээ (0-5)"
                      type="number"
                      variant="standard"
                      {...field}
                      placeholder="4.5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      disabled={isSubmitting}
                      label="Зурагны URL"
                      variant="standard"
                      {...field}
                      placeholder="https://example.com/product-image.jpg"
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
                      disabled={isSubmitting}
                      label="Тайлбар"
                      variant="standard"
                      multiline
                      {...field}
                      placeholder="Дэлгэрэнгүй тайлбар..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      disabled={isSubmitting}
                      label="Онцлогууд (мөрөөр тусгаарлан бичнэ үү)"
                      variant="standard"
                      multiline
                      {...field}
                      placeholder="Нарны цэнэглэгч\n32GB санах ой\nОлон сувагт GNSS"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isNew"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="checkbox"
                      disabled={isSubmitting}
                      {...field}
                      checked={field.value}
                    />
                  </FormControl>
                  <label className="ml-2 text-sm text-gray-700">
                    Шинэ бүтээгдэхүүн гэж тэмдэглэх
                  </label>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex justify-end space-x-3">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Болих
                </button>
              )}
              {productId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Устгах
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting
                  ? "Хадгалж байна..."
                  : productId
                    ? "Засах"
                    : "Хадгалах"}
              </button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
