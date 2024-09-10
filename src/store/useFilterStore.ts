import { create } from 'zustand';
import queryString from 'query-string';
import { TAdvertisement } from 'types/Advertisement';
import { TOrder } from 'types/Order';
import { fetchAdvertisementById, fetchAdvertisements } from 'api/advertisements/advertisementsQuery';
import { fetchOrderById, fetchOrders } from 'api/orders/ordersQuery';
import { AbortControllerManager } from 'utils/helpers/AbortControllerManager';

export type Filters<T> = T & {
  limit?: number;
  text?: string;
};

type WithId = {
  id: string;
};

type Store<T extends WithId, F> = {
  content: T[];
  loading: boolean;
  error: string | null;
  filters: Filters<F>;
  currentPage: number;
  hasMore: boolean;
  update: (id: string) => Promise<void>;
  resetStore: () => void;
  id: string | null;
  setId: (id: string | null) => void;

  fetchItems: (params: Filters<F> & { start: number; limit: number }) => Promise<void>;
  loadMoreItems: () => Promise<void>;
  setFilters: (filters: Partial<Filters<F>>) => void;
};

export const createStore = <T extends WithId, F>(
  fetchItemsApi: (query: string, options?: { signal?: AbortSignal }) => Promise<T[]>,
  fetchItemByIdApi: (id: string, options?: { signal?: AbortSignal }) => Promise<T>,
  initialFilters: F,
) => {
  const abortControllerManager = new AbortControllerManager();

  return create<Store<T, F>>((set, get) => ({
    content: [],
    loading: false,
    error: null,
    filters: {
      ...initialFilters,
      limit: 10,
      text: undefined,
    },
    currentPage: 0,
    hasMore: true,
    id: null,

    setId: (id: string | null) => set({ id }),

    fetchItems: async (params) => {
      set({ loading: true, error: null });
      const { start, limit, ...restFilters } = params;

      const queryParams: Record<string, number | string> = {
        _start: start,
        _limit: limit,
      };

      Object.entries(restFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams[key] = value;
        }
      });

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
          ...filters,
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
          ...newFilters,
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
          ...initialFilters,
          limit: 10,
          text: undefined,
        },
        currentPage: 0,
        hasMore: true,
      });
    },
  }));
};

export type TFiltersOrder = {
  limit?: number;
  text?: string;
  status?: number;
  total?: number;
};

export type TFiltersAdvertisements = {
  likes?: number;
  views?: number;
  price?: number;
  limit?: number;
  text?: string;
};

export const useAdvertisementFilterStore = createStore<TAdvertisement, TFiltersAdvertisements>(
  (query, options) => fetchAdvertisements(query, options),
  (id, options) => fetchAdvertisementById(id, options),
  {
    likes: undefined,
    views: undefined,
    price: undefined,
  },
);

export const useOrderFilterStore = createStore<TOrder, TFiltersOrder>(
  (query, options) => fetchOrders(query, options),
  (id, options) => fetchOrderById(id, options),
  {
    status: undefined,
    total: undefined,
  },
);
