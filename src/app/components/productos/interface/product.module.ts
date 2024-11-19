export interface Product {
  CodigoAmazon: string;
  CodigoProducto: number;
  Descripcion: string;
  Foto: string;
  Precio: string;
}
  
export interface ProductData {
    message: string;
    data: {
      content: Product[];
      totalElements: number;
    };
}