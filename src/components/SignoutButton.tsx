import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function SignoutButton() {
  const navigate = useNavigate();
  async function signout() {
    await getAuth().signOut();
    navigate("/", { replace: true });
  }

  return <Button onClick={signout}>Cerrar sesión</Button>;
}
