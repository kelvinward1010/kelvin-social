"use client"
import { useCallback, useState } from "react";
import Avatar from "./Avatar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import useCurrentUser from "../hooks/useCurrentUser";
import Button from "./ButtonHome";

interface FormCreateProps {
    user: any;
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const FormCreate: React.FC<FormCreateProps> = ({
    user,
    placeholder,
    isComment,
    postId,
}) => {

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
           
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            <div className="flex flex-row gap-4">
                <div>
                    <Avatar user={user} />
                </div>
                <div className="w-full">
                    <textarea
                        disabled={isLoading}
                        onChange={(event) => setBody(event.target.value)}
                        value={body}
                        className="
                            disabled:opacity-80
                            peer
                            resize-none 
                            mt-3 
                            w-full 
                            bg-black 
                            ring-0 
                            outline-none 
                            text-[20px] 
                            placeholder-neutral-500 
                            text-white
                        "
                        placeholder={placeholder}
                    />
                    <hr
                        className="
                            opacity-0 
                            peer-focus:opacity-100 
                            h-[1px] 
                            w-full 
                            border-neutral-800 
                            transition"
                    />
                    <div className="mt-4 flex flex-row justify-end">
                    <Button disabled={isLoading || !body} onClick={onSubmit} label="Tweet" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormCreate;

