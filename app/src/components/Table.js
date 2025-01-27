import { Card, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { DeleteDialog } from "./DeleteDialog";
import { useState } from "react";
import { checkElementType } from "../utils";
import { UpdateWorkoutDialog } from "./UpdateWorkoutDialog";

export function Table(props) {
  const {
    data = [],
    headers = [],
    attributes = [],
    view = false,
    del = false,
    update = false,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [element, setElement] = useState(null);
  const [elementType, setElementType] = useState(null);
  return (
    <div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {headers.map((head, id) => (
                <th
                  key={id}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((elem, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={"view" + index}>
                  {attributes.map((attribute, index) => {
                    return (
                      <td key={index} className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {elem[attribute]}
                        </Typography>
                      </td>
                    );
                  })}
                  {view && (
                    <td
                      key={index}
                      className={classes}
                      onClick={() => navigate(`${elem[view]}`)}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        View
                      </Typography>
                    </td>
                  )}
                  {del && (
                    <td
                      key={"delete" + index}
                      className={classes}
                      onClick={() => {
                        setElement(elem);
                        setElementType(checkElementType(location.pathname));
                        setOpenDelete(true);
                      }}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Delete
                      </Typography>
                    </td>
                  )}
                  {update && (
                    <td
                      key={"update" + index}
                      className={classes}
                      onClick={() => {
                        setElement(elem);
                        setElementType(checkElementType(location.pathname));
                        setOpenUpdate(true);
                      }}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Update
                      </Typography>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      {elementType && (
        <DeleteDialog
          open={openDelete}
          setOpen={setOpenDelete}
          element={element}
          elementType={elementType}
        />
      )}
      {elementType && (
        <UpdateWorkoutDialog
          open={openUpdate}
          setOpen={setOpenUpdate}
          element={element}
        />
      )}
    </div>
  );
}
