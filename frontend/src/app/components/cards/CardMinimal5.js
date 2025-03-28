// components/cards/CardMinimal8.js
export default function CardMinimal5({ dish, fontFamily, titleStyle, priceStyle, cardStyleInline }) {
  const { imageUrl = "/placeholder.jpg", name, price } = dish;

  return (
    <div className="bg-white p-2 rounded-lg shadow-md border text-center" style={{ fontFamily, ...cardStyleInline }}>
      <div className="bg-white border border-gray-200 shadow-inner p-1 mb-2">
        <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded-sm" />
      </div>
      <h3 className="text-lg font-bold" style={titleStyle}>{name}</h3>
      <p className="text-sm mt-1 font-bold" style={priceStyle}>${price}</p>
    </div>
  );
}
