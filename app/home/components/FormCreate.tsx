"use client"
import { useCallback, useState } from "react";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/ButtonHome";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PostInput from "./InputPost";


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

    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setIsLoading(true);
        setValue('content', '', { shouldValidate: true });
        await axios.post('/api/posts', {
            ...data,
            postId: postId
        }).catch((error) => {
            toast.error("Something went wrong")
        }).finally(() => {
            setIsLoading(false);
            toast.success('Post has been created successfully')
        })
    },[handleSubmit, register, user, isComment])

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            <div className="flex flex-row gap-4">
                <div>
                    <Avatar user={user} image={user?.image}/>
                </div>
                <div className="w-full">
                    <PostInput
                        id="content"
                        register={register}
                        errors={errors}
                        required
                        placeholder="What's happening..."
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
                    <Button disabled={isLoading} onClick={handleSubmit(onSubmit)} label="Tweet" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormCreate;

