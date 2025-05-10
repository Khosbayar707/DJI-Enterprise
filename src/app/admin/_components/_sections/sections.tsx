import { AdminSideBarOptions } from "@/lib/types";
import OrderSection from "../_cards/order-card";
import UserCard from "../_cards/user-card";
import ImageSecton from "../_cards/image-card";
import CategoriesSection from "../_cards/categories-card";
import ProductSection from "./product-section";

export const sectionComponents: Record<AdminSideBarOptions, React.ReactNode> = {
  [AdminSideBarOptions.products]: <ProductSection />,
  [AdminSideBarOptions.orders]: <OrderSection />,
  [AdminSideBarOptions.users]: <UserCard />,
  [AdminSideBarOptions.images]: <ImageSecton />,
  [AdminSideBarOptions.categories]: <CategoriesSection />,
};
