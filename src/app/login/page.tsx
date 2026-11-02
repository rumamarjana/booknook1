"use client";


import { redirect } from "next/navigation"
import { authClient } from "../lib/auth-client";






const RegisterPage = () => {

    const handleregister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries()) as { name: string, image: string, email: string, password: string }

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image,
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
            <form className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-bold">
                        Login
                    </h2>

                    {/* Email */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                    </fieldset>

                    {/* Password */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                    </fieldset>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <a href="/forgot-password" className="link link-primary text-sm">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button type="submit" className="btn btn-primary mt-3 w-full">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;



