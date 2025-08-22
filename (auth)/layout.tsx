import {ReactNode} from 'react'
import "../globals.css";
import { Toaster } from "sonner";


const AuthLayout = ({children}: {children: ReactNode }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            {children}
            <Toaster richColors position="top-center" />
        </div>
    )
}
export default AuthLayout
