export default function CardColorfull1({ dish , fontFamily}) {
    const { imageUrl = "/placeholder.jpg", name, price } = dish;
    return (
        <div className="p-4 bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-xl shadow-lg text-center"
        style={{ fontFamily }}>
        <img src={imageUrl} alt={name} className="w-full h-28 object-cover rounded mb-2" />
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-md font-bold">${price}</p>
      </div>
    );
  }