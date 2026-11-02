"use client";


import { redirect } from "next/navigation"
import { authClient } from "../lib/auth-client";
import Link from "next/link";






const RegisterPage = () => {

    const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string }

        const { data, error } = await authClient.signIn.email({
           email:user.email, password: user.password

        })

        if (data) {
            redirect('/')
        }

        if (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
            <form
                onSubmit={handlelogin}
                className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-bold">
                        Login
                    </h2>

                    {/* Email */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                    </fieldset>

                    {/* Password */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input
                            type="password"
                               name="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                    </fieldset>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link
                            href="/forgot-password"
                            className="link link-primary text-sm"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    {/* Login Button */}
                    <button type="submit" className="btn btn-primary mt-3 w-full">
                        Login
                    </button>
                    <p className="text-center text-sm mt-3">
                        Already have an account?{" "}
                        <Link href="/register" className="link link-primary">Register</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;



