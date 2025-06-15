export interface Product {
    _id: string;
    name: string;
    price: number;
    imageKey?: string;
  }
  
  export interface OrderItem {
    _id: string;
    product: Product;
    quantity: number;
    status: string;
    customization?: {
      analysis?: any;
      furnitureImageKey?: string;
    };
  }
  
  export interface DeliveryInfo {
    fullName: string;
    address: string;
    phone: string;
    email: string;
    notes?: string;
  }
  
  export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export interface Order {
    _id: string;
    createdAt: string;
    status: string;
    items: OrderItem[];
    total: number;
    user: User;
    deliveryInfo: DeliveryInfo;
  }