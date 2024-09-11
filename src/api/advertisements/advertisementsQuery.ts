import { pathAdvertisements } from 'api/const';
import { TAdvertisement, TAdvertisementUpdate } from 'types/Advertisement';

export const fetchAdvertisements = async (
  queryStringResult: string,
  options?: { signal?: AbortSignal },
): Promise<TAdvertisement[]> => {
  const response = await fetch(`${pathAdvertisements}?${queryStringResult}`, { signal: options?.signal });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const createAdvertisement = async (advertisement: TAdvertisement): Promise<TAdvertisement> => {
  const response = await fetch(`${pathAdvertisements}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(advertisement),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

export const fetchAdvertisementById = async (
  id: string,
  options?: { signal?: AbortSignal },
): Promise<TAdvertisement> => {
  const response = await fetch(`${pathAdvertisements}/${id}`, { signal: options?.signal });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const updateAdvertisement = async (advertisement: TAdvertisementUpdate): Promise<boolean> => {
  const response = await fetch(`${pathAdvertisements}/${advertisement.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(advertisement),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const deleteAdvertisement = async (id: string): Promise<boolean> => {
  const response = await fetch(`${pathAdvertisements}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.ok;
};
