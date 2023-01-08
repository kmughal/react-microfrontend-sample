import Layout from "./components/Layout";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import MicroFrontEnd from "./components/MicroFrontend";
const { REACT_APP_SITE1: siteOneHost, REACT_APP_SITE2: siteTwoHost } =
  process.env;

const sites = [
  { to: "site1", name: "Site1", host: siteOneHost },
  { to: "site2", name: "Site2", host: siteTwoHost }
];

const Main = () => {
  return (
    <Router>
      <Layout sites={sites} />
      <Routes>
        <Route path="/" element={() => <h1>Home page</h1>} />
        {sites.map((site) => (
          <Route path={site.to} element={GetElement(site)} />
        ))}
      </Routes>
    </Router>
  );
};

export default Main;

function GetElement(site) {
  return <MicroFrontEnd name={site.name} host={site.host} />;
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
