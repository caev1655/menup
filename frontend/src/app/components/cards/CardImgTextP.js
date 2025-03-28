// components/cards/CardMinimal12.js
export default function CardImgTextP({ dish, fontFamily, titleStyle, priceStyle, cardStyleInline }) {
    const { imageUrl = "/placeholder.jpg", name, price, description } = dish;
  
    return (
      <div className="grid grid-cols-[auto,1fr,auto] gap-3 items-center p-3 border-b" style={{ fontFamily, ...cardStyleInline }}>
        <img src={imageUrl} alt={name} className="w-16 h-16 object-cover rounded-md" />
        <div>
          <h3 className="font-semibold text-sm" style={titleStyle}>{name}</h3>
          {description && <p className="text-xs mt-1 text-gray-500">{description}</p>}
        </div>
        <p className="text-sm font-bold" style={priceStyle}>${price}</p>
      </div>
    );
  }
  