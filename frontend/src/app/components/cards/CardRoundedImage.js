// components/cards/CardRoundedImage.js
export default function CardRoundedImage({ dish, fontFamily, titleStyle, priceStyle,cardStyleInline,cardShadowSize }) {
  const { imageUrl = "/placeholder.jpg", name, price } = dish;

  return (
    <div
      className="flex flex-col justify-between items-center h-full p-2 rounded-xl  mt-4  "
      style={{ fontFamily }}
    >
  {/* Espacio flexible con título centrado verticalmente */}
  <div className="flex-1 w-full flex items-center justify-center text-center   ">
        <h3 className=" font-semibold leading-tight px-2 line-clamp-2 rounded-lg " style={titleStyle}>
          {name}
        </h3>
      </div>

      {/* Imagen arriba siempre */}
      <div className="w-full flex justify-center mb-0 ">
        <img src={imageUrl} alt={name} className={`w-48 h-48 object-cover  border rounded-full shadow-black ${cardShadowSize}` } 
        style={{...cardStyleInline}}
        />
      </div>

    

      {/* Precio abajo fijo */}
      <div className=" text-center  mt-5 ">
        <p className=" font-bold rounded-lg px-5 " style={priceStyle}>${price}</p>
      </div>
    </div>
  );
}
