// components/cards/CardMinimal11.js
export default function CardMitadMitad({ dish, fontFamily, titleStyle, priceStyle, cardStyleInline }) {
    const { imageUrl = "/placeholder.jpg", name, price } = dish;
  
    return (
      <div className="grid grid-cols-2 gap-4 p-4 border rounded-md shadow-sm" style={{ fontFamily, ...cardStyleInline }}>
        <img src={imageUrl} alt={name} className="w-full h-28 object-cover rounded" />
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-bold" style={titleStyle}>{name}</h3>
          <p className="text-sm font-bold mt-1" style={priceStyle}>${price}</p>
        </div>
      </div>
    );
  }
  