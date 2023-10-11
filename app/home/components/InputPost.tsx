'use client'
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface PostInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}


const PostInput: React.FC<PostInputProps> = ({
    placeholder,
    id,
    type,
    register,
    required,
}) => {
    return (
        <>
            <textarea
                id={id}
                typeof={type}
                autoComplete={id}
                {...register(id, { required })}
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
        </>
    )
}

export default PostInput;