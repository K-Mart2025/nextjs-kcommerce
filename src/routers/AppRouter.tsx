/* import { BrowserRouter, Route, Routes } from "react-router";

import ProductDetails from "@/pages/home/views/ProductDetails";
import Home from "../pages/home/Home";
import About from "@/pages/misc/About";
import Returns from "@/pages/misc/Returns";
import Delivery from "@/pages/misc/Delivery";
import Disclaimer from "@/pages/misc/Disclaimer";
import { NotFound } from "@/pages/misc/NotFound";
import FilteredProducts from "@/pages/home/views/FilteredProducts";
import { Layout } from "@/pages/home/components/main/Layout";
import { useTrackVisit } from "@/hooks/useTrackVisit";

const AppRouter = () => {
  useTrackVisit()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="product/section/:key" element={<Layout><FilteredProducts /></Layout>} />
        <Route path="product/:key" element={<ProductDetails />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
 */