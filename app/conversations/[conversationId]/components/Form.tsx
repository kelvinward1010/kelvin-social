'use client';

import {
    HiPaperAirplane,
    HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/app/hooks/useConversation";
import useMessage from "@/app/hooks/useMessage";
import { useState } from "react";
import toast from "react-hot-toast";

const Form = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { conversationId } = useConversation();
    const { mutate: mutateMessage } = useMessage(conversationId);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
            ...data,
            conversationId: conversationId
        }).then(() => {
            mutateMessage()
        }).catch((error) => {
            toast.error("Something went wrong", error)
        }).finally(() => {
            setIsLoading(false);
            toast.success(`Your message has been send!`)
        })
    }

    const handleUpload = (result: any) => {
        
        setIsLoading(true);
        axios.post('/api/messages', {
            image: result.info.secure_url,
            conversationId: conversationId
        }).then(() => {
            mutateMessage()
        }).catch((error) => {
            toast.error("Something went wrong", error)
        }).finally(() => {
            setIsLoading(false);
            toast.success(`Your message has been send!`)
        })
    }

    return (
        <div
            className="
                py-4 
                px-4 
                bg-white 
                border-t 
                flex 
                items-center 
                gap-2 
                lg:gap-4 
                w-full
            "
        >
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="makaijlv"
            >
                <HiPhoto size={30} className="text-sky-500" />
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput
                    id="message"
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
    );
}

export default Form;