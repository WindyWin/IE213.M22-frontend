import { useState, useEffect } from "react";
import { Button, Card, Rate, Select,Form, Radio } from "antd";
import { AddToCartIcon, SearchIcon } from "../CustomIcon";
import "./ProductCard.scss";
export interface product{
  productName: string;
  description: string;
  rating: number;
  ratingCount: number;
  price: number;
  salePrice?: number;
  productVariant?: {
    size?: string[];
    color?: string[];
  };
  image: {
    url: string;
    title: string;
  };
  category: string[];
  id: number;
}
interface productCardProps {
  product: product;
}
const ProductCard = ({ product }: productCardProps) => {
  
  
  const [isViewAddinfo, setViewAddinfo] = useState(false);
  useEffect(() => {
    const addInfo = document.querySelector(`#product-card-${product.id} .card-additional-info`);
    if (addInfo) {
      if (isViewAddinfo) {
        addInfo.classList.remove("hidden");
      } else {
        addInfo.classList.add("hidden");
      }
    }
  }, [isViewAddinfo]);

  return (
    <Card
      onMouseEnter={() => setViewAddinfo(true)}
      onMouseLeave={() => setViewAddinfo(false)}
      className="product-card"
      id={`product-card-${product.id}`}
      hoverable={true}
      cover={<img src={product.image.url} />}
    >
      <Card.Meta
        title={product.productName}
        description={product.description}
      />
      <div className="rating-container">
        <Rate disabled allowHalf value={product.rating} />
        <span>{`(${product.ratingCount} nhận xét)`}</span>
      </div>
      <div className="price">
        {product.salePrice ? (
          <>
            <span className="sale-price">{product.salePrice}VNĐ</span>
            <sub className="original-price">{product.price}VNĐ</sub>
          </>
        ) : (
          <span className="original-price">{product.price}VNĐ</span>
        )}
      </div>
      {/* Khi hover vao trong Card  */}
      <Form>
        <div className="card-additional-info hidden">
          {product.productVariant ? (
            <div className="obtional-variant">
              {product.productVariant.size ? (
                <div className="size">
                  <span className="field">Size:</span>
                  <Radio.Group defaultValue="S" >
                    {product.productVariant.size.map((size: string) => (
                      <Radio.Button key={size} value={size}>
                        {size}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </div>
              ) : null}
              {product.productVariant.color ? (
                <div className="color">
                  <span className="field">Color:</span>
                  <Radio.Group defaultValue="red" >
                    {product.productVariant.color.map((color: string) => (
                      <Radio.Button
                        
                        key={color}
                        value={color}
                      >
                        {color}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="action">
            <Button type="primary" icon={<SearchIcon />} />
            <Button type="primary" icon={<AddToCartIcon />} />
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default ProductCard;