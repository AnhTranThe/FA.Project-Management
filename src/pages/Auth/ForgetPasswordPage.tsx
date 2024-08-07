import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { validateForgotPassword } from "../../utils/yup";
import { IForgotPasswordModel } from "../../models/loginModel";
import { IToastValueContext, ToastContext } from "../context/toastContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordService } from "../../Services/authServiceApi";
import { Password } from "primereact/password";

export default function ForgetPasswordPage() {
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const nav = useNavigate();
    const handleResetPassword = async (e: IForgotPasswordModel) => {

        const res = await forgotPasswordService(e);
        if (res && res.code === 200) {
            console.log("true")
            setShowModelToast({
                severity: "success",
                summary: "Success",
                detail: "Change password success",
            });
            nav("/auth/login")
        } else {
            setShowModelToast({
                severity: "warn",
                summary: "Warning",
                detail: `${res?.message || "Something Wrong"}`,
            });
        }
    };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            pass: "",
            confirm: "",
        },
        validationSchema: validateForgotPassword,
        onSubmit: (value) => {
            handleResetPassword(value);
        },
    });
    return (
        <div className="flex flex-column align-items-center justify-content-center Signup ">
            <div
                style={{
                    borderRadius: "56px",
                    padding: "0.3rem",
                    background:
                        "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
                }}>
                <div
                    className="w-full surface-card py-4 px-5 sm:px-8 "
                    style={{ borderRadius: "53px" }}>
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">Welcome!!</div>
                        <span className="text-600 font-medium">
                            Fill new password to reset...
                        </span>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="item-form mb-3">
                            <label
                                htmlFor="email"
                                className="block text-900 text-sm ml-1 font-medium mb-2">
                                Email
                            </label>

                            <InputText
                                id="email"
                                type="text"

                                placeholder="email..."
                                className="w-full md:w-30rem"
                                style={{ padding: "1rem" }}
                                defaultValue={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <br />

                            <div className="my-3 pl-2">
                                {errors.email && touched.email && (
                                    <span className="text-red-500 my-3">{errors.email}</span>
                                )}
                            </div>

                        </div>
                        <div className="item-form mb-3">
                            <label
                                htmlFor="pass"
                                className="block text-900 font-medium text-sm ml-1 mb-2">
                                Password
                            </label>
                            <Password id="pass"
                                name="pass" value={values.pass} onChange={handleChange} onBlur={handleBlur} feedback={false} toggleMask />
                            {touched.pass && errors.pass ? (
                                <div className="text-red-500 my-3">{errors.pass}</div>
                            ) : null}


                        </div>

                        <div className="item-form mb-3">
                            <label
                                htmlFor="confirm"
                                className="block text-900 font-medium text-sm ml-1 mb-2">
                                Confirm password
                            </label>


                            <Password id="confirm"
                                name="confirm" value={values.confirm} onChange={handleChange} onBlur={handleBlur} feedback={false} toggleMask />
                            {touched.confirm && errors.confirm ? (
                                <div className="text-red-500 my-3">{errors.confirm}</div>
                            ) : null}
                        </div>
                        <div className="flex gap-3 ">
                            <Button
                                label="Change password"
                                type="submit"
                                className="w-full p-3 text-xl"></Button>
                            <Button
                                label="Return"
                                severity="info"
                                onClick={() => {
                                    nav("/auth/login")
                                }}
                                className="w-full p-3 text-xl"></Button>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    );
}
