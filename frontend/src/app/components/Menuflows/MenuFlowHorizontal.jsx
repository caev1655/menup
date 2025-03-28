
"use client";
import React from 'react';

function HorizontalMenuFlow({ categorias, renderDishCard, getGridColsClass }) {
  return (
    <div
      className=" horizontal-menu-flow-container h-screen w-screen overflow-x-scroll snap-x snap-mandatory flex"
      style={{ scrollBehavior: 'smooth' }}
    >
      {categorias.map((categoria) => (
        <section
          key={categoria._id}
          className="category-section h-screen w-screen flex-shrink-0 mb-0 snap-end flex flex-col overflow-y-scroll"
          style={{
            backgroundColor: categoria.backgroundColor || 'transparent',
          }}
        >
          <h2
            className="text-center pb-4  sticky top-0  z-10 "
            style={{
              color: categoria.color || '#000000',
              fontFamily: categoria.fontFamily || 'Arial, sans-serif',
              fontSize: categoria.fontSize ? `${categoria.fontSize}px` : '32px',
              textShadow: categoria.textShadowColor
                ? `2px 2px ${categoria.textShadowBlur}px ${categoria.textShadowColor}`
                : 'none',
                background: `linear-gradient(${categoria.backgroundColor} 60%, transparent)`,

            }}
          >
            {categoria.nombre}
          </h2>
          <div
            className={`flex-1 grid gap-4 px-2 content-evenly pb-4 ${getGridColsClass(
              categoria.cardsPerRow
            )}`}
            style={{
                backgroundColor: `${categoria.backgroundColor}`,
            }}
          >
            {categoria.platillos &&
              categoria.platillos.map((platillo) => (
                <React.Fragment key={platillo._id}>
                  {renderDishCard(
                    platillo,
                    categoria.layout,
                    categoria.contentStyles
                  )}
                </React.Fragment>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default HorizontalMenuFlow;
