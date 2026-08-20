import { Search } from "lucide-react";

type SearchBarProps = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <div className="relative bg-[#c6dbef] rounded-full">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#2171B5]" />
      <input
        type="text"
        placeholder="Buscar..."
        className="p-1 h-10 w-80 rounded-lg pl-10 pr-3 outline-none text-[#2171B5]"
        value={searchTerm} 
        onChange={(e) => onSearch(e.target.value)}  
      />
    </div>
  );
}

