import { OrderStatus } from "types/Order";

export const orderStatusOptions = [
  { value: OrderStatus.Created, label: 'Создан' },
  { value: OrderStatus.Paid, label: 'Оплачен' },
  { value: OrderStatus.Transport, label: 'В транспорте' },
  { value: OrderStatus.DeliveredToThePoint, label: 'Доставлен в пункт' },
  { value: OrderStatus.Received, label: 'Получен' },
  { value: OrderStatus.Archived, label: 'Архивирован' },
  { value: OrderStatus.Refund, label: 'Возврат' },
];
