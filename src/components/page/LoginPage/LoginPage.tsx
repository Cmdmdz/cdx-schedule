import * as React from "react";
import { Formik, FormikProps } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { User } from "../../../types/user.type";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as loginActions from "../../../actions/login.action";
import { useAppDispatch } from "../../..";
import { httpClient } from "../../../utils/httpclient";
import { setLoginFailedToState, setLoginSuccessToState } from "../../../actions/login.action";
import { server } from "../../../Constants";



const LoginPage: React.FC<any> = () => {
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: { marginTop: 2 },
  };

  const dispatch = useAppDispatch();
  const showForm = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
  }: FormikProps<User>) => {
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

        {loginReducer.isError && <Alert severity="error">รหัสผ่านไม่ถูกต้อง</Alert>}

        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button
            onClick={() => navigate("/register")}
            type="button"
            fullWidth
            variant="outlined"
          >
            สร้างบัญชี
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary">
            เข้าสู่ระบบ
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
              กรุณาเข้าสู่ระบบ
            </Typography>
            <Formik
                onSubmit={async (values, {}) => {
                  httpClient.post(server.LOGIN_URL, values)
                  .then((response) => {
                    dispatch(setLoginSuccessToState(response.data))
                    navigate("/timetable");
                  },
                  (error) => {
                    console.log(error.response)
                    dispatch(setLoginFailedToState());
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

export default LoginPage;
