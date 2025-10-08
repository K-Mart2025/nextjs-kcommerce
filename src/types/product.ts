interface defaultProductProps {
  name: string;
  price: number;
  description: string;
  ingredients: string;
  details: string;
}

interface Product {
  id: string;
  img?: string;
  thumb?: string;
  name: string;
  category: {name: string};
  price: number;
  subtitle: string;
  description: string;
  ingredients: string;
  badge?: string;
  weight: number
}

export type { defaultProductProps, Product };
