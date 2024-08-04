import { formatPrice } from "../utils/formatPrice"

const ProductCard = ({ imageSrc, name, price, addToCart }: any) => {
 return (
  <div className="border rounded shadow-md p-4">
    <img
      src={imageSrc}
      alt={name}
      width={100}
      height={100}
      className="w-full h-48 object-cover rounded mb-2"
    />
    <div className="flex  justify-between">
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-gray-600 mb-2 text-2lg font-bold">{formatPrice(price)} บาท</p>
    </div>
    <div className="mt-4 flex justify-center">
      <button
        onClick={() => addToCart({ imageSrc, name, price, quantity: 1 })}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        เพิ่มลงตะกร้า
      </button>
    </div>
  </div>
 );
};
export default ProductCard;
