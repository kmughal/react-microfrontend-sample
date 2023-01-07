import { Link } from "react-router-dom";

const Layout = ({ sites }) => {
  return (
    <nav class="container">
      <ul>
        {sites.map((site, index) => {
          return (
            <li key={index*4}>
              <Link to={site.to}>{site.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Layout;
