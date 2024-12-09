import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Real-Time Inventory",
      description: "Track and manage your stock levels seamlessly.",
      icon: "pi pi-box",
    },
    {
      title: "Sales Analytics",
      description: "Get detailed insights into your sales performance.",
      icon: "pi pi-chart-line",
    },
    {
      title: "Fast Transactions",
      description: "Process your payments quickly and efficiently.",
      icon: "pi pi-credit-card",
    },
    {
      title: "User-Friendly UI",
      description: "Navigate with ease using our intuitive design.",
      icon: "pi pi-desktop",
    },
  ];

  const featureTemplate = (feature) => (
    <Card className="feature-card">
      <i className={`feature-icon ${feature.icon}`}></i>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </Card>
  );

  return (
    <div className="homepage-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ePOS for Style Mantra</h1>
          <p>
            Streamline your sales and inventory management with cutting-edge
            tools designed for efficiency.
          </p>
          <Button
            label="Login"
            icon="pi pi-sign-in"
            className="p-button-raised p-button-rounded"
            onClick={() => navigate("/login")}
          />
        </div>
      </section>

      <section className="features">
        <h2>Features Overview</h2>
        <Carousel
          value={features}
          numVisible={3}
          numScroll={1}
          className="feature-carousel"
          itemTemplate={featureTemplate}
          responsiveOptions={[
            { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
            { breakpoint: "768px", numVisible: 2, numScroll: 1 },
            { breakpoint: "560px", numVisible: 1, numScroll: 1 },
          ]}
        />
      </section>

      <footer className="footer">
        <p>&copy; 2024 Style Mantra POS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
