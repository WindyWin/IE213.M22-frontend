import { Button, Form, Image, Rate, InputNumber, Radio, Tabs } from "antd";
import { useState, useEffect } from "react";
import { productDetail } from "./type";
import { decode } from "html-entities";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import CommentEditor from "./CommentEditor";

interface ProductDetailProps {
  product: productDetail;
}

const ProdcutDetail = ({ product }: ProductDetailProps) => {
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    const quantity = document.querySelector(
      ".product-quantity input"
    ) as HTMLInputElement;

    if (quantity) {
      quantity.value = "" + productQuantity;
    }
    console.log(productQuantity);
  }, [productQuantity]);
  function updateQuantity() {
    const quantity = document.querySelector(
      ".product-quantity input"
    ) as HTMLInputElement;

    if (quantity) {
      if (parseInt(quantity.value) > product.stock)
        quantity.value = product.stock + "";
      if (parseInt(quantity.value) < 1) quantity.value = 1 + "";
      setProductQuantity(parseInt(quantity.value));
    }
  }

  function handelAddToCart(value: any) {
    console.log({
      variant: value ?? null,
      id: product.id,
      name: product.name,
      price: product.salePrice ?? product.price,
      image: product.image,
      quantity: productQuantity,
    });
  }

  return (
    <div className="product-detail">
      <div className="product-detail_top">
        <div className="product-detail-image">
          <Image.PreviewGroup>
            <div className="main-image">
              <Image
                src={product.image[0].url}
                alt={product.image[0].title ?? product.name}
              />
            </div>
            <div className="sub-image">
              {product.image.slice(1).map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  alt={image.title ?? product.name}
                />
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
        <div className="product-detail-info">
          <div className="product-detail-info-title">
            <h1>{product.name}</h1>
          </div>
          <div className="product-detail-info-price">
            {product.salePrice ? (
              <>
                <span>{product.price}</span>
                <span className="product-price">{product.salePrice}</span>
              </>
            ) : (
              <span className="product-price">{product.price}</span>
            )}
            ;
          </div>
          <div className="product-rating">
            <Rate disabled allowHalf value={product.rating} />
            <span>({product.comment.length} nhận xét)</span>
          </div>
          <div className="product-description">{product.description}</div>
          <Form onFinish={handelAddToCart}>
            {product.productVariant ? (
              <div className="obtional-variant">
                {product.productVariant.size ? (
                  <Form.Item
                    initialValue={product.productVariant.size[0]}
                    label="Kích cỡ:"
                    name="size"
                    className="size"
                  >
                    <Radio.Group defaultValue={product.productVariant.size[0]}>
                      {product.productVariant.size.map((size: string) => (
                        <Radio.Button key={size} value={size}>
                          {size}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                ) : null}
                {product.productVariant.color ? (
                  <Form.Item
                    initialValue={product.productVariant.color[0]}
                    label="Màu sắc:"
                    name="color"
                    className="color"
                  >
                    <Radio.Group defaultValue={product.productVariant.color[0]}>
                      {product.productVariant.color.map((color: string) => (
                        <Radio.Button key={color} value={color}>
                          {color}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                ) : null}
              </div>
            ) : null}
            <div className="product-quantity-section">
              <InputNumber
                className="product-quantity"
                min={1}
                defaultValue={1}
                controls={false}
                onBlur={() => updateQuantity()}
                addonAfter={
                  <div
                    onClick={() =>
                      setProductQuantity((count) =>
                        count + 1 > product.stock ? count : ++count
                      )
                    }
                  >
                    +
                  </div>
                }
                addonBefore={
                  <div
                    onClick={() =>
                      setProductQuantity((count) =>
                        count - 1 == 0 ? count : --count
                      )
                    }
                  >
                    -
                  </div>
                }
                disabled={product.stock === 0}
                max={product.stock === 0 ? 1 : product.stock}
              />
              <Form.Item>
                <Button
                  type="primary"
                  disabled={product.stock === 0}
                  htmlType="submit"
                >
                  Thêm vào giỏ hàng
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div className="category">
            <span>Danh mục:</span>
            {product.category.map((category: string, index: number) => (
              <Link to={``} key={index}>
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="product-detail-bottom">
        <Tabs type="card">
          <Tabs.TabPane key="1" tab="Thông tin chi tiết">
            <div
              className="product-content"
              dangerouslySetInnerHTML={{
                __html: product.content
                  ? decode(product.content)
                  : `<h1>${product.name}</h1><p>Sản phẩm này không có mô tả</p>`,
              }}
            ></div>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="Đánh giá">
            <div className="comment-section">
              <CommentEditor type="product" />
              <div className="comment-list">
                {product.comment.map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))}
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default ProdcutDetail;
