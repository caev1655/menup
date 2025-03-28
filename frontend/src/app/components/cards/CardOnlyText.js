// components/cards/CardMinimal13.js
export default function CardOnlyText({ dish, fontFamily, titleStyle, priceStyle, cardStyleInline }) {
    const { name, price, description } = dish;
  
    return (
      <div className="px-4 flex justify-between items-start border-b py-2" style={{ fontFamily, ...cardStyleInline }}>
        <div>
          <h3 className="text-sm font-semibold" style={titleStyle}>{name}</h3>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
        <p className="text-sm font-bold ml-4" style={priceStyle}>${price}</p>
      </div>
    );
  }
  