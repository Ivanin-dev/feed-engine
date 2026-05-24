interface SearchProps {
    value: string;
    onChange: (value: string) => void;
    name: string;
}

export function SearchInput({ value, onChange, name }: SearchProps) {
    return (
        <div className="flex justify-center">
            <input
                type="text"
                name={name}
                placeholder="find more..."
                className="mt-5 h-15 rounded-xl bg-[#202020] px-4 transition-all outline-none active:border-0 lg:w-175"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
