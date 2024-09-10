import { create } from 'zustand';
import queryString from 'query-string';
import { TAdvertisement } from 'types/Advertisement';
import { TOrder } from 'types/Order';
import { fetchAdvertisementById, fetchAdvertisements } from 'api/advertisements/advertisementsQuery';
import { fetchOrderById, fetchOrders } from 'api/orders/ordersQuery';
import { AbortControllerManager } from 'utils/helpers/AbortControllerManager';

type Filters = {
  likes?: number;
  views?: number;
  price?: number;
  limit?: number;
  text?: string;
};

type WithId = {
  id: string;
};

type Store<T extends WithId> = {
  content: T[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  currentPage: number;
  hasMore: boolean;
  update: (id: string) => Promise<void>;
  resetStore: () => void;
  id: string | null;
  setId: (id: string | null) => void;

  fetchItems: (params: {
    start: number;
    limit: number;
    likes?: number;
    views?: number;
    price?: number;
    text?: string;
  }) => Promise<void>;

  loadMoreItems: () => Promise<void>;
  setFilters: (filters: Partial<Filters>) => void;
};

export const createStore = <T extends WithId>(
  fetchItemsApi: (query: string, options?: { signal?: AbortSignal }) => Promise<T[]>,
  fetchItemByIdApi: (id: string, options?: { signal?: AbortSignal }) => Promise<T>,
) => {
  const abortControllerManager = new AbortControllerManager();

  return create<Store<T>>((set, get) => ({
    content: [],
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
    hasMore: true,
    id: null,

    setId: (id: string | null) => set({ id }),

    fetchItems: async (params) => {
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
      const signal = abortControllerManager.createController();

      try {
        const data = await fetchItemsApi(queryStringResult, { signal });
        if (data.length === 0) {
          set({ hasMore: false });
        } else {
          set((state) => ({
            content: [...state.content, ...data],
            loading: false,
          }));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            set({ loading: false, error: error.message });
          }
        } else {
          set({ loading: false, error: 'Unknown error' });
        }
      }
    },

    update: async (id: string) => {
      const signal = abortControllerManager.createController();

      try {
        const data = await fetchItemByIdApi(id, { signal });
        if (data) {
          set((state) => {
            const updatedItems = state.content.map((item) => (item.id === id ? data : item));
            return { content: updatedItems };
          });
        } else {
          set((state) => {
            const filteredItems = state.content.filter((item) => item.id !== id);
            return { content: filteredItems };
          });
        }
      } catch (error: unknown) {
        set((state) => {
          const filteredItems = state.content.filter((item) => item.id !== id);
          return {
            content: filteredItems,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        });
      }
    },

    loadMoreItems: async () => {
      const { currentPage, filters, hasMore } = get();
      if (!hasMore) return;

      const newPage = currentPage + 1;
      set({ currentPage: newPage, loading: true });

      const limit = filters.limit || 10;
      const start = newPage * limit;

      try {
        await get().fetchItems({
          start: start,
          limit: limit,
          likes: filters.likes,
          views: filters.views,
          price: filters.price,
          text: filters.text,
        });
      } catch (error: unknown) {
        set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
      } finally {
        set({ loading: false });
      }
    },

    setFilters: (filters) => {
      set((state) => {
        const newFilters = { ...state.filters, ...filters };
        set({ currentPage: 0, content: [], hasMore: true });
        get().fetchItems({
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

    resetStore: () => {
      abortControllerManager.abort();
      set({
        content: [],
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
        hasMore: true,
      });
    },
  }));
};

export const useAdvertisementFilterStore = createStore<TAdvertisement>(
  (query, options) => fetchAdvertisements(query, options),
  (id, options) => fetchAdvertisementById(id, options),
);

export const useOrderFilterStore = createStore<TOrder>(
  (query, options) => fetchOrders(query, options),
  (id, options) => fetchOrderById(id, options),
);
