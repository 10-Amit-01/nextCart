import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/products";
import ProductCard from "@/components/Productcard";

const dummy = [
  {
    name: "Product 1",
    description: "Description 1",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badge: "New",
    rating: 4.5,
    reviews: 10,
    stock: 10,
    originalPrice: 150,
  },
  {
    name: "Product 2",
    description: "Description 2",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badge: "New",
    rating: 4.5,
    reviews: 10,
    stock: 10,
    originalPrice: 250,
  },
  {
    name: "Product 3",
    description: "Description 3",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badge: "New",
    rating: 4.5,
    reviews: 10,
    stock: 10,
    originalPrice: 350,
  },
  {
    name: "Product 4",
    description: "Description 4",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badge: "New",
    rating: 4.5,
    reviews: 10,
    stock: 10,
    originalPrice: 450,
  },
  {
    name: "Product 5",
    description: "Description 5",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badge: "New",
    rating: 4.5,
    reviews: 10,
    stock: 10,
    originalPrice: 550,
  },
  {
    name: "Product 6",
    description: "Description 6",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badge: "New",
    rating: 4.5,
    reviews: 10,
    stock: 10,
    originalPrice: 650,
  },
  {
    name: "Product 7",
    description: "Description 7",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badge: "New",
    rating: 4.5,
    reviews: 10,
    stock: 10,
    originalPrice: 750,
  },
  {
    name: "Product 8",
    description: "Description 8",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    badge: "New",
    rating: 4.5,
    reviews: 10,
    stock: 10,
    originalPrice: 850,
  },
];

export default function ShopPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: getProduct,
  });
  console.log("data", data);
  return (
    <div className="p-8 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dummy.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}
