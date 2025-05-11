import { AdminSideBarOptions } from "@/lib/types";
import ProductSection from "./product-section";
import OrderSection from "./order-section";
import UserSection from "./user-section";
import MediaSection from "./media-section";

export const sectionComponents: Record<AdminSideBarOptions, React.ReactNode> = {
  [AdminSideBarOptions.products]: <ProductSection />,
  [AdminSideBarOptions.orders]: <OrderSection />,
  [AdminSideBarOptions.users]: <UserSection />,
  [AdminSideBarOptions.images]: <MediaSection />,
};
