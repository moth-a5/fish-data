"use client";

import React from 'react'
import Navbar from './components/Navbar'
// ****************************************
import { useState, useEffect } from "react"
import Image from 'next/image'
import ProductCard from "./components/ProductCard"
import { formatPrice } from './utils/formatPrice'

const BASE_URL = "https://66a84f3453c13f22a3d24c83.mockapi.io/fish"

interface Product {
  id: number
  name: string
  price: number
  imageSrc: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

// ****************************************

export default function Home() {

  // ********************************************************
  const [products, setProducts] =  useState<Product[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  async function getProducts(): Promise<void> {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await res.json();
    setProducts(result);
  }

  function addToCart (product: Product): void {
    const cloneCartItems = JSON.parse(JSON.stringify(cartItems))
    const itemInCartIndex = cloneCartItems.findIndex((item: CartItem) => item.id === product.id)
    if (itemInCartIndex === -1) {
      cloneCartItems.push({
        ...product,
        quantity: 1
      })
    } else {
      cloneCartItems[itemInCartIndex].quantity += 1
    }
    setCartItems(cloneCartItems)
  }

  function removeFromCart (id: number): void {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  function updateQuantity (id: number, newQuantity: number): void {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  function calculateTotal (): number {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  useEffect(() => {
    getProducts()
 
  }, [])
  // *********************************************************** 
  return (
    <>
    <Navbar />
    <div className="flex min-h-screen flex-col items-center justify-between p-4">
      <h1 className="text-4xl font-bold">IMI Store</h1>
      <div className="flex gap-2">
        {/* -------------------ตะกร้าสินค้า-----------------------------------  */}
        <div className="mt-4 w-[35%] bg-zinc-300 p-2 rounded-lg border-2 border-cyan-500">
          <h2 className="text-2xl font-bold mb-4">ตะกร้าสินค้า</h2>
          <table className="w-full table-auto bg-zinc-200">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">รายการ</th>
                <th className="px-4 py-2">ราคา</th>
                <th className="px-4 py-2">จำนวน</th>
                <th className="px-4 py-2 text-right">เป็นเงิน</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="flex  px-4 py-2">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="w-20 h-20"
                    />
                    <span className="ml-2">{item.name}</span>
                  </td>
                  <td className="px-4 py-2 text-center">{item.price as number}</td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity as number}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-10 text-right"
                    />
                  </td>
                  <td className="px-4 py-2 text-right ">
                    {((item.price as number) * (item.quantity as number)).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end items-center bg-slate-400">
            <div className="py-2 text-right font-bold">รวมเงิน:</div>
            <div className="px-4 py-2 font-bold text-2xl">
              {calculateTotal().toFixed(2)}
            </div>
          </div>
        </div>
        {/* -------------------จบตะกร้าสินค้า--------------------------  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg mt-4 border-2 border-cyan-500">
 
        {products.map((product:Product) => (
           <ProductCard 
              key={product.id}
              imageSrc={product.imageSrc}
              name={product.name}
              price={product.price}
              addToCart={addToCart}
          />
         ))
        }
        </div>
      </div>
    </div>
    </>
  )
}