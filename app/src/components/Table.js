import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Table(props) {
  const { data = [], headers = [], attributes = [], view = null } = props;
  const navigate = useNavigate();
  return (
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
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={index}>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
