import { create } from "zustand";
import { TApiError, TProduct, TProductCreate } from "../common/types";
import { api } from "../api/api";
import { EUrlConstants } from "../common/constants";
import { toast } from "sonner";
import { HttpStatusCode } from "axios";

type ProductState = {
  products: TProduct[];
};

type ProductAction = {
  getProducts: (searchTitle: string) => void;
  createProduct: (product: TProductCreate) => void;
  //   updateProduct: (id: string, title: string) => void;
  //   deleteProduct: (id: string) => void;
};

export const useProductStore = create<ProductState & ProductAction>(
  (set, get) => ({
    products: [],
    getProducts: async (searchTitle: string) => {
      const res = await api.get<TProduct[]>(`${EUrlConstants.PRODUCTS}`, {
        params: { searchTitle },
      });
      set({ products: res.data });
    },
    createProduct: async (product: TProductCreate) => {
      const formData = new FormData();
      formData.append("category", product.category);
      formData.append("title", product.title);
      formData.append(
        "description",
        product.description ? product.description : ""
      );
      formData.append("price", product.price.toString());
      formData.append(
        "prepaymentSale",
        product.prepaymentSale ? "true" : "false"
      );
      formData.append(
        "prepaymentSalePercent",
        product.prepaymentSalePercent.toString()
      );
      product.images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.post<TProduct | TApiError>(
        EUrlConstants.PRODUCTS,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status !== HttpStatusCode.Created) {
        const { message } = res.data as TApiError;
        toast.warning(message.join("\n"));
        return;
      }
      set({
        products: [...get().products, res.data as TProduct].sort(
          (a: TProduct, b: TProduct) => a.title.localeCompare(b.title)
        ),
      });
      toast.success("Продукт создан успешно");
      return;
    },
    // updateCategory: async (id: string, title: string) => {
    //   const res = await api.put<TCategory | TApiError>(
    //     `${EUrlConstants.CATEGORY}/${id}`,
    //     { title }
    //   );
    //   if (res.status !== HttpStatusCode.NoContent) {
    //     const { message } = res.data as TApiError;
    //     toast.warning(message);
    //     return;
    //   }
    //   set({
    //     categories: get()
    //       .categories.map((c) => (c.id === id ? { ...c, title } : c))
    //       .sort((a: TCategory, b: TCategory) => a.title.localeCompare(b.title)),
    //   });
    //   toast.success("Категория обновлена успешно");
    //   return;
    // },
    // deleteCategory: async (id: string) => {
    //   const res = await api.delete<TCategory | TApiError>(
    //     `${EUrlConstants.CATEGORY}/${id}`
    //   );
    //   if (res.status !== HttpStatusCode.NoContent) {
    //     const { message } = res.data as TApiError;
    //     toast.warning(message);
    //     return;
    //   }
    //   set({
    //     categories: [...get().categories.filter((c) => c.id !== id)].sort(
    //       (a: TCategory, b: TCategory) => a.title.localeCompare(b.title)
    //     ),
    //   });
    //   toast.success("Категория удалена успешно");
    //   return;
    // },
  })
);
