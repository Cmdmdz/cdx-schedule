import * as React from "react";
import MaterialTable from "material-table";
import { server } from "../../../Constants";
import { httpClient } from "../../../utils/httpclient";

const Course: React.FC<any> = () => {

  const [coourse, setCoourse] = React.useState<any[]>([]);


  React.useEffect(() => {
    findAll();
  }, []);

  const findAll = () => {
    httpClient.get(server.COURSE).then(
      (response) => {
        setCoourse(response.data);
      },
      (error) => {
        console.log(error.response);
      }
    );
  };

  const [columns, setColumns] = React.useState([
    { title: "รหัสวิชา", field: "uuid", type: "string" as const },
    { title: "วิชา", field: "courseName", type: "string" as const },
    {
      title: "อาจารย์ผู้สอน",
      field: "lecturer",
      type: "string" as const,
    },
    { title: "หน่อยกิต", field: "credit", type: "string" as const },
  ]);

  return (
    <div>
      <MaterialTable
        title="รายวิชาที่เปิดสอน"
        columns={columns}
        data={coourse}
      />
    </div>
  );
};

export default Course;
