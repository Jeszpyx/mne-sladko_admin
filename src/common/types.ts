import { HttpStatusCode } from "axios";

export type TCategory = {
  id: string;
  title: string;
  productsCount: number;
};

export type TApiError = {
  message: string[];
  error: string;
  statusCode: HttpStatusCode;
};

export type TProduct = {
  id: string;
  category: string;
  title: string;
  description: string | null;
  price: number;
  prepaymentSale: boolean;
  prepaymentSaleProcent: number | null;
  images: { id: string; url: string }[];
};
