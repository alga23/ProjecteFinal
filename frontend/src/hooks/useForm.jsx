import { useState } from "react";

const useForm = (initialObj = {}) => {

    const [form, setForm] = useState(initialObj);

    const changed = (name, value) => {

        setForm({
            ...form,
            [name]: value
        })

    }

    return {
        form,
        changed
    }
}

export default useForm;

