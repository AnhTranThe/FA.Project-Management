import { InputText } from "primereact/inputtext";
import { SetStateAction, useState } from "react";

export default function TaskUserSearch() {
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState(false);
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearch(e.target.value);
    };
    return (
        <span className="p-input-icon-left">
            <i className="pi pi-search" />

            <InputText
                value={search}
                onChange={handleChange}
                placeholder="Filter Issuses"
                onFocus={() => { setExpanded(true) }}
                onBlur={() => { setExpanded(false) }}
                className={`w-10rem ${expanded ? ('w-15rem') : ('')}`}
                style={{ transition: 'width 0.3s ease-in-out' }}
            ></InputText>
        </span>
    )
}
