import React, { useState } from "react";
import MaterialTable from "material-table";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants";

export default function TimeTable() {
 

  const [coourse, setCoourse] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]); 

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

  const handleRowUpdate = (newData: any, oldData: any, resolve: any) => {
    console.log(newData);
    httpClient.put(server.COURSE_UPDATE + newData.id, newData).then((res) => {
      const dataUpdate = [...coourse];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setCoourse([...dataUpdate]);
      resolve();
    });
  };

  const handleRowDelete = (oldData: any, resolve: any) => {
    httpClient.delete(server.COURSE_DELETE + oldData.id).then((res) => {
      const dataDelete = [...data];
      const index = oldData.tableData.id;
      dataDelete.splice(index, 1);
      setCoourse([...dataDelete]);
      resolve();
    });
  };

  const handleRowAdd = (newData: any, resolve: any) => {
    httpClient.post(server.COURSE_ADD, newData).then((res) => {
      let dataToAdd = [...data];
      dataToAdd.push(newData);
      setCoourse(dataToAdd);
      resolve();
    });
  };

  const [columns, setColumns] = useState([
    { title: "วิชา", field: "courseName", type: "string" as const },
    {
      title: "อาจารย์ผู้สอน",
      field: "lecturer",
      type: "string" as const,
    },
    { title: "ช่วงเวลา", field: "studyTime", type: "string" as const },
    { title: "วันที่", field: "studyDate", type: "string" as const },
  ]);

  return (
    <>
      <MaterialTable
        title="ตารางเรียน"
        columns={columns}
        data={coourse}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve: any) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
        }}
      />
    </>
  );
}
