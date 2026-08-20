import { TypeToggle } from "./TypeToggle";
import { SearchBar } from "./SearchBar";
import { AddButton } from "./AddButton";

type TopBarProps = {
  searchTerm: string;
  selectedType: 'Filmes' | 'Séries';
  onSearchChange: (value: string) => void;
  onTypeChange: (type: "Filmes" | "Séries") => void;
};

export function TopBar({ searchTerm, selectedType, onSearchChange, onTypeChange }: TopBarProps) {

  return (
    <div className="flex h-14 bg-[#2171B5]">
      <div className="flex items-center justify-center gap-2 p-3">
        <TypeToggle 
          selectedType={selectedType} 
          onToggle={onTypeChange} />
        <AddButton
          selectedType={selectedType} 
          onClick={() => {}} />
        <SearchBar 
          searchTerm={searchTerm}
          onSearch={onSearchChange} />
      </div>
    </div>
  );
}
            
   