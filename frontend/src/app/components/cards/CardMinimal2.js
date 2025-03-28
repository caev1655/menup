// components/cards/CardMinimal15.js
export default function CardMinimal2({ dish, fontFamily, titleStyle, priceStyle, cardStyleInline }) {
    const { imageUrl = "/placeholder.jpg", name, price } = dish;
  
    return (
      <div className="flex flex-col justify-between items-center text-center p-2 border rounded-md shadow-lg" style={{ fontFamily, ...cardStyleInline }}>
        <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded-md mb-2" />
        <h3 className="text-sm font-bold" style={titleStyle}>{name}</h3>
        <p className="text-xs font-bold mt-1" style={priceStyle}>${price}</p>
      </div>
    );
  }
  