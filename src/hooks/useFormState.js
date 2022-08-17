import { useState } from "react";

function useFormState(intialVal) {
    const [value, setValue] = useState(intialVal);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const reset = () => {
        setValue("")
    }
    return [value, handleChange, reset]
}
export default useFormState