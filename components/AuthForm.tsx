"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button"
import {Form, FormField} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { auth } from "@/firebase/client";
import {type} from "node:os";
import {toast} from "sonner";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {signIn, signUp} from "@/lib/actions/auth.action";
const formSchema = z.object({
    username: z.string().min(2).max(50),
})

const authFormSchema = (type : FormType)=> {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}

const AuthForm = ({ type } : { type: FormType}) => {
    const formSchema = authFormSchema(type);
    const router = useRouter();
    // 1. Define your form.

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {

                const { name, email, password } = values;
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                const result = await signUp({
                    uid:userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                })
                if(!result?.success){
                    toast.error(result?.message);
                    return;
                }

                toast.success("Signup successfully!, Please login now!");
                router.push("/sign-in");
            }else {
                const { email, password } = values;
                const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredentials.user.getIdToken();

                if (!idToken) {
                    toast.error("Sign In failed!");
                    return;
                }
                await signIn({
                    email, idToken
                })


                toast.success('Sign in successfully!');
                router.push('/');
            }

        }catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
            <div className="card-border lg:min-w-[566px] bg-gray-900 text-white rounded-2xl shadow-xl">
                <div className="flex flex-col gap-6 card py-14 px-10">
                    <div className="flex flex-col gap-2 justify-center">
                        <Image src="/logo.svg"
                               alt="logo"
                               height={32}
                               width={38}
                        />
                        <h2 className="text-primary-100">PrepAI</h2>
                    </div>
                    <h3>Practice job interview with AI</h3>


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                            {!isSignIn && (
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium">Name</label>
                                            <Input placeholder="Enter Your Name" {...field} />
                                        </div>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">Email</label>
                                        <Input type="email" placeholder="Enter your Email" {...field} />
                                    </div>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">Password</label>
                                        <Input type="password" placeholder="Enter Your Password" {...field} />
                                    </div>
                                )}
                            />


                            <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</Button>

                        </form>
                    </Form>

                    <p className="text-center">
                        {isSignIn ? 'No account yet?' : 'Have an account already?'}
                        <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
                            {!isSignIn ? 'Sign in' : 'Sign up'}
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default AuthForm;
