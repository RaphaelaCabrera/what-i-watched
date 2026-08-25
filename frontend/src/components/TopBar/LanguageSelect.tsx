import { Languages } from "lucide-react";

export function LanguageSelect() {
    return (
        <div className="relative">
            <Languages className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2171B5]" size={20}/>
            <select className="rounded-lg bg-[#c6dbef] py-2 pl-10 pr-2 text-[#2171B5]">
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
            </select>
        </div>
        
    );
}