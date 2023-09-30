import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Page } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Product.style.scss";
import { useCookies } from 'react-cookie';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProduct(id);
      if (json.error !== null) {
        setMessage(json.error);
        return;
      }
      const recentlyViewedProductNames = cookies.recentlyViewedNames || [];
      if (!recentlyViewedProductNames.includes(json.data.product.title)) {
        const recentlyViewedProducts = cookies.recentlyViewed || [];
        const updatedRecentlyViewed = [...recentlyViewedProducts, json.data.product];
        setCookie('recentlyViewed', updatedRecentlyViewed, { path: '/' });
        const updateRecentlyViewedProductNames = [...recentlyViewedProductNames, json.data.product.title];
        setCookie('recentlyViewedNames', updateRecentlyViewedProductNames, { path: '/' });
      }
      setProduct(json.data.product);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="product-page">
        {message && <p>{message}</p>}
        {product && (
          <>
            <div className="product-page__product">
              <h3>Title: {product.title}</h3>
              <p>ID: {id}</p>
              <p>Description: {product.description}</p>
            </div>
            <Link to={`/checkout/${product.id}`}>
              <button>Buy Now</button>
            </Link>
          </>
        )}
      </div>
    </Page>
  );
}

export default Product;
