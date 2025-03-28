
"use client";
import React from 'react';

function MenuFlow({ categorias, renderDishCard, getGridColsClass }) {
  return (
    <div className="menu-flow-container h-screen overflow-y-scroll snap-y snap-mandatory">
      {categorias.map((categoria) => (
        <section
          key={categoria._id}
          className="menu-category h-screen snap-start flex flex-col overflow-y-hidden relative "   
        >
          <h2
            className="text-center py-4 absolute top-0 left-0 right-0 z-10"
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
            className={`dishes-container flex-1 grid content-evenly gap-4 px-4 pt-36 overflow-y-auto pb-20 ${getGridColsClass(
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

export default MenuFlow;
