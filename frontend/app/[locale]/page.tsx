import Heder from "@/components/Header"
import Hero from "@/components/Hero"
import WhyChooseUs from "@/components/WhyChooseUs";
import Products from "@/components/Products";
import ConnectWithUs from "@/components/ConnectWithUs";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
export default async function Home() {
  
  return (
    <>
      <Heder/>
      <Hero />
      <Partners />
      <WhyChooseUs />
      <Products />
      <ConnectWithUs />
      <Footer />
    </>
  );
}
