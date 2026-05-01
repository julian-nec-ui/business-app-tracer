import "./style.css";

export default function BootCard() {
  return (
    <div className="card text-center border-0 shadow rounded-sm p-4"
      style={{
        maxWidth: "17rem"
      }}>
      <div className="icon">
        <i className="bi bi-cloud-drizzle-fill" />
      </div>
      <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" cursor="pointer" onClick={() => alert("Dots clicked!")} width="35px" height="35px" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 20 20">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </div>
      <div className="card-body">
        <h4 className="card-title fw-bold">Card title</h4>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div >
  );
}