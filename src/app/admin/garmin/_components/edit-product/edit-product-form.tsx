"use client";
import { Dispatch, SetStateAction, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { GarminProduct } from "@/generated/prisma";
import axios from "axios";
import {
  AddGarminProductSchema,
  AddGarminProductSchemaType,
} from "../../utlis/add-garmin-product-schema";
import { Alert, Snackbar } from "@mui/material";

interface GarminProductFormProps {
  product: GarminProduct;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

export default function EditProductForm({
  product,
  setRefresh,
  onClose,
}: GarminProductFormProps) {
  const [error, setError] = useState<string | null>(null);
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
      description: product.description || "",
      imageUrl: "",
      features: product.features?.join("\n") || "",
      isNew: product.isNew || false,
      rating: product.rating || 0,
    },
  });

  const onSubmit = async (data: AddGarminProductSchemaType) => {
    setError(null);
    try {
      const featuresArray = data.features
        ? data.features.split("\n").filter((f) => f.trim() !== "")
        : [];

      const payload = {
        ...data,
        features: featuresArray,
        specifications: [],
      };

      const res = await axios.put(
        `/api/garmins/garmin?id=${product.id}`,
        payload
      );
      if (res.data.success) {
        setRefresh((prev) => !prev);
        onClose();
      } else {
        setError("Бүтээгдэхүүнийг шинэчлэхэд алдаа гарлаа.");
      }
      setSnackbarSeverity("success");
      setSnackbarMessage("Бүтээгдэхүүн амжилттай заслаа");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Бүтээгдэхүүнийг шинэчлэхэд алдаа гарлаа."
      );
      setSnackbarOpen(true);
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
        {error && (
          <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Бүтээгдэхүүний нэр</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
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
                    disabled={form.formState.isSubmitting}
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
                <FormLabel>Үнэ (₮)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={form.formState.isSubmitting}
                    placeholder="0"
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
                    disabled={form.formState.isSubmitting}
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
                  disabled={form.formState.isSubmitting}
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
                  disabled={form.formState.isSubmitting}
                  placeholder="Дэлгэрэнгүй тайлбар..."
                  className="min-h-[80px]"
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
                  disabled={form.formState.isSubmitting}
                  placeholder="Нарны цэнэглэгч\n32GB санах ой\nОлон сувагт GNSS"
                  className="min-h-[80px]"
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
            <FormItem className="flex items-center space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormLabel className="text-sm">
                Шинэ бүтээгдэхүүн гэж тэмдэглэх
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={form.formState.isSubmitting}
          >
            Цуцлах
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {form.formState.isSubmitting ? "Хадгалж байна..." : "Хадгалах"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
