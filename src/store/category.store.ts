import { create } from "zustand";
import { TApiError, TCategory } from "../common/types";
import { api } from "../api/api";
import { EUrlConstants } from "../common/constants";
import { toast } from "sonner";
import { HttpStatusCode } from "axios";

type CategoryState = {
  categories: TCategory[];
};

type CategoryAction = {
  getCategories: () => void;
  createCategory: (title: string) => void;
  updateCategory: (id: string, title: string) => void;
  deleteCategory: (id: string) => void;
};

export const useCategoryStore = create<CategoryState & CategoryAction>(
  (set, get) => ({
    categories: [],
    getCategories: async () => {
      const res = await api.get<TCategory[]>(EUrlConstants.CATEGORY);
      set({ categories: res.data });
    },
    createCategory: async (title: string) => {
      const res = await api.post<TCategory | TApiError>(
        EUrlConstants.CATEGORY,
        { title }
      );
      if (res.status !== HttpStatusCode.Created) {
        const { message } = res.data as TApiError;
        toast.warning(message);
        return;
      }
      set({
        categories: [...get().categories, res.data as TCategory].sort(
          (a: TCategory, b: TCategory) => a.title.localeCompare(b.title)
        ),
      });
      toast.success("Категория создана успешно");
      return;
    },
    updateCategory: async (id: string, title: string) => {
      const res = await api.put<TCategory | TApiError>(
        `${EUrlConstants.CATEGORY}/${id}`,
        { title }
      );
      if (res.status !== HttpStatusCode.NoContent) {
        const { message } = res.data as TApiError;
        toast.warning(message);
        return;
      }
      set({
        categories: get()
          .categories.map((c) => (c.id === id ? { ...c, title } : c))
          .sort((a: TCategory, b: TCategory) => a.title.localeCompare(b.title)),
      });
      toast.success("Категория обновлена успешно");
      return;
    },
    deleteCategory: async (id: string) => {
      const res = await api.delete<TCategory | TApiError>(
        `${EUrlConstants.CATEGORY}/${id}`
      );
      if (res.status !== HttpStatusCode.NoContent) {
        const { message } = res.data as TApiError;
        toast.warning(message);
        return;
      }
      set({
        categories: [...get().categories.filter((c) => c.id !== id)].sort(
          (a: TCategory, b: TCategory) => a.title.localeCompare(b.title)
        ),
      });
      toast.success("Категория удалена успешно");
      return;
    },
  })
);
