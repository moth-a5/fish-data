import { formatPrice } from "../utils/formatPrice"

const ProductCard = ({ product, addToCart }: any) => {
 return (
  <div className="border rounded shadow-md p-4">
    <img
      src={product.imageSrc}
      alt={product.name}
      width={100}
      height={100}
      className="w-full h-48 object-cover rounded mb-2"
    />
    <div className="flex  justify-between">
      <h3 className="text-xl font-bold mb-1">{product.name}</h3>
      <p className="text-gray-600 mb-2 text-2lg font-bold">{formatPrice(product.price)} บาท</p>
    </div>
    <div className="mt-4 flex justify-center">
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        เพิ่มลงตะกร้า
      </button>
    </div>
  </div>
 );
};
export default ProductCard;
