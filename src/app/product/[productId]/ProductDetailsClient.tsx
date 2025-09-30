"use client"

import NotFound from '@/app/not-found';
import Sections from '@/app/views/Sections';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShareButton from '@/components/views/ShareButton';
import { apiUrl } from '@/data/config';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';
import { Check, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Toaster } from 'sonner';

export const ProductDetailsClient = ({ data, id }: { data: Product, id: string }) => {
    const { addToCart, removeFromCart, cart } = useCart();

    if (!data) { return <NotFound /> }

    const [used, setUsed] = useState(
        cart.find((product) => product.product.id === String(id || ""))
            ? true
            : false
    );

    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        addToCart({ product: data, quantity: 1 });
        setUsed(!used);
    };
    const handleRemoveFromCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        removeFromCart(data.id);
        setUsed(!used);
    };
    return (
        <>
            <div className="px-4 py-8 mx-auto min-h-vh max-w-7xl">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Product Image */}
                    <div className="relative shadow-2xl aspect-square box rounded-xl sm:max-w-3/4">

                        <Image
                            width={600}
                            height={600}
                            loading="lazy"
                            src={apiUrl + data.img}
                            alt={data.name}
                            className="object-cover w-full h-full rounded-lg"
                        />

                        {data?.badge && data.badge.trim() !== "" && (
                            <Badge className="absolute text-white bg-blue-600 bottom-4 right-4">
                                {data.badge}
                            </Badge>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {data.name}
                            </h1>
                            <p className="text-lg text-gray-500">{data.subtitle}</p>
                        </div>

                        <div className="text-3xl font-bold text-blue-600">
                            ${data.price}
                        </div>

                        {!used ? (
                            <div className="flex space-x-4">
                                <Button
                                    className="flex-1 transition duration-300 bg-blue-600 hover:bg-blue-700"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Añadir al carrito
                                </Button>
                                <ShareButton />
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Button
                                    className="flex-1 transition duration-300 bg-gray-600 hover:bg-gray-700"
                                    onClick={handleRemoveFromCart}
                                >
                                    <Check className="w-5 h-5 mr-2" />
                                    Añadido
                                </Button>
                                <ShareButton />
                            </div>
                        )}

                        <Tabs defaultValue="description">
                            <TabsList className="w-full bg-blue-100">
                                <TabsTrigger value="description" className="flex-1">
                                    Description
                                </TabsTrigger>
                                <TabsTrigger value="ingredients" className="flex-1">
                                    Ingredients
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="mt-4 text-gray-600">
                                {data.description}
                            </TabsContent>
                            <TabsContent value="ingredients" className="mt-4 text-gray-600">
                                {data.ingredients}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            <div className="m-auto my-8 max-w-7xl">
                <Sections category={data.category.name} exclude={data.id} />
            </div>

            <Toaster theme="light" />
        </>
    )
}
