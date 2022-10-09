import * as React from "react";
import { Formik, FormikProps } from "formik";
import {  Box, Button, Card, CardContent, Stack, SxProps, TextField, Theme, Typography } from "@mui/material";
import { User } from "../../../types/user.type";
import { useNavigate } from "react-router-dom";
import { RootReducers } from "../../../reducers";

import { useSelector, useDispatch } from "react-redux";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants";
import { setRegisterFailedToState, setRegisterSuccessToState } from "../../../actions/register.action";

const RegisterPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: { marginTop: 2 },
  };

  const showForm = ({ handleSubmit, handleChange, isSubmitting, values }: FormikProps<User>) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="ชื่อผู้ใช้"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="รหัสผ่าน"
          onChange={handleChange}
          value={values.password}
          type="password"
        />
        <br />


        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button onClick={() => navigate("/login")} type="button" fullWidth variant="outlined">
            ยกเลิก
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary">
            สร้างบัญชี
          </Button>
        </Stack>
      </form>
    );
  };
  const initialValues: User = { username: "", password: "" };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              ลงทะเบียน
            </Typography>
            <Formik
              onSubmit={async (values, {}) => {
                httpClient.post(server.REGISTER_URL, values)
                .then((response) => {
                  dispatch(setRegisterSuccessToState(response.data))
                  navigate("/login");
                },
                (error) => {
                  console.log(error.response)
                  dispatch(setRegisterFailedToState());
                }
                
                )
              }}
              initialValues={initialValues}
            >
              {(props) => showForm(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default RegisterPage;

