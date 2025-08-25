import { Outlet, Link } from "@tanstack/react-router";

export function Layout() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#eee", marginBottom: "1rem" }}>
        <Link to="/home" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/test">Test</Link>
      </nav>
      <Outlet />
    </div>
  );
}
