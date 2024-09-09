import { pathAdvertisements } from 'api/const';
import { TAdvertisement } from 'types/Advertisement';

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

// Create Advertisement
export const createAdvertisement = async (
  advertisement: TAdvertisement,
  options?: { signal?: AbortSignal },
): Promise<TAdvertisement> => {
  const response = await fetch(`${pathAdvertisements}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(advertisement),
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

// Fetch Advertisement by ID
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

// Update Advertisement
export const updateAdvertisement = async (
  advertisement: TAdvertisement,
  options?: { signal?: AbortSignal },
): Promise<TAdvertisement> => {
  const response = await fetch(`${pathAdvertisements}/${advertisement.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(advertisement),
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Delete Advertisement
export const deleteAdvertisement = async (id: string, options?: { signal?: AbortSignal }): Promise<boolean> => {
  const response = await fetch(`${pathAdvertisements}/${id}`, {
    method: 'DELETE',
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.ok;
};
