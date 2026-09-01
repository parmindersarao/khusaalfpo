import Heder from "@/components/Header"
import Hero from "@/components/Hero"
import WhyChooseUs from "@/components/WhyChooseUs";
import Products from "@/components/Products";
import ConnectWithUs from "@/components/ConnectWithUs";
import Footer from "@/components/Footer";
export default async function Home() {
  
  return (
    <>
      <Heder/>
      <Hero />
      <WhyChooseUs />
      <Products />
      <ConnectWithUs />
      <Footer />
    </>
  );
}
