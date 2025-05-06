import { Modal } from "@/components/Modal";
import TableLeaguesComponent from "@/components/TableLeaguesComponent";

export default function LeaguesPage() {
  return (
    <>
      <Modal title="Crear liga" buttonLabel="Crear liga" />
      <TableLeaguesComponent />
    </>
  );
}
