import { TAdvertisement } from "./Advertisement";

export const OrderStatus = {
    Created: 0,
    Paid: 1,
    Transport: 2,
    DeliveredToThePoint: 3,
    Received: 4,
    Archived: 5,
    Refund: 6
} as const;

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

export type TOrderItem = TAdvertisement & { count: number; };

export type TOrder = {
    /* Уникальный идентификатор. */
    id: string;
    /* Статус заказа. */
    status: OrderStatusType;
    /* Дата и время создания заказа. */
    createdAt: string;
    /* Дата и время завершения заказа (опционально). */
    finishedAt?: string;
    /* Список товаров в заказе. */
    items: Array<TOrderItem>;
    /* Способ доставки (например, Почта, СДЭК и т.д.). */
    deliveryWay: string;
    /* Общая сумма заказа. */
    total: number;
}