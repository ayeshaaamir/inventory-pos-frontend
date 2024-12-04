import "../../src/styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <a href="/" className="notfound-link">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
