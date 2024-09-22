"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword.tsx";
import AppTheme from "@/app/components/shared-theme/AppTheme.tsx";
import ColorModeSelect from "@/app/components/shared-theme/ColorModeSelect.tsx";
import login from "@/app/api/login.tsx";
import { loginSuccess } from "@/app/lib/sessionlib.ts";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  height: "100vh",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage: "url(https://stalkuat.hanzo.finance/static/image/background_login.jpg)",
    backgroundSize: "100vw 100vh",
    backgroundRepeat: "no-repeat",
    filter: "blur(3px)",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "url(https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Saigon_skyline_night_view.jpg/1200px-Saigon_skyline_night_view.jpg)",
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [phoneError, setEmailError] = React.useState(false);
  const [phoneErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username: string = data.get("phone") as string;
    const password: string = data.get("password") as string;
    const response = await login(username, password);
    if (response) {
      loginSuccess();
    }
  };

  const validateInputs = () => {
    const phone = document.getElementById("phone") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!phone.value) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid phone address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
              <TextField
                error={phoneError}
                helperText={phoneErrorMessage}
                id="phone"
                type="tel"
                name="phone"
                placeholder="09x-xxx-xxxx"
                autoComplete="phone"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={phoneError ? "error" : "primary"}
                sx={{ ariaLabel: "phone" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Mật khẩu</FormLabel>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <ForgotPassword open={open} handleClose={handleClose} />
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Link
                component="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                Quên mật khẩu?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Đăng nhập
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Chưa có tài khoản?{" "}
              <span>
                <Link
                  href="/"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Tham gia ngay
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
