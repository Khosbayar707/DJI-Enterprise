"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { Trash2 } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

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
        res = await fetch(`/api/garmin/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/garmin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Алдаа гарлаа");
      }

      setSnackbarSeverity("success");
      setSnackbarMessage(
        productId
          ? "Бүтээгдэхүүн амжилттай шинэчлэгдлээ"
          : "Бүтээгдэхүүн амжилттай үүслээ"
      );
      setSnackbarOpen(true);

      form.reset();
      router.refresh();
      if (onSubmitSuccess) onSubmitSuccess();
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

  const handleDelete = async () => {
    if (!productId) return;

    if (!confirm("Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      const res = await fetch(`/api/garmin/${productId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Устгахад алдаа гарлаа");
      }

      setSnackbarSeverity("success");
      setSnackbarMessage("Бүтээгдэхүүн амжилттай устгагдлаа");
      setSnackbarOpen(true);

      router.refresh();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error instanceof Error ? error.message : "Устгахад алдаа гарлаа"
      );
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {productId
            ? "Garmin Бүтээгдэхүүн засварлах"
            : "Шинэ Garmin бүтээгдэхүүн нэмэх"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
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

            <CardFooter className="flex justify-end gap-2 px-0 pt-4">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Болих
                </Button>
              )}
              {productId && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Устгах
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Хадгалж байна..."
                  : productId
                    ? "Хадгалах"
                    : "Үүсгэх"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>

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
    </Card>
  );
}
