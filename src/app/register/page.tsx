"use client";


import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { useState } from "react";


const getPasswordErrors = (password: string): string[] => {
    const errors: string[] = [];

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter (A-Z).");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter (a-z).");
    }

    if (password.length < 6) {
        errors.push("Password must be at least 6 characters long.");
    }

    return errors;
};

const RegisterPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const handleGoogleLogin = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            console.log("Google Login Error:", error);
        }
    };
    const handleregister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries()) as { name: string, image: string, email: string, password: string }
        const errors = getPasswordErrors(user.password);

        setPasswordErrors(errors);
        if (errors.length > 0) {
            return;
        }

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image,
        })

        if (data) {
            router.push("/");
            router.refresh();
        }
        if (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
            <form
                onSubmit={handleregister}
                className="card w-full max-w-md bg-base-100 shadow-xl"
            >
                <div className="card-body">
                    <h2 className="card-title justify-center text-3xl font-bold text-emerald ">
                        Create Account
                    </h2>

                    <p className="text-center text-base-content/60 mb-4">
                        Register to get started with BookNook
                    </p>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Name</legend>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered w-full"
                            placeholder="Enter your name"
                        />
                    </fieldset>


                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Image URL</legend>
                        <input
                            type="text"
                            name="image"
                            className="input input-bordered w-full"
                            placeholder="Enter your photo URL"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => {
                                const nextPassword = event.target.value;
                                setPassword(nextPassword);
                                setPasswordErrors(getPasswordErrors(nextPassword));
                            }}
                            className="input input-bordered w-full"
                            placeholder="Enter your password"
                        />
                        {passwordErrors.map((error) => (
                            <p key={error} className="text-error text-sm">
                                {error}
                            </p>
                        ))}
                    </fieldset>

                    <button
                        type="submit"
                        className="btn bg-emerald-600 text-white hover:bg-emerald-700 mt-5 w-full"
                    >
                        Register
                    </button>
                    <div className="divider">OR</div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="w-5 h-5"
                        >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            />
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.72 7.18l7.63 5.92c4.45-4.11 7.13-10.17 7.13-17.57z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"
                            />
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.9-5.88l-7.63-5.92c-2.12 1.42-4.84 2.27-8.27 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            />
                        </svg>

                        Continue with Google
                    </button>
                    <p className="text-center text-sm mt-3">
                        Already have an account?{" "}
                        <Link href="/login" className="link link-primary">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;

