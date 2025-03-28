// components/cards/CardMinimal7.js
export default function CardMinimal4({ dish, fontFamily, titleStyle, priceStyle, cardStyleInline }) {
    const { imageUrl = "/placeholder.jpg", name, price } = dish;
  
    return (
      <div className="flex items-center p-4 rounded-md shadow-sm border gap-4" style={{ fontFamily, ...cardStyleInline }}>
        <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded-full" />
        <div className="flex flex-col">
          <h3 className="text-lg font-bold" style={titleStyle}>{name}</h3>
          <p className="text-sm mt-1 font-bold" style={priceStyle}>${price}</p>
        </div>
      </div>
    );
  }
  