import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function SignoutButton() {
  const navigate = useNavigate();
  async function signout() {
    await getAuth().signOut();
    navigate("/profile");
  }

  return (
    <Button type="button" onClick={signout}>
      Cerrar sesión
    </Button>
  );
}
