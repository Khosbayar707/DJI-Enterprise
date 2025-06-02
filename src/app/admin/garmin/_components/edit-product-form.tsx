"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Snackbar, Alert, Checkbox } from "@mui/material";
import {
  AddGarminProductSchema,
  AddGarminProductSchemaType,
} from "../utlis/add-garmin-product-schema";
import { GarminProduct } from "@/generated/prisma";
import axios from "axios";

interface GarminProductFormProps {
  product: GarminProduct;
}

export default function EditProductFrom({ product }: GarminProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const form = useForm<AddGarminProductSchemaType>({
    resolver: zodResolver(AddGarminProductSchema),
    defaultValues: {
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      imageUrl: "",
      features: "",
      isNew: product.isNew,
      rating: product.rating,
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

      const res = await axios.patch("/api/garmins", {
        ...payload,
        id: product.id,
      });
      console.log(res.data);
      setSnackbarSeverity("success");
      setSnackbarMessage("Бүтээгдэхүүн амжилттай шинэчлэгдлээ");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error instanceof Error ? error.message : "Алдаа гарлаа"
      );
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Form {...form}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Бүтээгдэхүүний нэр</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Жишээ: Garmin Fenix 7X"
                    {...field}
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
                <FormLabel>Ангилал</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Жишээ: Ухаалаг цаг"
                    {...field}
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
                <FormLabel>Үнэ ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isSubmitting}
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                <FormLabel>Үнэлгээ (0-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isSubmitting}
                    placeholder="4.5"
                    min={0}
                    max={5}
                    step={0.1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Зурагны URL</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="https://example.com/product-image.jpg"
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
              <FormLabel>Тайлбар</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="Дэлгэрэнгүй тайлбар..."
                  className="min-h-[100px]"
                  {...field}
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
              <FormLabel>Онцлогууд (мөрөөр тусгаарлан бичнэ үү)</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="Нарны цэнэглэгч\n32GB санах ой\nОлон сувагт GNSS"
                  className="min-h-[100px]"
                  {...field}
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Шинэ бүтээгдэхүүн гэж тэмдэглэх</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Засах</Button>
      </form>
    </Form>
  );
}
