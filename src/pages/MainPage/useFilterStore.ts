import { TAdvertisement } from 'types/Advertisement';
import { create } from 'zustand';
import queryString from 'query-string';
import { fetchAdvertisements as apiFetchAdvertisements } from 'api/advertisements/advertisementsQuery';

type Filters = {
  likes?: number;
  views?: number;
  price?: number;
  limit?: number;
  text?: string;
};

type AdvertisementStore = {
  advertisements: TAdvertisement[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  currentPage: number;
  hasMore: boolean;

  fetchAdvertisements: (params: {
    start: number;
    limit: number;
    likes?: number;
    views?: number;
    price?: number;
    text?: string;
  }) => Promise<void>;

  loadMoreAdvertisements: () => Promise<void>;
  setFilters: (filters: Partial<Filters>) => void;
};

export const useAdvertisementStore = create<AdvertisementStore>((set, get) => ({
  advertisements: [],
  loading: false,
  error: null,
  filters: {
    likes: undefined,
    views: undefined,
    price: undefined,
    limit: 10,
    text: undefined,
  },
  currentPage: 0,
  totalAdvertisements: 0,
  hasMore: true,

  fetchAdvertisements: async (params) => {
    set({ loading: true, error: null });
    const { start, limit, likes, views, price, text } = params;

    const queryParams: Record<string, number | string> = {
      _start: start,
      _limit: limit,
    };

    if (text !== undefined && text.length > 0) {
      queryParams.name = text;
    }
    if (likes !== undefined && likes > 0) queryParams.likes_gt = likes;
    if (views !== undefined && views > 0) queryParams.views_gt = views;
    if (price !== undefined && price > 0) queryParams.price_gt = price;

    const queryStringResult = queryString.stringify(queryParams);

    try {
      const data = await apiFetchAdvertisements(queryStringResult);
      if (data.length === 0) {
        set({ hasMore: false });
      } else {
        set((state) => ({
          advertisements: [...state.advertisements, ...data],
          loading: false,
        }));
      }
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  },

  loadMoreAdvertisements: async () => {
    const { currentPage, filters, hasMore } = get();
    if (!hasMore) return;

    const newPage = currentPage + 1;
    set({ currentPage: newPage, loading: true });

    const limit = filters.limit || 10;
    const start = newPage * limit;

    try {
      await get().fetchAdvertisements({
        start: start,
        limit: limit,
        likes: filters.likes,
        views: filters.views,
        price: filters.price,
        text: filters.text,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
    } finally {
      set({ loading: false });
    }
  },

  setFilters: (filters) => {
    set((state) => {
      const newFilters = { ...state.filters, ...filters };
      set({ currentPage: 0, advertisements: [], hasMore: true });
      get().fetchAdvertisements({
        start: 0,
        limit: newFilters.limit || 10,
        likes: newFilters.likes,
        views: newFilters.views,
        price: newFilters.price,
        text: newFilters.text,
      });
      return { filters: newFilters };
    });
  },
}));
