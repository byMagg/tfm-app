import { Modal } from "@/components/Modal";
import TableLeaguesComponent from "@/components/TableLeaguesComponent";

export const LeaguesPage = () => {
  return (
    <>
      <Modal title="Crear liga" buttonLabel="Crear liga" />
      <TableLeaguesComponent />
    </>
  );
};
