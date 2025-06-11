import { AdminSideBarOptions } from '@/lib/types';
import ProductSection from './product-section';
import OrderSection from './order-section';
import MediaSection from './media-section';
import DroneBuyRequestSection from './drone-buy-request=section';
import ContactRequestSection from './contact-request-section';
import InstructionRequestSection from './instruction-request-section';

export const sectionComponents: Record<AdminSideBarOptions, React.ReactNode> = {
  [AdminSideBarOptions.products]: <ProductSection />,
  [AdminSideBarOptions.DroneBuyRequest]: <DroneBuyRequestSection />,
  [AdminSideBarOptions.ContactRequest]: <ContactRequestSection />,
  [AdminSideBarOptions.images]: <MediaSection />,
  [AdminSideBarOptions.InstructionRequest]: <InstructionRequestSection />,
};
