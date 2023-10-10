"use client"
import { useCallback, useState } from "react";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/ButtonHome";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import usePost from "@/app/hooks/usePost";
import toast from "react-hot-toast";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";


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

    //const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const { postId } = usePost();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            body: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('content', '', { shouldValidate: true });
        axios.post('/api/posts', {
            ...data,
            postId: postId
        })
    }

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            <div className="flex flex-row gap-4">
                <div>
                    <Avatar user={user} />
                </div>
                {/* <div className="w-full">
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
                    <Button disabled={isLoading || !body} onClick={handleSubmit(onSubmit)} label="Tweet" />
                    </div>
                </div> */}
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                    <MessageInput
                        id="content"
                        register={register}
                        errors={errors}
                        required
                        placeholder="Write a message"
                    />
                    <button
                        type="submit"
                        className="
                            rounded-full 
                            p-2 
                            bg-sky-500 
                            cursor-pointer 
                            hover:bg-sky-600 
                            transition
                        "
                    >
                        <HiPaperAirplane
                            size={18}
                            className="text-white"
                        />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FormCreate;

