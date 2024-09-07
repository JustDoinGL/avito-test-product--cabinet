import { pathAdvertisements } from 'api/const';
import { TAdvertisement } from 'types/Advertisement';

export const fetchAdvertisements = async (start = 0, limit = 10) => {
  const response = await fetch(`${pathAdvertisements}?_start=${start}&_limit=${limit}`);
  const data = await response.json();
  return data;
};

export const createAdvertisement = async (advertisement: TAdvertisement) => {
  const response = await fetch('${pathAdvertisements}', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(advertisement),
  });
  const data = await response.json();
  return data;
};

export const fetchAdvertisementById = async (id: string, signal: AbortSignal): Promise<TAdvertisement> => {
  const response = await fetch(`${pathAdvertisements}/${id}`, { signal });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const updateAdvertisement = async (id: string, advertisement: TAdvertisement) => {
  const response = await fetch(`${pathAdvertisements}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(advertisement),
  });
  const data = await response.json();
  return data;
};

export const deleteAdvertisement = async (id: string) => {
  const response = await fetch(`${pathAdvertisements}/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
};
