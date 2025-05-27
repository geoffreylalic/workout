import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Set from "./Set";
import CreateSet from "./CreateSet";

const Exercice = ({ workoutId, exercice }) => {
  return (
    <div className="m-5">
      {exercice && (
        <>
          <h2 className="text-lg font-semibold mb-2">
            Détails de l'exercice: {exercice.name}
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repetitions</TableHead>
                <TableHead>Poids</TableHead>
                <TableHead>Repos</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercice &&
                exercice?.sets?.length > 0 &&
                exercice?.sets?.map((set, key) => (
                  <TableRow key={key}>
                    <Set set={set} workoutId={workoutId} />
                  </TableRow>
                ))}
              <CreateSet workoutId={workoutId} exerciceId={exercice.id} />
            </TableBody>
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </>
      )}
    </div>
  );
};

export default Exercice;
