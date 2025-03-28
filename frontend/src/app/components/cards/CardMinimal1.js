// components/cards/CardMinimal1.js
export default function CardMinimal1({ dish, fontFamily, titleStyle, priceStyle , cardStyleInline,cardShadowSize}) {
  const { imageUrl = "/placeholder.jpg", name, price } = dish;

  return (
    <div
      className= {`p-4 rounded-md  shadow-black ${cardShadowSize}` }
      style={{ fontFamily, ...cardStyleInline }}
    >
      <img src={imageUrl} alt={name} className="w-full h-32 object-cover shadow-lg shadow-black rounded mb-2" />
      <h3 className="text-centerfont-normal borer text-center  rounded-xl line-clamp-2 shadow-lg shadow-black" style={titleStyle}>{name}</h3>
      <p className=" text-center font-bold mt-1 borer rounded-xl shadow-lg shadow-black" style={priceStyle}>${price}</p>
    </div>
  );
}
