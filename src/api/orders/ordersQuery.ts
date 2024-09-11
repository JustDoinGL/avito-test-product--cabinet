import { pathOrders } from 'api/const';
import { TOrder } from 'types/Order';

export const fetchOrders = async (queryStringResult: string, options?: { signal?: AbortSignal }): Promise<TOrder[]> => {
  const response = await fetch(`${pathOrders}?${queryStringResult}`, { signal: options?.signal });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const fetchOrderById = async (id: string, options?: { signal?: AbortSignal }): Promise<TOrder> => {
  const response = await fetch(`${pathOrders}/${id}`, { signal: options?.signal });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const updateOrder = async (order: TOrder): Promise<TOrder> => {
  const response = await fetch(`${pathOrders}/${order.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const patchOrder = async (id: string, partialOrder: Partial<TOrder>): Promise<TOrder> => {
  const response = await fetch(`${pathOrders}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(partialOrder),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  const response = await fetch(`${pathOrders}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.ok;
};
