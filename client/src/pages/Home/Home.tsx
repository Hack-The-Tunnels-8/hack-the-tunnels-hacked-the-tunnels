import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page, ProductPreviewCard } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Home.style.scss";
import { useCookies } from 'react-cookie';

function Home() {
  const [products, setProducts] = useState([]);
  const [cookies] = useCookies();
  const recentlyViewedProducts = cookies.recentlyViewed || [];

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProducts();
      setProducts(json.data.products);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="home-page">
        <h1 className="home-page__title">Home</h1>
        <div className="typewriter">
          <div className="typewriter-text">Hello World</div>
        </div>
        <h2>Products:</h2>
        <div className="home-page__products">
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={`${product.id}`}>
              <ProductPreviewCard
                title={product.title}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                key={`${product.id}`}
              />
            </Link>
          ))}
        </div>
      </div>
      <section>
        <h2>Recently Viewed Products</h2>
        <div className="home-page__products">
        {recentlyViewedProducts.map((productName) => (
            <Link to={`/products/${productName.id}`} key={`${productName.id}`}>
              <ProductPreviewCard
                title={productName.title}
                description={productName.description}
                price={productName.price}
                imageUrl={productName.imageUrl}
                key={`${productName.id}`}
              />
            </Link>
        ))}
        </div>  
      </section>
    </Page>
  );
}

export default Home;
