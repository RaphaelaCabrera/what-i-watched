import { TypeToggle } from "./TypeToggle";
import { SearchBar } from "./SearchBar";
import { AddButton } from "./AddButton";
import { Filters } from "./Filters";
import type { Genre } from "../../types/media";
import favicon from "../../assets/favicon.png";
import { LanguageSelect } from "./LanguageSelect";

type TopBarProps = {
  searchTerm: string;
  statusFilter: string;
  genreFilter: string;
  selectedType: 'Movies' | 'TvShows';
  onSearchChange: (value: string) => void;
  onTypeChange: (type: "Movies" | "TvShows") => void;
  onStatusFilterChange: (status: string) => void;
  onGenreFilterChange: (genre: string) => void;
  handleAddClick: () => void;
  genres: Genre[];
};

export function TopBar({ searchTerm, statusFilter, genreFilter, selectedType, onSearchChange, onTypeChange, onStatusFilterChange, onGenreFilterChange, handleAddClick, genres }: TopBarProps) {

  return (
    <div className="flex flex-row h-14 bg-[#2171B5]">
      <div className="flex items-center justify-center gap-2 p-3">
        <img src={favicon} alt="Logo" className="w-8 h-8" />
        <span className="text-white text-2xl font-bold">What I Watch</span>
        <TypeToggle 
          selectedType={selectedType} 
          onToggle={onTypeChange} />
        <AddButton
          selectedType={selectedType} 
          onClick={handleAddClick} />
      </div>
      
      <div className="flex items-center justify-end gap-2 p-3 ml-auto">
        <SearchBar 
          searchTerm={searchTerm}
          onSearch={onSearchChange} />
        <Filters
          statusFilter={statusFilter}
          genreFilter={genreFilter}
          onStatusFilterChange={onStatusFilterChange}
          onGenreFilterChange={onGenreFilterChange} 
          genres={genres} />

        <LanguageSelect />
      </div>
    </div>
  );
}
            
   