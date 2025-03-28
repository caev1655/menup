export default function CardDefault({ dish, fontFamily, cardStyleInline}) {
    const { imageUrl = "/placeholder.jpg", name, price } = dish;
    return (
      <div className="p-2 border rounded-lg bg-white shadow-md text-center"
      style={{ fontFamily, ...cardStyleInline}}>
        <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded mb-2" />
        <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
        <p className="text-sm font-bold text-gray-700">${price}</p>
      </div>
    );
  }
  