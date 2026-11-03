import tecnologia from "../../assets/categories/tecnologia.png";
import supermercado from "../../assets/categories/supermercado.png";
import bebidas from "../../assets/categories/bebidas.png";
import ferramentas from "../../assets/categories/ferramentas.png";
import saude from "../../assets/categories/saude.png";
import esportes from "../../assets/categories/esportes.png";
import moda from "../../assets/categories/moda.png";
import "./CategoryGrid.scss";

const categories = [
  { name: "Tecnologia", image: tecnologia, size: 61 },
  { name: "Supermercado", image: supermercado, size: 61 },
  { name: "Bebidas", image: bebidas, size: 61 },
  { name: "Ferramentas", image: ferramentas, size: 61 },
  { name: "Saúde", image: saude, size: 61 },
  { name: "Esportes e Fitness", image: esportes, size: 61 },
  { name: "Moda", image: moda, size: 63 },
];

function CategoryGrid() {
  return (
    <section className='categories' aria-label='Categorias de produtos'>
      <ul className='categories__list'>
        {categories.map((category) => {
          const isHighlighted = category.name === "Tecnologia";

          return (
            <li
              key={category.name}
              className={
                isHighlighted
                  ? "categories__item categories__item--highlight"
                  : "categories__item"
              }
            >
              <div className='categories__card'>
                <img
                  src={category.image}
                  alt=''
                  width={category.size}
                  height={category.size}
                />
              </div>

              <span className='categories__name'>{category.name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CategoryGrid;
