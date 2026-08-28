import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LanguageSelect() {
    const { i18n } = useTranslation();

    return (
        <div className="relative">
            <Languages className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2171B5]" size={20}/>
            <select className="rounded-lg bg-[#c6dbef] py-2 pl-10 pr-2 text-[#2171B5]"
                onChange={(e) => {
                    const language = e.target.value;

                    i18n.changeLanguage(language);
                    localStorage.setItem("language", language);
                }}
                defaultValue={i18n.language}>
                <option value="pt">🇧🇷 Português (Brasil)</option>
                <option value="en">🇺🇸 English (US)</option>
                <option value="es">🇪🇸 Español (España)</option>
            </select>
        </div>
        
    );
}