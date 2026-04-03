import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const selectedOption = options?.find(opt => opt.value === value);
  const filteredOptions = options?.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className="input input-bordered w-full mt-1 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-base text-gray-800" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-md shadow-xl max-h-60 overflow-y-auto">
          <div className="p-2 sticky top-0 bg-base-100 border-b border-base-200 z-10">
            <div className="relative">
              <input
                type="text"
                className="input input-sm input-bordered w-full pl-8"
                placeholder="พิมพ์เพื่อค้นหา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()} 
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
            </div>
          </div>
          <div className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer hover:bg-base-200 ${(value) === (option.value) ? 'bg-primary/10 text-primary font-medium' : ''}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm text-center">ไม่พบข้อมูลที่ค้นหา</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown