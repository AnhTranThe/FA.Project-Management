import { useState } from "react";


export default function TaskUserSearch({ onSearchChange }: { onSearchChange: (searchValue: string) => void }) {
    const [expanded, setExpanded] = useState(false);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        onSearchChange(newValue);
    }
    return (
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <input
                className={`p-inputtext p-component w-10rem ${expanded ? ('w-15rem') : ("")}`}
                type="text"
                placeholder="Filter Issuses"
                onKeyDown={(e) => { handleKeyDown(e) }}

                onFocus={() => { setExpanded(true) }}
                onBlur={() => { setExpanded(false) }}
                style={{ transition: 'width 0.3s ease-in-out' }}
            />
        </span>
    )
}

