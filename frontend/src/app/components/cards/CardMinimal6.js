// components/cards/CardMinimal6.js
export default function CardMinimal6({ dish, fontFamily, titleStyle, priceStyle, cardStyleInline }) {
  const { imageUrl = "/placeholder.jpg", name, price } = dish;

  return (
    <div className=" mx-2 relative rounded-md overflow-hidden shadow-lg h-40" style={{ fontFamily, ...cardStyleInline }}>
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 flex justify-between  items-end text-white px-4">
        <h3 className="text-lg font-bold text-center mb-2 " style={titleStyle}>{name}</h3>
        <p className="text-sm mt-1 font-bold mb-2" style={priceStyle}>${price}</p>
      </div>
    </div>
  );
}
