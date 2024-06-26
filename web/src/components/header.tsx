import UniteIcon from "../assets/nlw-unite-icon.svg";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={UniteIcon} alt="Unite Icon" />
      <nav className="flex gap-5">
        <NavLink href="/eventos">Eventos</NavLink>
        <NavLink href="/participantes" active>Participantes</NavLink>
      </nav>
    </div>
  );
}
