import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/types/product";
import { ProductContainer } from "../../components/views/ProductContainer";
import { SectionContainer } from "../../components/views/SectionContainer";

const SpecialSectionProducts = ({
  data,
}: {
  data: Product[];
}) => {
  return (
    <>
      <SectionContainer>
        <ProductContainer>
          {data.map((product: Product) => (
            <ProductCard singleProduct={product} key={product.id} />
          ))
          }
        </ProductContainer>
      </SectionContainer>
    </>
  );
};

export default SpecialSectionProducts;
